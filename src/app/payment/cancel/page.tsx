import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-background px-4 py-16 text-foreground">
      <div className="mx-auto max-w-xl rounded-xl border border-border bg-card p-8 text-center shadow-sm">
        <h1 className="text-2xl font-semibold">Payment Cancelled</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Your payment was cancelled. You can try again from the payments page anytime.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/tenantdashboard/payments"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Try Again
          </Link>
          <Link
            href="/tenantdashboard"
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}