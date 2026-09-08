export function SectionDivider() {
  return (
    <div className="w-full overflow-hidden leading-none -mb-px">
      <svg
        viewBox="0 0 960 166"
        className="block w-full h-12 sm:h-20 lg:h-28 text-brand-primary"
        preserveAspectRatio="none"
        fill="currentColor"
      >
        {/* Haikei dalgası: Sadece path'i alıyoruz, alt zemin rengi (#E4DAD2) ile birebir aynı */}
        <path
          d="M0 0L22.8 6.7C45.7 13.3 91.3 26.7 137 40.5C182.7 54.3 228.3 68.7 274 69C319.7 69.3 365.3 55.7 411.2 41C457 26.3 503 10.7 548.8 12C594.7 13.3 640.3 31.7 686 36.8C731.7 42 777.3 34 823 40.7C868.7 47.3 914.3 68.7 937.2 79.3L960 90L960 166L937.2 166C914.3 166 868.7 166 823 166C777.3 166 731.7 166 686 166C640.3 166 594.7 166 548.8 166C503 166 457 166 411.2 166C365.3 166 319.7 166 274 166C228.3 166 182.7 166 137 166C91.3 166 45.7 166 22.8 166L0 166Z"
          strokeLinecap="round"
          strokeLinejoin="miter"
        />
      </svg>
    </div>
  );
}