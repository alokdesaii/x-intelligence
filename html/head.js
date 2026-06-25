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

// 2. Dynamic injection of Font Stylesheets and preconnect declarations
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
