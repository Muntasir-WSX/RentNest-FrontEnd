"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { createPaymentAction } from "@/app/(dashboard)/_actions/paymentActions";

export default function PaymentFlowCard({ rental }: { rental: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
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

      console.log("Sending Payment Payload -> RentalId:", rentalId, "Amount:", amount);

      const payment = await createPaymentAction(formData);
      console.log("Full Payment Server Response:", payment);
      console.log("Raw Response Data:", JSON.stringify(payment.data, null, 2));
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
          <p className="text-sm text-muted-foreground">{rental.status || rental.requestStatus || "APPROVED"}</p>
        </div>
        <button
          type="button"
          onClick={handlePay}
          disabled={loading}
          className="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
}