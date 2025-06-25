
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, MapPin, Clock, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface GigCardProps {
  gig: {
    id: string;
    title: string;
    description: string;
    price_min: number;
    price_max: number;
    duration: string;
    location: string;
    category: string;
    skills_required: string[];
    freelancer: {
      name: string;
      university: string;
      rating: number;
    };
  };
}

const GigCard = ({ gig }: GigCardProps) => {
  const { user } = useAuth();
  const [isApplying, setIsApplying] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleApply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to apply for gigs');
      return;
    }
    
    setIsApplying(true);
    const formData = new FormData(e.currentTarget);
    
    const applicationData = {
      gig_id: gig.id,
      applicant_id: user.id,
      proposal: formData.get('proposal') as string,
      proposed_price: parseInt(formData.get('proposedPrice') as string)
    };

    const { error } = await supabase
      .from('applications')
      .insert([applicationData]);

    if (error) {
      if (error.code === '23505') {
        toast.error('You have already applied for this gig');
      } else {
        toast.error('Failed to submit application: ' + error.message);
      }
    } else {
      toast.success('Application submitted successfully!');
      setShowDialog(false);
    }

    setIsApplying(false);
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{gig.title}</CardTitle>
            <CardDescription className="text-sm line-clamp-3">
              {gig.description}
            </CardDescription>
          </div>
          <Badge variant="secondary">{gig.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-green-600">
            ${gig.price_min} - ${gig.price_max}
          </span>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            <span>{gig.duration}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{gig.location}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {gig.skills_required.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {gig.skills_required.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{gig.skills_required.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">
                {gig.freelancer.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{gig.freelancer.name}</p>
              <p className="text-xs text-gray-600">{gig.freelancer.university}</p>
            </div>
          </div>
          {gig.freelancer.rating > 0 && (
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm ml-1">{gig.freelancer.rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button className="w-full">Apply Now</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Apply for "{gig.title}"</DialogTitle>
              <DialogDescription>
                Submit your proposal and proposed price for this gig.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Your Proposal</label>
                <Textarea
                  name="proposal"
                  placeholder="Explain why you're the right person for this gig..."
                  className="min-h-24"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Your Price ($)</label>
                <Input
                  name="proposedPrice"
                  type="number"
                  min={gig.price_min}
                  max={gig.price_max}
                  placeholder={`${gig.price_min} - ${gig.price_max}`}
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowDialog(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isApplying} className="flex-1">
                  {isApplying ? 'Submitting...' : 'Submit Application'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default GigCard;
