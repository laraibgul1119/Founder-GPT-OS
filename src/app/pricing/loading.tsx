import { Spinner } from '@/components/ui/Spinner';

export default function PricingLoading() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Spinner size="lg" />
          <p className="text-sm text-slate-400">Loading pricing plans...</p>
        </div>
      </div>
    </div>
  );
}
