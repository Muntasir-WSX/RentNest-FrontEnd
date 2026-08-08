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
      formData.set("rentalId", rental.id || rental.rentalId || "");
      formData.set("amount", rental.amount || rental.totalAmount || "0");
      const payment = await createPaymentAction(formData);

      if (payment.ok && payment.data?.data?.url) {
        window.location.href = payment.data.data.url;
      } else {
        toast.error(payment.data?.message || "Payment initialization failed.");
      }
    } catch {
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
          className="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
}
