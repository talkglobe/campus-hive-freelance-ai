
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const CreateGig = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const categories = [
    'Web Development', 'Mobile Development', 'Design', 'Writing', 
    'Marketing', 'Data Analysis', 'Tutoring', 'Photography', 'Other'
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    const gigData = {
      user_id: user.id,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      price_min: parseInt(formData.get('priceMin') as string),
      price_max: parseInt(formData.get('priceMax') as string),
      duration: formData.get('duration') as string,
      location: formData.get('location') as string,
      category: formData.get('category') as string,
      skills_required: (formData.get('skills') as string).split(',').map(s => s.trim())
    };

    const { error } = await supabase
      .from('gigs')
      .insert([gigData]);

    if (error) {
      toast.error('Failed to create gig: ' + error.message);
    } else {
      toast.success('Gig created successfully!');
      navigate('/dashboard');
    }

    setLoading(false);
  };

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Create a New Gig</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input
                name="title"
                placeholder="e.g., Build a responsive website"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                name="description"
                placeholder="Describe your project in detail..."
                className="min-h-32"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Min Price ($)</label>
                <Input
                  name="priceMin"
                  type="number"
                  placeholder="50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Max Price ($)</label>
                <Input
                  name="priceMax"
                  type="number"
                  placeholder="200"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Duration</label>
              <Input
                name="duration"
                placeholder="e.g., 1-2 weeks"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <Input
                name="location"
                placeholder="e.g., Remote, On-campus, Boston"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <Select name="category" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Required Skills</label>
              <Input
                name="skills"
                placeholder="e.g., React, TypeScript, UI/UX (comma separated)"
                required
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? 'Creating...' : 'Create Gig'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateGig;
