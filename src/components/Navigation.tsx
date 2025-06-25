
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X, User, Bell } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CG</span>
            </div>
            <span className="text-xl font-bold text-gray-900">CampusGig</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Find Work</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Find Talent</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">How it Works</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">About</a>
          </div>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-700 hover:text-blue-600">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-700 hover:text-blue-600">
              <User className="w-4 h-4 mr-2" />
              Profile
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-green-600 text-white hover:from-blue-700 hover:to-green-700">
              Get Started
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Find Work</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Find Talent</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">How it Works</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">About</a>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-green-600 text-white w-fit">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
