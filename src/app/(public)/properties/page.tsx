import React from 'react';
import Link from 'next/link';
import { Home, MapPin, Tag, ArrowRight, Search as SearchIcon, CheckCircle, XCircle } from 'lucide-react';

type Property = {
  id: string;
  title: string;
  description: string;
  price: number | string;
  location: string;
  images: string[];
  isAvailable: boolean;
  category?: {
    id: string;
    name: string;
  };
};

type ApiResponse = {
  success: boolean;
  message: string;
  data: Property[];
};

type Props = {
  searchParams: Promise<{
    search?: string;
    city?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
};

async function fetchProperties(queryStr: string): Promise<Property[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/properties${queryStr}`, {
      cache: 'no-store',
    });
    
    if (!res.ok) throw new Error('Failed to fetch properties');
    const result: ApiResponse = await res.json();
    return result.data || [];
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

export default async function Propertiespage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  
  const params = new URLSearchParams();
  if (resolvedParams.search) params.append('search', resolvedParams.search);
  if (resolvedParams.city) params.append('city', resolvedParams.city);
  if (resolvedParams.minPrice) params.append('minPrice', resolvedParams.minPrice);
  if (resolvedParams.maxPrice) params.append('maxPrice', resolvedParams.maxPrice);

  const queryString = params.toString() ? `?${params.toString()}` : '';
  const properties = await fetchProperties(queryString);

  return (
    <div className="min-h-screen bg-background text-foreground pb-16">
      <div className="relative bg-muted py-12 px-4 sm:px-6 lg:px-8 border-b border-border mb-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
            <Home size={14} />
            <span>All Properties</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Browse All Properties
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Browse available rentals and find your perfect home.
          </p>
          <form method="GET" className="bg-card border border-border p-4 rounded-2xl shadow-sm grid grid-cols-1 md:grid-cols-12 gap-3 mt-6">
            <div className="md:col-span-5 relative flex items-center">
              <SearchIcon size={18} className="absolute left-3 text-muted-foreground" />
              <input 
                type="text" 
                name="search"
                defaultValue={resolvedParams.search || ''}
                placeholder="Search by title or location..." 
                className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="md:col-span-3">
              <input 
                type="text" 
                name="city"
                defaultValue={resolvedParams.city || ''}
                placeholder="City (e.g. Dhaka)" 
                className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="md:col-span-2">
              <input 
                type="number" 
                name="minPrice"
                defaultValue={resolvedParams.minPrice || ''}
                placeholder="Min price" 
                className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="md:col-span-2 flex gap-2">
              <input 
                type="number" 
                name="maxPrice"
                defaultValue={resolvedParams.maxPrice || ''}
                placeholder="Max price" 
                className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button 
                type="submit" 
                className="px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-xl text-sm hover:bg-primary/90 transition-colors flex items-center justify-center"
              >
                Search
              </button>
            </div>

          </form>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Available Listings</h2>
          <span className="text-sm text-muted-foreground">
            Total {properties.length} properties found
          </span>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-20 bg-card border border-border rounded-xl">
            <p className="text-muted-foreground">No properties match your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div 
                key={property.id} 
                className="rounded-xl border border-border bg-card text-card-foreground shadow-sm overflow-hidden flex flex-col justify-between transition-all hover:shadow-md"
              >
                <div className="relative h-48 w-full bg-muted">
                  {property.images && property.images.length > 0 ? (
                    <img 
                      src={property.images[0]} 
                      alt={property.title}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-xs text-muted-foreground">
                      No Image Available
                    </div>
                  )}
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 text-xs font-semibold text-primary-foreground bg-primary/80 backdrop-blur-md px-2.5 py-1 rounded-md">
                    <Tag size={12} />
                    {property.category?.name || "General"}
                  </span>
                  <span className={`absolute top-3 right-3 inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md backdrop-blur-md shadow-sm ${
                    property.isAvailable 
                      ? "bg-emerald-500/90 text-white" 
                      : "bg-rose-500/90 text-white"
                  }`}>
                    {property.isAvailable ? (
                      <>
                        <CheckCircle size={12} />
                        <span>Available</span>
                      </>
                    ) : (
                      <>
                        <XCircle size={12} />
                        <span>Rented Out</span>
                      </>
                    )}
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
                      href={`/properties/${property.id}`} 
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <span> Property Details </span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}