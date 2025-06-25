
import GigCard from "./GigCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FeaturedGigs = () => {
  const sampleGigs = [
    {
      title: "AI-Powered Study Assistant Development",
      description: "Build a smart study companion app with machine learning features for personalized learning paths and quiz generation.",
      price: "$800-1,200",
      duration: "2-3 weeks",
      location: "Remote",
      rating: 4.9,
      reviews: 23,
      skills: ["Python", "Machine Learning", "React", "Flask", "AI"],
      freelancer: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b8e9?w=100&h=100&fit=crop&crop=face",
        university: "Stanford University"
      }
    },
    {
      title: "Campus Event Management Mobile App",
      description: "Create a comprehensive mobile application for managing campus events, RSVPs, and student engagement analytics.",
      price: "$600-900",
      duration: "3-4 weeks",
      location: "Hybrid",
      rating: 4.8,
      reviews: 31,
      skills: ["React Native", "Firebase", "UI/UX", "MongoDB"],
      freelancer: {
        name: "Alex Rodriguez",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        university: "MIT"
      }
    },
    {
      title: "Data Analytics Dashboard for Student Performance",
      description: "Design and develop an interactive dashboard to visualize student performance metrics and learning analytics.",
      price: "$500-800",
      duration: "2-3 weeks",
      location: "Remote",
      rating: 4.7,
      reviews: 18,
      skills: ["Python", "D3.js", "Data Science", "Pandas", "Visualization"],
      freelancer: {
        name: "Maya Patel",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        university: "UC Berkeley"
      }
    },
    {
      title: "Blockchain-Based Credential Verification System",
      description: "Develop a secure blockchain system for verifying and storing academic credentials and certificates.",
      price: "$1,000-1,500",
      duration: "4-5 weeks",
      location: "Remote",
      rating: 4.9,
      reviews: 12,
      skills: ["Blockchain", "Solidity", "Web3", "Smart Contracts", "Security"],
      freelancer: {
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        university: "Harvard University"
      }
    },
    {
      title: "Social Learning Platform with AI Recommendations",
      description: "Build a collaborative learning platform with AI-powered course recommendations and peer matching.",
      price: "$900-1,300",
      duration: "3-4 weeks",
      location: "Remote",
      rating: 4.8,
      reviews: 27,
      skills: ["React", "Node.js", "AI/ML", "MongoDB", "WebRTC"],
      freelancer: {
        name: "Emily Johnson",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
        university: "Yale University"
      }
    },
    {
      title: "Campus Sustainability Tracking App",
      description: "Create an app to track and gamify campus sustainability efforts with real-time environmental impact data.",
      price: "$400-700",
      duration: "2-3 weeks",
      location: "Hybrid",
      rating: 4.6,
      reviews: 15,
      skills: ["Flutter", "IoT", "API Integration", "Data Visualization"],
      freelancer: {
        name: "Ryan Thompson",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
        university: "University of Washington"
      }
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Campus Gigs</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover exciting projects posted by students and faculty. From AI development to mobile apps, find your next opportunity.
          </p>
        </div>
        
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full grid-cols-4 max-w-md mx-auto">
            <TabsTrigger value="all">All Gigs</TabsTrigger>
            <TabsTrigger value="tech">Tech</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleGigs.map((gig, index) => (
                <GigCard key={index} {...gig} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="tech" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleGigs.filter(gig => 
                gig.skills.some(skill => 
                  ['Python', 'React', 'JavaScript', 'AI', 'Blockchain', 'Flutter'].includes(skill)
                )
              ).map((gig, index) => (
                <GigCard key={index} {...gig} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="design" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleGigs.filter(gig => 
                gig.skills.some(skill => 
                  ['UI/UX', 'Design', 'Visualization'].includes(skill)
                )
              ).map((gig, index) => (
                <GigCard key={index} {...gig} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="research" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleGigs.filter(gig => 
                gig.skills.some(skill => 
                  ['Data Science', 'Research', 'Analytics'].includes(skill)
                )
              ).map((gig, index) => (
                <GigCard key={index} {...gig} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="text-center">
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8">
            View All Gigs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedGigs;
