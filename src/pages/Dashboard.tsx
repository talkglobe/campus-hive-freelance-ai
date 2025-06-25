
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Briefcase, Users, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: profile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      return data;
    },
    enabled: !!user
  });

  const { data: myGigs } = useQuery({
    queryKey: ['myGigs', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase
        .from('gigs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      return data || [];
    },
    enabled: !!user
  });

  const { data: myApplications } = useQuery({
    queryKey: ['myApplications', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase
        .from('applications')
        .select(`
          *,
          gigs:gig_id (
            title,
            price_min,
            price_max
          )
        `)
        .eq('applicant_id', user.id)
        .order('created_at', { ascending: false });
      return data || [];
    },
    enabled: !!user
  });

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {profile?.full_name || user.email}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Gigs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myGigs?.length || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myApplications?.length || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {profile?.rating ? `${profile.rating}/5` : 'N/A'}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="gigs" className="w-full">
        <TabsList>
          <TabsTrigger value="gigs">My Gigs</TabsTrigger>
          <TabsTrigger value="applications">My Applications</TabsTrigger>
        </TabsList>

        <TabsContent value="gigs" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">My Gigs</h2>
            <Button onClick={() => navigate('/create-gig')}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Gig
            </Button>
          </div>
          
          <div className="space-y-4">
            {myGigs?.map((gig) => (
              <Card key={gig.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{gig.title}</CardTitle>
                      <CardDescription>{gig.description}</CardDescription>
                    </div>
                    <Badge variant={gig.status === 'active' ? 'default' : 'secondary'}>
                      {gig.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">
                      ${gig.price_min} - ${gig.price_max}
                    </span>
                    <span className="text-sm text-gray-600">{gig.location}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
            {!myGigs?.length && (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-gray-600">No gigs created yet. Create your first gig to get started!</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          <h2 className="text-xl font-semibold">My Applications</h2>
          
          <div className="space-y-4">
            {myApplications?.map((application) => (
              <Card key={application.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{application.gigs?.title}</CardTitle>
                      <CardDescription>{application.proposal}</CardDescription>
                    </div>
                    <Badge variant={
                      application.status === 'accepted' ? 'default' :
                      application.status === 'rejected' ? 'destructive' : 'secondary'
                    }>
                      {application.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Proposed: ${application.proposed_price}</span>
                    <span className="text-sm text-gray-600">
                      Budget: ${application.gigs?.price_min} - ${application.gigs?.price_max}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
            {!myApplications?.length && (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-gray-600">No applications submitted yet. Browse gigs to get started!</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
