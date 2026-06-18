import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 p-8 text-center">
      <div className="h-16 w-16 rounded-2xl gradient-bg flex items-center justify-center mb-6 shadow-lg">
        <span className="text-3xl font-extrabold text-white">4</span>
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">Page Not Found</h1>
      <p className="text-sm text-slate-400 max-w-md mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-xl gradient-bg px-5 py-3 text-sm font-semibold text-white shadow-lg hover:brightness-110 transition-all"
      >
        <Home className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
}
