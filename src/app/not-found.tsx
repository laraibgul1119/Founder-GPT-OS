import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 p-6 sm:p-8 text-center">
      <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl gradient-bg flex items-center justify-center mb-5 sm:mb-6 shadow-lg">
        <span className="text-2xl sm:text-3xl font-extrabold text-white">4</span>
      </div>
      <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">Page Not Found</h1>
      <p className="text-xs sm:text-sm text-slate-400 max-w-md mb-6 sm:mb-8 leading-relaxed">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-xl gradient-bg px-5 py-3 text-sm font-semibold text-white shadow-lg hover:brightness-110 transition-all min-h-[48px]"
      >
        <Home className="h-4 w-4 shrink-0" />
        Back to Home
      </Link>
    </div>
  );
}
