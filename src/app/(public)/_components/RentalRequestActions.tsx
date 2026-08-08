'use client';
import { useState } from 'react';
import Swal from 'sweetalert2';

export async function sendRentalRequest(propertyId: string) {
  const today = new Date().toISOString().split('T')[0];
  const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  return await fetch('/api/rentals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      propertyId: propertyId,
      startDate: today,
      endDate: nextWeek
    }),
  });
}

export function RentalRequestActions({ propertyId }: { propertyId: string }) {
  const [loading, setLoading] = useState(false);

  const handleRequestRent = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to send a rental request for this property?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Send Request!'
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        const res = await sendRentalRequest(propertyId);
        const data = await res.json().catch(() => ({}));

        if (res.ok) {
          Swal.fire(
            'Success!',
            'Your rental request has been sent successfully.',
            'success'
          );
        } else {
          if (res.status === 401) {
            Swal.fire(
              'Login Required',
              'Please login as a tenant to send a rental request.',
              'warning'
            );
            return;
          }

          Swal.fire(
            'Failed!',
            data.message || 'Something went wrong.',
            'error'
          );
        }
      } catch {
        Swal.fire(
          'Error!',
          'Could not connect to the server.',
          'error'
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <button
      onClick={handleRequestRent}
      disabled={loading}
      className="w-full py-3 px-4 bg-primary text-primary-foreground font-medium rounded-xl text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
    >
      {loading ? "Sending Request..." : "Request Rental"}
    </button>
  );
}