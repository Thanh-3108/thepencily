const fs = require('fs');
const path = require('path');

const brandDir = path.join(process.cwd(), 'public', 'brand');
const iconsDir = path.join(brandDir, 'icons');
if (!fs.existsSync(brandDir)) fs.mkdirSync(brandDir, { recursive: true });
if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir, { recursive: true });

// 1. PENCIL MASCOT SVG
const pencilSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140" fill="none">
  <g stroke="#FFC83D" stroke-width="4.5" stroke-linecap="round">
    <path d="M102 38 C108 42, 110 48, 107 55" />
    <path d="M112 46 C117 50, 118 56, 115 62" stroke-width="3.5" />
  </g>
  <g>
    <path
      d="M48 94 L88 32 C91 27 97 26 102 30 L110 36 C114 40 114 46 110 51 L70 113 L36 116 Z"
      fill="#FFC83D"
      stroke="#0F2747"
      stroke-width="7"
      stroke-linejoin="round"
      stroke-linecap="round"
    />
    <path
      d="M68 37 L94 32 L66 106 L48 108 Z"
      fill="#FFF9EF"
      stroke="#0F2747"
      stroke-width="4.5"
      stroke-linejoin="round"
    />
    <path
      d="M48 94 L36 116 L70 113 Z"
      fill="#FFF9EF"
      stroke="#0F2747"
      stroke-width="6"
      stroke-linejoin="round"
    />
    <polygon points="36,116 48,103 44,97 36,116" fill="#0F2747" />
    <line x1="88" y1="32" x2="70" y2="113" stroke="#0F2747" stroke-width="4" stroke-linecap="round" />
  </g>
</svg>`;

// 2. APP ICON SVG
const appIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" fill="none">
  <rect width="160" height="160" rx="42" fill="#0F2747" />
  <circle cx="80" cy="80" r="70" fill="#1A3E6D" opacity="0.25" />
  <g transform="translate(10, 10)">
    <g stroke="#FFC83D" stroke-width="5" stroke-linecap="round">
      <path d="M102 38 C108 42, 110 48, 107 55" />
      <path d="M112 46 C117 50, 118 56, 115 62" stroke-width="4" />
    </g>
    <path
      d="M48 94 L88 32 C91 27 97 26 102 30 L110 36 C114 40 114 46 110 51 L70 113 L36 116 Z"
      fill="#FFC83D"
      stroke="#FFFFFF"
      stroke-width="7"
      stroke-linejoin="round"
      stroke-linecap="round"
    />
    <path
      d="M68 37 L94 32 L66 106 L48 108 Z"
      fill="#FFF9EF"
      stroke="#0F2747"
      stroke-width="4.5"
      stroke-linejoin="round"
    />
    <path
      d="M48 94 L36 116 L70 113 Z"
      fill="#FFF9EF"
      stroke="#FFFFFF"
      stroke-width="6"
      stroke-linejoin="round"
    />
    <polygon points="36,116 48,103 44,97 36,116" fill="#FFFFFF" />
  </g>
</svg>`;

// 3. FULL PRIMARY LOGO
const logoFullSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 220" fill="none">
  <g transform="translate(15, 10) scale(1.15)">
    <g stroke="#FFC83D" stroke-width="4.5" stroke-linecap="round">
      <path d="M102 38 C108 42, 110 48, 107 55" />
      <path d="M112 46 C117 50, 118 56, 115 62" stroke-width="3.5" />
    </g>
    <path
      d="M48 94 L88 32 C91 27 97 26 102 30 L110 36 C114 40 114 46 110 51 L70 113 L36 116 Z"
      fill="#FFC83D"
      stroke="#0F2747"
      stroke-width="7"
      stroke-linejoin="round"
      stroke-linecap="round"
    />
    <path
      d="M68 37 L94 32 L66 106 L48 108 Z"
      fill="#FFF9EF"
      stroke="#0F2747"
      stroke-width="4.5"
      stroke-linejoin="round"
    />
    <path
      d="M48 94 L36 116 L70 113 Z"
      fill="#FFF9EF"
      stroke="#0F2747"
      stroke-width="6"
      stroke-linejoin="round"
    />
    <polygon points="36,116 48,103 44,97 36,116" fill="#0F2747" />
  </g>
  <text x="180" y="68" font-family="Poppins, sans-serif" font-weight="800" font-size="44" fill="#0F2747" letter-spacing="-0.02em">The</text>
  <text x="176" y="132" font-family="Poppins, sans-serif" font-weight="900" font-size="74" fill="#0F2747" letter-spacing="-0.03em">Pencily</text>
  <g stroke="#FFC83D" stroke-width="4.5" stroke-linecap="round">
    <line x1="472" y1="62" x2="478" y2="52" />
    <line x1="486" y1="68" x2="496" y2="62" />
    <line x1="488" y1="80" x2="498" y2="82" />
  </g>
  <path
    d="M46 146 C110 168, 260 166, 492 142"
    stroke="#0F2747"
    stroke-width="6.5"
    stroke-linecap="round"
  />
  <text x="270" y="196" font-family="Inter, Poppins, sans-serif" font-weight="700" font-size="16" fill="#0F2747" letter-spacing="0.32em" text-anchor="middle">LEARN  •  SHARE  •  GROW</text>
