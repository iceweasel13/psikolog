export function PsychologyLogo({
  className = "w-7 h-7",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Sol yarı */}
      <path
        fill="currentColor"
        d="
          M48 16
          C40 15 31 14 24 13
          C20 13 18 15 19 19

          C21 28 22 38 21 47
          C20 54 17 60 12 65
          C10 67 10 69 13 70

          L18 72
          C16 74 16 76 18 78
          C19 79 21 80 23 80

          C20 81 19 83 20 85
          C21 88 24 89 27 89

          C27 94 29 98 33 100
          C37 102 43 102 49 101

          L57 100
          L57 65

          C50 64 44 62 40 58
          C34 52 31 43 31 32

          L31 20
          C31 18 33 17 35 18

          C41 20 46 21 51 21
          C54 21 56 20 58 18

          L58 57

          C54 56 51 54 49 51
          C46 47 45 42 45 36
          L45 21

          C45 18 46 17 48 16
          Z
        "
      />

      {/* Sağ yarı */}
      <path
        fill="currentColor"
        d="
          M72 16
          C80 15 89 14 96 13
          C100 13 102 15 101 19

          C99 28 98 38 99 47
          C100 54 103 60 108 65
          C110 67 110 69 107 70

          L102 72
          C104 74 104 76 102 78
          C101 79 99 80 97 80

          C100 81 101 83 100 85
          C99 88 96 89 93 89

          C93 94 91 98 87 100
          C83 102 77 102 71 101

          L63 100
          L63 65

          C70 64 76 62 80 58
          C86 52 89 43 89 32

          L89 20
          C89 18 87 17 85 18

          C79 20 74 21 69 21
          C66 21 64 20 62 18

          L62 57

          C66 56 69 54 71 51
          C74 47 75 42 75 36
          L75 21

          C75 18 74 17 72 16
          Z
        "
      />

      {/* Alt birleşim / gövde */}
      <path
        fill="currentColor"
        d="
          M49 98
          C53 97 56 96 60 94
          C64 96 67 97 71 98
          L68 108
          C66 112 64 114 60 116
          C56 114 54 112 52 108
          Z
        "
      />

      {/* Fotoğraftaki çok hafif göz çizgileri */}
      <path
        d="M18 57 C21 59 24 59 27 58"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M102 57 C99 59 96 59 93 58"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
}