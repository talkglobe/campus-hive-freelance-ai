
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CG</span>
              </div>
              <span className="text-xl font-bold">CampusGig</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering students to build their careers through meaningful freelance opportunities on campus and beyond.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
          
          {/* For Students */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">For Students</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Find Gigs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Build Portfolio</a></li>
              <li><a href="#" className="hover:text-white transition-colors">AI Career Guidance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Skill Development</a></li>
            </ul>
          </div>
          
          {/* For Clients */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">For Clients</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Post Projects</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Find Talent</a></li>
              <li><a href="#" className="hover:text-white transition-colors">AI Matching</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Project Management</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Quality Assurance</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Get in Touch</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>support@campusgig.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Campus Innovation Hub</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © 2024 CampusGig. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
