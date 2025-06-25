
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Star, MapPin, Clock, DollarSign } from "lucide-react";

interface GigCardProps {
  title: string;
  description: string;
  price: string;
  duration: string;
  location: string;
  rating: number;
  reviews: number;
  skills: string[];
  freelancer: {
    name: string;
    avatar: string;
    university: string;
  };
}

const GigCard = ({ title, description, price, duration, location, rating, reviews, skills, freelancer }: GigCardProps) => {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">{title}</h3>
            <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            <span className="font-semibold text-green-600">{price}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="py-3">
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
              {skill}
            </Badge>
          ))}
          {skills.length > 3 && (
            <Badge variant="secondary" className="text-xs bg-gray-50 text-gray-600">
              +{skills.length - 3} more
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={freelancer.avatar}
              alt={freelancer.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-sm text-gray-900">{freelancer.name}</p>
              <p className="text-xs text-gray-500">{freelancer.university}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-sm">{rating}</span>
            <span className="text-xs text-gray-500">({reviews})</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-3">
        <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GigCard;
