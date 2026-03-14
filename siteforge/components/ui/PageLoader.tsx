export default function PageLoader() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center gap-5">
      <div className="flex items-center gap-2">
        <span className="text-3xl">⚡</span>
        <span className="text-2xl font-bold">
          <span className="gradient-text">SiteForge</span>
        </span>
      </div>
      <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
