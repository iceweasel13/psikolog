// app/icon.tsx
import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <svg
          viewBox="0 0 100 100"
          width="100%"
          height="100%"
          fill="#5c4436"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 12 10 C 24 16 28 28 28 36 C 22 43 17 48 20 56 C 24 61 30 63 28 72 C 23 81 12 84 12 96 L 38 96 C 38 84 42 72 47 62 C 41 52 35 40 35 25 C 35 14 42 8 42 8 C 30 8 20 9 12 10 Z" />
          <path d="M 88 10 C 76 16 72 28 72 36 C 78 43 83 48 80 56 C 76 61 70 63 72 72 C 77 81 88 84 88 96 L 62 96 C 62 84 58 72 53 62 C 59 52 65 40 65 25 C 65 14 58 8 58 8 C 70 8 80 9 88 10 Z" />
          <path d="M 46 4 L 54 4 L 54 78 L 46 78 Z M 41 88 L 59 88 L 59 97 L 41 97 Z" />
        </svg>
      </div>
    ),
    { ...size }
  );
}