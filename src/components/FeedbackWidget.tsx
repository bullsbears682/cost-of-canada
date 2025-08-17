import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Star } from 'lucide-react';

const FeedbackWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState('');
  const [category, setCategory] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate feedback submission
    toast({
      title: "Feedback sent!",
      description: "Thank you for helping us improve MapleMetrics.",
    });
    
    // Reset form and close dialog
    setRating(0);
    setFeedback('');
    setCategory('');
    setIsOpen(false);
  };

  const StarRating = ({ rating, onRatingClick }: { rating: number; onRatingClick: (rating: number) => void }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingClick(star)}
            className="hover:scale-110 transition-transform"
          >
            <Star
              className={`h-6 w-6 ${
                star <= rating 
                  ? 'fill-yellow-400 text-yellow-400' 
                  : 'text-muted-foreground hover:text-yellow-400'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="fixed bottom-4 right-4 z-40 shadow-lg hover-scale bg-background/80 backdrop-blur-sm"
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Share Your Feedback
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>How would you rate your experience?</Label>
            <div className="mt-2">
              <StarRating rating={rating} onRatingClick={setRating} />
            </div>
          </div>

          <div>
            <Label htmlFor="feedback-category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select category (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Feedback</SelectItem>
                <SelectItem value="bug">Bug Report</SelectItem>
                <SelectItem value="feature">Feature Request</SelectItem>
                <SelectItem value="ui">User Interface</SelectItem>
                <SelectItem value="data">Data Accuracy</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="feedback-text">Your feedback</Label>
            <Textarea
              id="feedback-text"
              placeholder="Tell us what you think..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
              className="mt-1"
              required
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="hover-scale">
              Send Feedback
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackWidget;