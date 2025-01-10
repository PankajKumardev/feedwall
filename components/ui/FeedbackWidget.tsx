'use client';

import { useState } from 'react';
import { MessageSquarePlus, Star, Send } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import axios from 'axios';

interface EnhancedFeedbackWidgetProps {
  projectId: number;
  websiteName: string;
}

export default function FeedbackWidget({
  projectId,
  websiteName,
}: EnhancedFeedbackWidgetProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/feedback', {
        projectid: projectId,
        name,
        email,
        feedback,
        rating,
      });
      setIsSubmitted(true);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(
        'An error occurred while submitting your feedback. Please try again.'
      );
    }
  };

  const PoweredByLink = () => (
    <a
      href="http://localhost:3000/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-muted-foreground hover:underline mt-4 block text-center"
    >
      Powered by{' '}
      <span className="font-semibold text-foreground">Feed-Wall</span>
    </a>
  );

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-12 w-12 bg-primary text-primary-foreground"
          >
            <MessageSquarePlus className="h-6 w-6" />
            <span className="sr-only">Open feedback form</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full max-w-full px-4 py-6 sm:max-w-[425px] sm:px-6 sm:py-8 h-auto max-h-[96vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Feedback
            </DialogTitle>
          </DialogHeader>
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="text-4xl">🎉</div>
              <h3 className="text-2xl font-bold">Thank You!</h3>
              <p className="text-muted-foreground">
                Your feedback for {websiteName} has been submitted successfully.
                We truly appreciate your input!
              </p>
              <PoweredByLink />
            </div>
          ) : (
            <>
              <p className="text-center text-muted-foreground mb-4">
                Your feedback is incredibly valuable to us. It helps us improve
                and serve you better.
              </p>
              {error && (
                <p className="text-center text-red-500 mb-4">{error}</p>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Rating</Label>
                  <div className="flex space-x-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-8 w-8 cursor-pointer transition-colors duration-200 ${
                          star <= rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300 hover:text-yellow-200'
                        }`}
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="feedback">
                    Feedback (max 250 characters)
                  </Label>
                  <Textarea
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value.slice(0, 250))}
                    required
                    className="mt-1 resize-none"
                    rows={4}
                    maxLength={250}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {feedback.length}/250 characters
                  </p>
                </div>
                <input type="hidden" name="projectId" value={projectId} />
                <Button type="submit" className="w-full">
                  <Send className="mr-2 h-4 w-4" /> Submit Feedback
                </Button>
              </form>
              <PoweredByLink />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
