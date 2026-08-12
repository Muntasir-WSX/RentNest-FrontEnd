"use client";

import { useState } from "react";

type ReviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  rental: any;
  onSuccess: () => void;
};

export default function ReviewModal({ isOpen, onClose, rental, onSuccess }: ReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const token = localStorage.getItem("accessToken") || localStorage.getItem("token") || "";

      
      const targetRentalRequestId = rental?.rentalRequestId || rental?.id || rental?.requestId;

      const res = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          rentalRequestId: targetRentalRequestId,
          rating: Number(rating),
          comment,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        onSuccess();
        onClose();
      } else {
       
        const errorDetail = data.error ? Object.values(data.error).join(", ") : "";
        setErrorMessage(data.message || errorDetail || "Failed to submit review.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-lg text-foreground">
        <h2 className="text-xl font-semibold mb-1">Leave a Review</h2>
        <p className="text-xs text-muted-foreground mb-4">
          Property: {rental?.property?.title || rental?.propertyTitle || "Property"}
        </p>

        {errorMessage && (
          <div className="mb-4 rounded-lg bg-red-500/10 p-3 text-xs text-red-500 border border-red-500/20">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium mb-1">Rating (1 to 5)</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value={5}>5 - Excellent</option>
              <option value={4}>4 - Good</option>
              <option value={3}>3 - Average</option>
              <option value={2}>2 - Poor</option>
              <option value={1}>1 - Terrible</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium mb-1">Your Feedback</label>
            <textarea
              required
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your experience about this property..."
              className="w-full rounded-lg border border-border bg-background p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
            className="rounded-lg border border-border px-4 py-2 text-xs font-semibold hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}