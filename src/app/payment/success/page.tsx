import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-background px-4 py-16 text-foreground">
      <div className="mx-auto max-w-xl rounded-xl border border-border bg-card p-8 text-center shadow-sm">
        <h1 className="text-2xl font-semibold">Payment Successful</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Your payment was completed successfully. Your rental request is now active.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/tenantdashboard" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            Go to Dashboard
          </Link>
          <Link href="/tenantdashboard/rentals" className="rounded-lg border border-border px-4 py-2 text-sm font-medium">
            View Rentals
          </Link>
        </div>
      </div>
    </div>
  );
}
