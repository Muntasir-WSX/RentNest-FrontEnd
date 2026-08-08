import React from 'react';
import Link from 'next/link';
import { MapPin, Tag, ArrowRight } from 'lucide-react';

type Property = {
  id: string;
  title: string;
  description: string;
  price: number | string;
  location: string;
  images: string[];
  isAvailable: boolean;
  category?: {
    name: string;
  };
};

type ApiResponse = {
  success: boolean;
  data: Property[];
};

async function fetchFeaturedProperties(): Promise<Property[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/properties`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const result: ApiResponse = await res.json();
    return result.data || [];
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

export default async function FeaturedProperties() {
  const allProperties = await fetchFeaturedProperties();
  
 
  const featuredProperties = allProperties.slice(0, 6);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 text-center md:text-left">
        <div>
          <span className="text-xs font-semibold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full">
            Top Choices
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight mt-2">Featured Properties</h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            Explore our handpicked selection of top-rated properties available for rent.
          </p>
        </div>
        <Link 
          href="/properties" 
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors"
        >
          <span>Browse All</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      {featuredProperties.length === 0 ? (
        <div className="text-center py-12 bg-card border border-border rounded-xl">
          <p className="text-muted-foreground">No featured properties found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((property) => {
            
            const propertyImage = property.images && property.images.length > 0 
              ? property.images[0] 
              : "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85";

            return (
              <div 
                key={property.id} 
                className="rounded-xl border border-border bg-card text-card-foreground shadow-sm overflow-hidden flex flex-col justify-between transition-all hover:shadow-md"
              >
                <div className="relative h-48 w-full bg-muted">
                  <img 
                    src={propertyImage} 
                    alt={property.title}
                    className="object-cover w-full h-full"
                  />
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 text-xs font-semibold text-primary-foreground bg-primary/80 backdrop-blur-md px-2.5 py-1 rounded-md">
                    <Tag size={12} />
                    {property.category?.name || "General"}
                  </span>
                </div>

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div>
                      <h3 className="text-lg font-bold line-clamp-1">{property.title}</h3>
                      <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <MapPin size={14} />
                        <span className="truncate">{property.location}</span>
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {property.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-border">
                    <div>
                      <span className="text-xs text-muted-foreground block">Rent Price</span>
                      <span className="text-lg font-extrabold text-primary">${property.price} <span className="text-xs font-normal text-muted-foreground">/mo</span></span>
                    </div>
                    
                    <Link 
                      href={`/properties`} 
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <span> Browse Properties</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}