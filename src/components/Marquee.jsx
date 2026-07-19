export default function Marquee({ items, className = "" }) {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className="flex w-max animate-marquee">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 mx-6 text-sm md:text-base font-semibold uppercase tracking-wide text-white shrink-0"
          >
            {item}
            <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
          </span>
        ))}
      </div>
    </div>
  );
}
