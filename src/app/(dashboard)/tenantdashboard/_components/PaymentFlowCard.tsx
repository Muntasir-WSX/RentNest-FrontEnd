"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { createPaymentAction } from "@/app/(dashboard)/_actions/paymentActions";

export default function PaymentFlowCard({ rental }: { rental: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  
  const paymentsList = rental.payments || [];
  const hasPaid = paymentsList.some(
    (p: any) => p.status?.toUpperCase() === "SUCCESS" || p.status?.toUpperCase() === "COMPLETED" || p.status?.toUpperCase() === "PAID"
  );

  const handlePay = async () => {
    if (hasPaid) return;

    const result = await Swal.fire({
      title: "Start payment?",
      text: "This will begin the checkout flow for the approved rental.",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Continue",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    setLoading(true);
    try {
      const formData = new FormData();
      
      const rentalId = rental.id || rental.rentalId || "";
      const amount = rental.amount || rental.totalAmount || rental.property?.price || "0";

      formData.set("rentalRequestId", rentalId);
      formData.set("amount", String(amount));

      const payment = await createPaymentAction(formData);
      
      const paymentUrl = 
        payment?.data?.data?.url || 
        payment?.data?.url || 
        payment?.data?.paymentUrl ||
        payment?.data?.checkoutUrl ||
        payment?.data?.data?.paymentUrl ||
        payment?.data?.paymentGatewayUrl;

      if (payment?.ok && paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        toast.error(payment?.data?.message || "Payment URL not found in response.");
      }
    } catch (err) {
      console.error("Payment Error:", err);
      toast.error("Unable to start payment right now.");
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <div className="rounded-lg border border-border p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-medium">{rental.property?.title || rental.propertyTitle || "Approved Rental"}</p>
          <p className="text-sm text-muted-foreground">
            {hasPaid ? "Payment Completed" : (rental.status || rental.requestStatus || "APPROVED")}
          </p>
        </div>
        <button
          type="button"
          onClick={handlePay}
          disabled={loading || hasPaid}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
            hasPaid
              ? "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          {loading ? "Processing..." : hasPaid ? "Paid" : "Pay Now"}
        </button>
      </div>
    </div>
  );
}