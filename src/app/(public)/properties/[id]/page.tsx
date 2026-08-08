import React from 'react';
import { notFound, redirect } from 'next/navigation';
import { MapPin, Tag, User, Phone, Mail, Star, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { RentalRequestActions } from '../../_components/RentalRequestActions';
import { cookies } from 'next/headers';

type Props = {
  params: Promise<{ id: string }>;
};

async function fetchPropertyDetails(id: string) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/properties/${id}`, {
      headers: {
        Cookie: accessToken ? `accessToken=${accessToken}` : '',
      },
      cache: 'no-store',
    });
    
    
    if (res.status === 401 || res.status === 403) {
      redirect('/login');
    }
    if (res.status === 404) {
      return null; 
    }

    if (!res.ok) return null;
    
    const result = await res.json();
    return result.data;
  } catch (error) {
    if ((error as Error).message === 'NEXT_REDIRECT') {
      throw error;
    }
    return null;
  }
}

export default async function PropertyDetailsPage({ params }: Props) {
  const { id } = await params;
  const property = await fetchPropertyDetails(id);

  if (!property) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <Link href="/properties" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft size={16} />
          <span>Back to Properties</span>
        </Link>
        <div className="space-y-4">
          {property.images && property.images.length > 0 ? (
            <div className="space-y-3">
              <div className="relative h-72 sm:h-96 w-full rounded-xl overflow-hidden border border-border bg-muted">
                <img 
                  src={property.images[0]} 
                  alt={property.title} 
                  className="object-cover w-full h-full"
                />
              </div>
              {property.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {property.images.slice(1).map((img: string, idx: number) => (
                    <div key={idx} className="relative h-24 rounded-lg overflow-hidden border border-border bg-muted">
                      <img src={img} alt="" className="object-cover w-full h-full" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="h-64 w-full bg-muted rounded-xl flex items-center justify-center text-muted-foreground border border-border">
              No Images Available
            </div>
          )}
        </div>
        
        <div className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-md">
                <Tag size={12} />
                {property.category?.name}
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold">{property.title}</h1>
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin size={16} />
                <span>{property.location}</span>
              </p>
            </div>
            <div className="text-right flex flex-col items-end gap-3">
              <div>
                <span className="text-xs text-muted-foreground block">Price</span>
                <span className="text-2xl font-extrabold text-primary">${property.price} <span className="text-sm font-normal text-muted-foreground">/month</span></span>
              </div>
            </div>
          </div>

         
          <RentalRequestActions propertyId={property.id} />

          <hr className="border-border" />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Description</h3>
            <p className="text-muted-foreground leading-relaxed">{property.description}</p>
          </div>

          {property.amenities && property.amenities.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="text-lg font-semibold">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((amenity: string, index: number) => (
                  <span key={index} className="inline-flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-lg text-xs font-medium text-foreground">
                    <CheckCircle2 size={14} className="text-primary" />
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {property.landlord && (
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <User size={18} className="text-primary" />
                <span>Landlord Information</span>
              </h3>
              <div className="space-y-2 text-sm">
                <p className="font-medium text-foreground">Name: {property.landlord.name}</p>
                <p className="flex items-center gap-2 text-muted-foreground">
                  <Mail size={14} />
                  <span>{property.landlord.email}</span>
                </p>
                <p className="flex items-center gap-2 text-muted-foreground">
                  <Phone size={14} />
                  <span>{property.landlord.phone || "Not provided"}</span>
                </p>
              </div>
            </div>
          )}

          <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Star size={18} className="text-primary" />
              <span>Reviews ({property.reviews?.length || 0})</span>
            </h3>
            
            {property.reviews?.length === 0 || !property.reviews ? (
              <p className="text-sm text-muted-foreground">No reviews yet for this property.</p>
            ) : (
              <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                {property.reviews.map((review: any) => (
                  <div key={review.id} className="p-3 bg-muted/50 rounded-lg text-xs space-y-1">
                    <div className="flex justify-between items-center font-semibold">
                      <span>{review.tenant?.name || "Anonymous"}</span>
                      <span className="text-primary">★ {review.rating}/5</span>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}


