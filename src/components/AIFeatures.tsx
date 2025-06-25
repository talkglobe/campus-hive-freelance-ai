
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Target, MessageCircle, TrendingUp, Zap, Users } from "lucide-react";

const AIFeatures = () => {
  const features = [
    {
      icon: Brain,
      title: "Smart Gig Matching",
      description: "Our AI analyzes your skills, experience, and preferences to recommend the perfect gigs tailored just for you.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Target,
      title: "Skill Gap Analysis",
      description: "Get personalized recommendations on which skills to develop based on market demand and your career goals.",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: MessageCircle,
      title: "AI-Powered Chat Support",
      description: "24/7 intelligent chat assistant to help with project questions, disputes, and platform guidance.",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: TrendingUp,
      title: "Price Optimization",
      description: "AI-driven pricing suggestions based on project complexity, market rates, and your experience level.",
      color: "bg-orange-100 text-orange-600"
    },
    {
      icon: Zap,
      title: "Auto Project Proposals",
      description: "Generate compelling project proposals automatically using AI that understands client requirements.",
      color: "bg-red-100 text-red-600"
    },
    {
      icon: Users,
      title: "Collaborative AI",
      description: "Form optimal team compositions with AI-recommended collaborators based on complementary skills.",
      color: "bg-teal-100 text-teal-600"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-green-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Brain className="w-4 h-4" />
            <span>AI-Powered Features</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Supercharge Your Freelancing with AI
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of campus freelancing with our cutting-edge AI features designed to maximize your success and efficiency.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Experience AI-Powered Freelancing?</h3>
          <p className="text-lg mb-6 opacity-90">Join thousands of students already using AI to boost their freelance success.</p>
          <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors">
            Get Started with AI Features
          </button>
        </div>
      </div>
    </section>
  );
};

export default AIFeatures;
