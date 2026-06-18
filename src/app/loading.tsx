import { Spinner } from '@/components/ui/Spinner';

export default function RootLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950">
      <Spinner size="lg" />
      <p className="mt-4 text-sm text-slate-400">Loading FounderGPT...</p>
    </div>
  );
}
