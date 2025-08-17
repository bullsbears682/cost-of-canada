import React, { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Mail, MessageSquare, Bug, Lightbulb } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Message sent!",
      description: "Thank you for your feedback. We'll get back to you soon.",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      category: '',
      message: ''
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <PageHeader />
      <div className="min-h-screen bg-gradient-subtle pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <Mail className="h-6 w-6 text-primary" />
                  Contact Us
                </CardTitle>
                <p className="text-muted-foreground">
                  We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Question</SelectItem>
                        <SelectItem value="bug">Bug Report</SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="data">Data Accuracy</SelectItem>
                        <SelectItem value="account">Account Issue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      required
                      className="mt-1"
                      placeholder="Please provide as much detail as possible..."
                    />
                  </div>

                  <Button type="submit" className="w-full hover-scale">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <MessageSquare className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">General Support</h3>
                      <p className="text-sm text-muted-foreground">
                        Questions about using our calculators, understanding results, or general inquiries about Canadian cost of living.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Bug className="h-6 w-6 text-destructive mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Bug Reports</h3>
                      <p className="text-sm text-muted-foreground">
                        Found a bug or experiencing technical issues? Let us know with as much detail as possible including your device and browser.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Lightbulb className="h-6 w-6 text-amber-500 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Feature Requests</h3>
                      <p className="text-sm text-muted-foreground">
                        Have an idea for a new feature or improvement? We love hearing from our users about how to make MapleMetrics better.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Response Times</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>General inquiries:</span>
                      <span className="text-muted-foreground">1-2 business days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bug reports:</span>
                      <span className="text-muted-foreground">Same day</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Feature requests:</span>
                      <span className="text-muted-foreground">1 week</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;