</svg>`;

// 4. NAV / COMPACT LOGO
const logoNavSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 150" fill="none">
  <g transform="translate(5, 5) scale(0.95)">
    <g stroke="#FFC83D" stroke-width="4.5" stroke-linecap="round">
      <path d="M102 38 C108 42, 110 48, 107 55" />
      <path d="M112 46 C117 50, 118 56, 115 62" stroke-width="3.5" />
    </g>
    <path
      d="M48 94 L88 32 C91 27 97 26 102 30 L110 36 C114 40 114 46 110 51 L70 113 L36 116 Z"
      fill="#FFC83D"
      stroke="#0F2747"
      stroke-width="7"
      stroke-linejoin="round"
      stroke-linecap="round"
    />
    <path
      d="M68 37 L94 32 L66 106 L48 108 Z"
      fill="#FFF9EF"
      stroke="#0F2747"
      stroke-width="4.5"
      stroke-linejoin="round"
    />
    <path
      d="M48 94 L36 116 L70 113 Z"
      fill="#FFF9EF"
      stroke="#0F2747"
      stroke-width="6"
      stroke-linejoin="round"
    />
    <polygon points="36,116 48,103 44,97 36,116" fill="#0F2747" />
  </g>
  <text x="145" y="54" font-family="Poppins, sans-serif" font-weight="800" font-size="36" fill="#0F2747" letter-spacing="-0.02em">The</text>
  <text x="142" y="108" font-family="Poppins, sans-serif" font-weight="900" font-size="62" fill="#0F2747" letter-spacing="-0.03em">Pencily</text>
  <g stroke="#FFC83D" stroke-width="4" stroke-linecap="round">
    <line x1="395" y1="48" x2="401" y2="38" />
    <line x1="407" y1="54" x2="417" y2="48" />
    <line x1="409" y1="66" x2="419" y2="68" />
  </g>
  <path
    d="M32 120 C90 138, 220 138, 420 116"
    stroke="#0F2747"
    stroke-width="5.5"
    stroke-linecap="round"
  />
</svg>`;

// 5. WHITE / DARK BACKGROUND LOGO
const logoWhiteSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 150" fill="none">
  <g transform="translate(5, 5) scale(0.95)">
    <g stroke="#FFC83D" stroke-width="4.5" stroke-linecap="round">
      <path d="M102 38 C108 42, 110 48, 107 55" />
      <path d="M112 46 C117 50, 118 56, 115 62" stroke-width="3.5" />
    </g>
    <path
      d="M48 94 L88 32 C91 27 97 26 102 30 L110 36 C114 40 114 46 110 51 L70 113 L36 116 Z"
      fill="#FFC83D"
      stroke="#FFFFFF"
      stroke-width="7"
      stroke-linejoin="round"
      stroke-linecap="round"
    />
    <path
      d="M68 37 L94 32 L66 106 L48 108 Z"
      fill="#FFF9EF"
      stroke="#0F2747"
      stroke-width="4.5"
      stroke-linejoin="round"
    />
    <path
      d="M48 94 L36 116 L70 113 Z"
      fill="#FFF9EF"
      stroke="#FFFFFF"
      stroke-width="6"
      stroke-linejoin="round"
    />
    <polygon points="36,116 48,103 44,97 36,116" fill="#FFFFFF" />
  </g>
  <text x="145" y="54" font-family="Poppins, sans-serif" font-weight="800" font-size="36" fill="#FFFFFF" letter-spacing="-0.02em">The</text>
  <text x="142" y="108" font-family="Poppins, sans-serif" font-weight="900" font-size="62" fill="#FFFFFF" letter-spacing="-0.03em">Pencily</text>
  <g stroke="#FFC83D" stroke-width="4" stroke-linecap="round">
    <line x1="395" y1="48" x2="401" y2="38" />
    <line x1="407" y1="54" x2="417" y2="48" />
    <line x1="409" y1="66" x2="419" y2="68" />
  </g>
  <path
    d="M32 120 C90 138, 220 138, 420 116"
    stroke="#FFC83D"
    stroke-width="5.5"
    stroke-linecap="round"
  />
