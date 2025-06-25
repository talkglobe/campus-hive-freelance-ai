
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GigCard from "./GigCard";

const FeaturedGigs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const { data: gigs = [], isLoading } = useQuery({
    queryKey: ['gigs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gigs')
        .select(`
          *,
          profiles:user_id (
            full_name,
            university,
            rating
          )
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  const categories = ["Web Development", "Mobile Development", "Design", "Writing", "Marketing", "Data Analysis", "Tutoring", "Photography", "Other"];

  const filteredGigs = gigs.filter((gig) => {
    const matchesSearch = gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gig.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || gig.category === selectedCategory;
    const matchesPriceRange = !priceRange || 
      (priceRange === "0-50" && gig.price_max <= 50) ||
      (priceRange === "50-200" && gig.price_min >= 50 && gig.price_max <= 200) ||
      (priceRange === "200+" && gig.price_min >= 200);
    
    return matchesSearch && matchesCategory && matchesPriceRange;
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Loading Gigs...
            </h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Featured Gigs
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Discover amazing opportunities from talented students
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search gigs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full lg:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Prices</SelectItem>
              <SelectItem value="0-50">$0 - $50</SelectItem>
              <SelectItem value="50-200">$50 - $200</SelectItem>
              <SelectItem value="200+">$200+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Gigs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGigs.map((gig) => (
            <GigCard 
              key={gig.id} 
              gig={{
                ...gig,
                freelancer: {
                  name: gig.profiles?.full_name || 'Anonymous',
                  university: gig.profiles?.university || 'University',
                  rating: gig.profiles?.rating || 0
                }
              }} 
            />
          ))}
        </div>

        {filteredGigs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {gigs.length === 0 
                ? "No gigs available yet. Be the first to create one!" 
                : "No gigs match your search criteria."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedGigs;
