
import { Button } from "@/components/ui/button";
import { Search, TrendingUp, Users, Zap } from "lucide-react";
import { useState } from "react";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-200 rounded-full blur-3xl opacity-30"></div>
      
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            <span>Campus Freelance Marketplace</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Your Campus
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600"> Gig</span>
            <br />
            Marketplace
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Connect with talented students, find exciting projects, and build your portfolio. 
            The perfect platform for campus freelancing powered by AI.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for gigs, skills, or students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
              />
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
              Find Gigs
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200"
            >
              Post a Project
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">2,500+</div>
              <div className="text-gray-600">Active Students</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">5,000+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl mx-auto mb-4">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