</svg>`;

// 6. BRAND PILLAR ICONS (SVG)
const icons = {
  learn: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <path d="M32 12 L56 24 L32 36 L8 24 Z" stroke="#0F2747" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round" fill="#FFC83D" />
  <path d="M16 29 V43 C16 43, 22 51, 32 51 C42 51, 48 43, 48 43 V29" stroke="#0F2747" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M52 26 V44 C52 47, 54 49, 56 49" stroke="#0F2747" stroke-width="4" stroke-linecap="round" />
  <circle cx="56" cy="49" r="2.5" fill="#FFC83D" stroke="#0F2747" stroke-width="2" />
</svg>`,

  share: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <circle cx="32" cy="22" r="7" stroke="#0F2747" stroke-width="4" fill="#FFC83D" />
  <path d="M20 48 C20 40, 24 36, 32 36 C40 36, 44 40, 44 48" stroke="#0F2747" stroke-width="4" stroke-linecap="round" />
  <circle cx="16" cy="26" r="5" stroke="#0F2747" stroke-width="3.5" fill="#FFF9EF" />
  <path d="M8 50 C8 44, 11 41, 17 41" stroke="#0F2747" stroke-width="3.5" stroke-linecap="round" />
  <circle cx="48" cy="26" r="5" stroke="#0F2747" stroke-width="3.5" fill="#FFF9EF" />
  <path d="M47 41 C53 41, 56 44, 56 50" stroke="#0F2747" stroke-width="3.5" stroke-linecap="round" />
</svg>`,

  teach: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <path
    d="M22 34 C18 30, 16 25, 16 20 C16 11, 23 4, 32 4 C41 4, 48 11, 48 20 C48 25, 46 30, 42 34 L40 42 H24 L22 34 Z"
    stroke="#0F2747"
    stroke-width="4.5"
    stroke-linejoin="round"
    stroke-linecap="round"
    fill="#FFC83D"
  />
  <path d="M28 22 C28 17, 36 17, 36 22" stroke="#0F2747" stroke-width="3.5" stroke-linecap="round" />
  <path d="M26 48 H38" stroke="#0F2747" stroke-width="4" stroke-linecap="round" />
  <path d="M28 54 H36" stroke="#0F2747" stroke-width="4" stroke-linecap="round" />
  <line x1="32" y1="0" x2="32" y2="2" stroke="#FFC83D" stroke-width="4" stroke-linecap="round" />
  <line x1="8" y1="12" x2="11" y2="14" stroke="#FFC83D" stroke-width="3.5" stroke-linecap="round" />
  <line x1="56" y1="12" x2="53" y2="14" stroke="#FFC83D" stroke-width="3.5" stroke-linecap="round" />
</svg>`,

  collaborate: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <path d="M6 32 L18 20 L28 28 L24 38 L14 42 Z" stroke="#0F2747" stroke-width="4" stroke-linejoin="round" fill="#FFC83D" />
  <path d="M58 32 L46 20 L36 28 L40 38 L50 42 Z" stroke="#0F2747" stroke-width="4" stroke-linejoin="round" fill="#FFF9EF" />
  <path d="M28 28 L36 34 L30 42 L24 38 Z" stroke="#0F2747" stroke-width="4" stroke-linejoin="round" fill="#FFC83D" />
  <path d="M36 28 L28 34 L34 42 L40 38 Z" stroke="#0F2747" stroke-width="4" stroke-linejoin="round" fill="#FFF9EF" />
  <path d="M6 24 L14 16" stroke="#0F2747" stroke-width="4" stroke-linecap="round" />
  <path d="M58 24 L50 16" stroke="#0F2747" stroke-width="4" stroke-linecap="round" />
</svg>`,

  grow: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <path d="M12 52 C20 48, 44 48, 52 52" stroke="#0F2747" stroke-width="4.5" stroke-linecap="round" />
  <path d="M32 50 V24" stroke="#0F2747" stroke-width="4.5" stroke-linecap="round" />
  <path
    d="M32 32 C22 32, 16 22, 20 14 C28 14, 32 24, 32 32 Z"
    stroke="#0F2747"
    stroke-width="4"
    stroke-linejoin="round"
    fill="#22C55E"
  />
  <path
    d="M32 26 C42 26, 48 16, 44 8 C36 8, 32 18, 32 26 Z"
    stroke="#0F2747"
    stroke-width="4"
    stroke-linejoin="round"
    fill="#FFC83D"
  />
</svg>`
};

fs.writeFileSync(path.join(brandDir, 'pencil-mascot.svg'), pencilSvg);
fs.writeFileSync(path.join(brandDir, 'logo-icon.svg'), appIconSvg);
fs.writeFileSync(path.join(brandDir, 'logo-full.svg'), logoFullSvg);
fs.writeFileSync(path.join(brandDir, 'logo-nav.svg'), logoNavSvg);
fs.writeFileSync(path.join(brandDir, 'logo-white.svg'), logoWhiteSvg);
fs.writeFileSync(path.join(process.cwd(), 'public', 'favicon.svg'), appIconSvg);

for (const [key, svg] of Object.entries(icons)) {
  fs.writeFileSync(path.join(iconsDir, `brand-${key}.svg`), svg);
}

console.log('Successfully generated all The Pencily brand SVGs matching brand guidelines!');
