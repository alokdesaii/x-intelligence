/**
 * X-Intelligence Common Head Script
 * Centralizes Tailwind configuration, Google Fonts preloads, and dependency loading.
 */

// 1. Tailwind Custom Theme Configuration
if (window.tailwind) {
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          navy: '#001741',
          'navy-dark': '#000b21',
          teal: '#00dc8d',
          'teal-hover': '#00c47e',
          'teal-light': '#ebfbf5',
        },
        fontFamily: {
          sans: ['Plus Jakarta Sans', 'sans-serif'],
          mono: ['JetBrains Mono', 'monospace'],
        },
        borderRadius: {
          DEFAULT: '0px',
          'xs': '0px',
          'sm': '0px',
          'md': '0px',
          'lg': '0px',
          'xl': '0px',
          '2xl': '0px',
          '3xl': '0px',
        }
      }
    }
  };
}

// 2. File-format icons (Remix Icon artwork, inlined)
// Lucide has no PDF icon — these two share one file outline and differ only in
// the inner glyph, so PDF and Excel exports read as a matched pair.
window.FORMAT_ICONS = {
  pdf: '<svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4" aria-hidden="true"><path d="M12 16H8V8H12C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16ZM10 10V14H12C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10H10ZM15 4H5V20H19V8H15V4ZM3 2.9918C3 2.44405 3.44749 2 3.9985 2H16L20.9997 7L21 20.9925C21 21.5489 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918Z"/></svg>',
  xlsx: '<svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4" aria-hidden="true"><path d="M13.2 12L16 16H13.6L12 13.7143L10.4 16H8L10.8 12L8 8H10.4L12 10.2857L13.6 8H15V4H5V20H19V8H16L13.2 12ZM3 2.9918C3 2.44405 3.44749 2 3.9985 2H16L20.9997 7L21 20.9925C21 21.5489 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918Z"/></svg>'
};

// 3. Dynamic injection of Font Stylesheets and preconnect declarations
(() => {
  const head = document.head;

  const preconnect1 = document.createElement('link');
  preconnect1.rel = 'preconnect';
  preconnect1.href = 'https://fonts.googleapis.com';
  head.appendChild(preconnect1);

  const preconnect2 = document.createElement('link');
  preconnect2.rel = 'preconnect';
  preconnect2.href = 'https://fonts.gstatic.com';
  preconnect2.crossOrigin = 'anonymous';
  head.appendChild(preconnect2);

  const fontsLink = document.createElement('link');
  fontsLink.rel = 'stylesheet';
  fontsLink.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap';
  head.appendChild(fontsLink);

  const lucideScript = document.createElement('script');
  lucideScript.src = 'https://unpkg.com/lucide@latest';
  lucideScript.onload = () => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  };
  head.appendChild(lucideScript);
})();
