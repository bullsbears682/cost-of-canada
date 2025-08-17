import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { FeedbackService, FeedbackRecord } from '@/services/FeedbackService';
import { useAuth } from '@/contexts/AuthContext';
import { MessageSquare, User, Calendar, Star, Loader2, Eye, Edit3 } from 'lucide-react';
import { format } from 'date-fns';
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [feedback, setFeedback] = useState<FeedbackRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackRecord | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [newStatus, setNewStatus] = useState<'new' | 'in_progress' | 'resolved' | 'closed'>('new');
  const [updating, setUpdating] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Check if user is admin (you'll need to set this up in your database)
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setCheckingAdmin(false);
        return;
      }

      // You can implement admin check here
      // For now, let's check if the user email is in a list of admin emails
      const adminEmails = ['admin@maplemetrics.com', 'support@maplemetrics.com']; // Add your admin emails
      const userIsAdmin = adminEmails.includes(user.email || '');
      setIsAdmin(userIsAdmin);
      setCheckingAdmin(false);
    };

    checkAdminStatus();
  }, [user]);

  useEffect(() => {
    if (isAdmin) {
      loadFeedback();
    }
  }, [isAdmin]);

  const loadFeedback = async () => {
    setLoading(true);
    const result = await FeedbackService.getAllFeedback();
    if (result.data) {
      setFeedback(result.data);
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to load feedback",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleUpdateFeedback = async () => {
    if (!selectedFeedback) return;

    setUpdating(true);
    const result = await FeedbackService.updateFeedbackStatus(
      selectedFeedback.id,
      newStatus,
      adminNotes
    );

    if (result.success) {
      toast({
        title: "Success",
        description: "Feedback updated successfully",
      });
      setSelectedFeedback(null);
      setAdminNotes('');
      loadFeedback();
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to update feedback",
        variant: "destructive",
      });
    }
    setUpdating(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'in_progress': return 'bg-yellow-500';
      case 'resolved': return 'bg-green-500';
      case 'closed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'bug': return 'bg-red-100 text-red-800';
      case 'feature': return 'bg-blue-100 text-blue-800';
      case 'ui': return 'bg-purple-100 text-purple-800';
      case 'data': return 'bg-orange-100 text-orange-800';
      case 'performance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (checkingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage user feedback and support requests</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="grid gap-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">{feedback.length}</div>
                  <div className="text-sm text-muted-foreground">Total Feedback</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">{feedback.filter(f => f.status === 'new').length}</div>
                  <div className="text-sm text-muted-foreground">New</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">{feedback.filter(f => f.status === 'in_progress').length}</div>
                  <div className="text-sm text-muted-foreground">In Progress</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">{feedback.filter(f => f.status === 'resolved').length}</div>
                  <div className="text-sm text-muted-foreground">Resolved</div>
                </CardContent>
              </Card>
            </div>

            {/* Feedback List */}
            <div className="space-y-4">
              {feedback.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="h-5 w-5 text-primary" />
                        <div>
                          <CardTitle className="text-lg">
                            {item.category ? item.category.charAt(0).toUpperCase() + item.category.slice(1) : 'General'} Feedback
                          </CardTitle>
                          <CardDescription className="flex items-center gap-4 mt-1">
                            <span className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              {(item as any).profiles?.display_name || item.email || 'Anonymous'}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {format(new Date(item.created_at), 'MMM d, yyyy HH:mm')}
                            </span>
                            {item.rating && (
                              <span className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                {item.rating}/5
                              </span>
                            )}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.category && (
                          <Badge className={getCategoryColor(item.category)}>
                            {item.category}
                          </Badge>
                        )}
                        <Badge className={`text-white ${getStatusColor(item.status)}`}>
                          {item.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-4">{item.message}</p>
                    {item.admin_notes && (
                      <div className="bg-muted p-3 rounded-md mb-4">
                        <Label className="text-xs font-semibold text-muted-foreground">Admin Notes:</Label>
                        <p className="text-sm mt-1">{item.admin_notes}</p>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedFeedback(item);
                              setNewStatus(item.status);
                              setAdminNotes(item.admin_notes || '');
                            }}
                          >
                            <Edit3 className="h-4 w-4 mr-1" />
                            Manage
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Manage Feedback</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="status">Status</Label>
                              <Select value={newStatus} onValueChange={(value: any) => setNewStatus(value)}>
                                <SelectTrigger className="mt-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="new">New</SelectItem>
                                  <SelectItem value="in_progress">In Progress</SelectItem>
                                  <SelectItem value="resolved">Resolved</SelectItem>
                                  <SelectItem value="closed">Closed</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="admin-notes">Admin Notes</Label>
                              <Textarea
                                id="admin-notes"
                                placeholder="Add internal notes..."
                                value={adminNotes}
                                onChange={(e) => setAdminNotes(e.target.value)}
                                rows={3}
                                className="mt-1"
                              />
                            </div>
                            <div className="flex gap-2 justify-end">
                              <Button
                                variant="outline"
                                onClick={() => setSelectedFeedback(null)}
                                disabled={updating}
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={handleUpdateFeedback}
                                disabled={updating}
                              >
                                {updating ? (
                                  <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Updating...
                                  </>
                                ) : (
                                  'Update'
                                )}
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {feedback.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No feedback yet</h3>
                    <p className="text-muted-foreground">User feedback will appear here when submitted.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;