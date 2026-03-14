import Link from 'next/link';

type Props = {
  params: { slug: string };
};

export default function BusinessPage({ params }: Props) {
  const { slug } = params;

  return (
    <main className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Success animation */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-purple-500/40">
          <span className="text-5xl">🚀</span>
        </div>

        <h1 className="text-4xl font-black text-white mb-3">
          Website Published!
        </h1>
        <p className="text-white/50 text-base mb-2">
          Your site is live at
        </p>
        <p className="text-purple-400 font-mono text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-2 inline-block mb-8">
          siteforge.com/b/{slug}
        </p>

        <p className="text-white/30 text-sm mb-10">
          The full business page will be available in the next update.
          Your data has been saved successfully.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/create"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-sm transition-all duration-200"
          >
            Create Another Website
          </Link>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl border border-white/10 hover:border-white/20 text-white/60 hover:text-white font-semibold text-sm transition-all duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
