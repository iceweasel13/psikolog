import type { SVGProps } from "react";

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 2a9.75 9.75 0 0 0-8.4 14.69L2 22l5.45-1.55A9.75 9.75 0 1 0 12 2Zm0 17.5a7.7 7.7 0 0 1-3.93-1.08l-.38-.23-3.23.92.95-3.14-.25-.4A7.75 7.75 0 1 1 12 19.5Zm4.25-5.8c-.23-.12-1.37-.68-1.58-.75-.21-.08-.36-.12-.52.11-.15.24-.6.75-.74.9-.13.16-.27.18-.5.06-.23-.11-.98-.36-1.86-1.15a6.94 6.94 0 0 1-1.29-1.6c-.13-.23-.01-.36.1-.47.1-.1.23-.27.35-.4.11-.14.15-.24.23-.4.08-.15.04-.29-.02-.4-.06-.12-.52-1.25-.71-1.71-.19-.45-.38-.39-.52-.4h-.44c-.15 0-.4.06-.61.29-.21.23-.8.78-.8 1.91 0 1.12.82 2.21.93 2.36.12.16 1.61 2.46 3.9 3.45.55.23.97.38 1.3.49.55.17 1.04.15 1.43.09.44-.07 1.37-.56 1.56-1.1.2-.55.2-1.02.14-1.1-.06-.1-.21-.16-.44-.28Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.4" cy="6.7" r="1.1" fill="currentColor" />
    </svg>
  );
}
