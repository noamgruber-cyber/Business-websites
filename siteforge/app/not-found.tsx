import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Big 404 */}
        <div className="text-[10rem] font-black leading-none bg-gradient-to-br from-purple-500/20 to-blue-500/10 bg-clip-text text-transparent mb-6 select-none">
          404
        </div>
        <h1 className="text-3xl font-black text-white mb-3">Page not found</h1>
        <p className="text-white/45 text-base mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl gradient-btn text-white font-bold text-base shadow-xl shadow-purple-500/30"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
