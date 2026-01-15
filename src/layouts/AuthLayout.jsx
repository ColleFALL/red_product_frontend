export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-neutral-800">
      {/* Background (approx du Figma) */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.06),transparent_60%)]" />
        <div className="absolute inset-0 opacity-40 bg-[linear-gradient(135deg,rgba(0,0,0,0.55),rgba(0,0,0,0.2))]" />
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
