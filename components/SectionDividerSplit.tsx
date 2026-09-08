export function SectionDividerSplit() {
  return (
    <div className="relative z-10 -mb-px w-full overflow-hidden bg-brand-bg leading-none">
      <svg
        viewBox="0 0 960 180"
        preserveAspectRatio="none"
        className="block h-20 w-full sm:h-28 lg:h-36 text-brand-primary"
        fill="currentColor"
      >
        <path
          d="
            M0 0
            H960
            V180
            H820

            C790 165 760 145 730 120
            C695 92 650 72 600 72

            C530 72 485 95 420 88
            C365 82 325 55 270 48
            C215 41 180 62 130 68
            C80 74 40 67 0 58

            Z
          "
        />
      </svg>
    </div>
  );
}