import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
            <div className="space-y-4 max-w-md">
           
                <span className="inline-block px-3.5 py-1.5 text-xs font-semibold tracking-wider text-primary bg-primary/10 rounded-full uppercase">
                    404 Error
                </span>

              
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                    Page Not Found
                </h2>

               
                <p className="text-muted-foreground text-sm md:text-base">
                    Could not find the requested resource. The page you are looking for might have been removed or is temporarily unavailable.
                </p>

              
                <div className="pt-4">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg shadow-sm transition-colors duration-200"
                    >
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
}