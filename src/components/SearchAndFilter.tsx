
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Search, Filter, X } from 'lucide-react';

interface SearchFilters {
  searchTerm: string;
  category: string;
  priceRange: [number, number];
  rating: number;
  dietaryRestrictions: string[];
  spiceLevel: number[];
  preparationTime: number;
  sortBy: string;
}

interface SearchAndFilterProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  categories: string[];
}

const SearchAndFilter = ({ filters, onFiltersChange, categories }: SearchAndFilterProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const dietaryOptions = [
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'gluten-free', label: 'Gluten Free' },
    { id: 'dairy-free', label: 'Dairy Free' },
    { id: 'nut-free', label: 'Nut Free' },
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'preparation-time', label: 'Fastest Delivery' },
    { value: 'newest', label: 'Newest Items' },
  ];

  const updateFilters = (key: keyof SearchFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleDietaryRestriction = (restriction: string) => {
    const current = filters.dietaryRestrictions;
    const updated = current.includes(restriction)
      ? current.filter(r => r !== restriction)
      : [...current, restriction];
    updateFilters('dietaryRestrictions', updated);
  };

  const clearFilters = () => {
    onFiltersChange({
      searchTerm: '',
      category: 'all',
      priceRange: [0, 100],
      rating: 0,
      dietaryRestrictions: [],
      spiceLevel: [],
      preparationTime: 120,
      sortBy: 'relevance'
    });
  };

  const hasActiveFilters = 
    filters.searchTerm ||
    filters.category !== 'all' ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 100 ||
    filters.rating > 0 ||
    filters.dietaryRestrictions.length > 0 ||
    filters.spiceLevel.length > 0 ||
    filters.preparationTime < 120 ||
    filters.sortBy !== 'relevance';

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Search & Filter</CardTitle>
          <div className="flex gap-2">
            {hasActiveFilters && (
              <Button size="sm" variant="outline" onClick={clearFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-1" />
              Filters
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Search and Sort */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search for food items..."
                value={filters.searchTerm}
                onChange={(e) => updateFilters('searchTerm', e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filters.sortBy} onValueChange={(value) => updateFilters('sortBy', value)}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Category */}
          <div>
            <Select value={filters.category} onValueChange={(value) => updateFilters('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="space-y-6 pt-4 border-t">
              {/* Price Range */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                </label>
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => updateFilters('priceRange', value as [number, number])}
                  max={100}
                  step={5}
                  className="mt-2"
                />
              </div>

              {/* Minimum Rating */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Minimum Rating: {filters.rating || 'Any'}
                </label>
                <Slider
                  value={[filters.rating]}
                  onValueChange={(value) => updateFilters('rating', value[0])}
                  max={5}
                  step={0.5}
                  className="mt-2"
                />
              </div>

              {/* Preparation Time */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Max Preparation Time: {filters.preparationTime === 120 ? '2+ hours' : `${filters.preparationTime} min`}
                </label>
                <Slider
                  value={[filters.preparationTime]}
                  onValueChange={(value) => updateFilters('preparationTime', value[0])}
                  max={120}
                  step={15}
                  className="mt-2"
                />
              </div>

              {/* Dietary Restrictions */}
              <div>
                <label className="text-sm font-medium mb-3 block">Dietary Preferences</label>
                <div className="grid grid-cols-2 gap-3">
                  {dietaryOptions.map(option => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={option.id}
                        checked={filters.dietaryRestrictions.includes(option.id)}
                        onCheckedChange={() => toggleDietaryRestriction(option.id)}
                      />
                      <label htmlFor={option.id} className="text-sm">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Spice Level */}
              <div>
                <label className="text-sm font-medium mb-3 block">Spice Level</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(level => (
                    <Button
                      key={level}
                      size="sm"
                      variant={filters.spiceLevel.includes(level) ? "default" : "outline"}
                      onClick={() => {
                        const current = filters.spiceLevel;
                        const updated = current.includes(level)
                          ? current.filter(l => l !== level)
                          : [...current, level];
                        updateFilters('spiceLevel', updated);
                      }}
                    >
                      🌶️ {level}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchAndFilter;
