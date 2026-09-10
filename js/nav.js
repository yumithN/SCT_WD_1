/**
 * Interactive Navigation Menu Controller
 * Handles scroll transitions, scroll progress, active link states,
 * mobile drawer toggle, theme switching, and interactive styling controls.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const navbar = document.getElementById('mainNavbar');
  const progressBar = document.getElementById('scrollProgressBar');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileBackdrop = document.getElementById('mobileBackdrop');
  const themeToggle = document.getElementById('themeToggle');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  // State
  let forceStyleState = 'auto'; // 'auto' | 'force-scrolled' | 'force-transparent'
  const SCROLL_THRESHOLD = 40;

  /* ==========================================================================
     1. SCROLL TRANSFORMATION & PROGRESS BAR
     ========================================================================== */
  function handleScroll() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    // Update dynamic progress bar
    if (progressBar) {
      progressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
    }

    // Apply scroll style to navbar (unless manually overridden by demo controls)
    if (forceStyleState === 'auto') {
      if (scrollY > SCROLL_THRESHOLD) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Update real-time status display in the demo card if available
    const liveScrollDisplay = document.getElementById('liveScrollValue');
    const liveStateDisplay = document.getElementById('liveNavState');
    if (liveScrollDisplay) {
      liveScrollDisplay.textContent = `${Math.round(scrollY)}px`;
    }
    if (liveStateDisplay) {
      liveStateDisplay.textContent = navbar.classList.contains('scrolled') ? 'Frosted & Compact' : 'Translucent Top';
    }

    // Update ScrollSpy for in-page anchors
    updateScrollSpy(scrollY);
  }

  // Optimized scroll listener
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial trigger on load
  handleScroll();

  /* ==========================================================================
     2. SCROLLSPY & ACTIVE LINK HIGHLIGHTING
     ========================================================================== */
  function updateScrollSpy(scrollY) {
    if (sections.length === 0) return;

    let currentSectionId = '';
    const offset = 120; // navbar height + breathing room

    sections.forEach(section => {
      const sectionTop = section.offsetTop - offset;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href === `#${currentSectionId}` || href.endsWith(`#${currentSectionId}`))) {
          link.classList.add('active');
        } else if (href && href.startsWith('#')) {
          link.classList.remove('active');
        }
      });
    }
  }

  // Highlight active page on multi-page navigation
  function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      const linkPage = href.split('#')[0].split('/').pop();
      if (linkPage && (linkPage === pageName || (pageName === '' && linkPage === 'index.html'))) {
        link.classList.add('active');
      }
    });
  }
  highlightCurrentPage();

  /* ==========================================================================
     3. MOBILE DRAWER NAVIGATION
     ========================================================================== */
  function toggleMobileMenu(open) {
    const isOpen = open !== undefined ? open : !mobileDrawer.classList.contains('open');
    if (isOpen) {
      mobileDrawer.classList.add('open');
      mobileBackdrop.classList.add('open');
      mobileToggle.classList.add('active');
      mobileToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    } else {
      mobileDrawer.classList.remove('open');
      mobileBackdrop.classList.remove('open');
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => toggleMobileMenu());
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', () => toggleMobileMenu(false));
  }

  // Close mobile drawer when any link is clicked
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
      toggleMobileMenu(false);
    }
  });

  /* ==========================================================================
     4. DARK / LIGHT THEME TOGGLE
     ========================================================================== */
  const savedTheme = localStorage.getItem('sct_theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('sct_theme', newTheme);
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const sunIcon = document.getElementById('themeIconSun');
    const moonIcon = document.getElementById('themeIconMoon');
    if (sunIcon && moonIcon) {
      if (theme === 'light') {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
      } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
      }
    }
  }

  /* ==========================================================================
     5. INTERACTIVE DEMO CONTROLS (Navbar Customizer Playground)
     ========================================================================== */
  window.setNavbarStyleMode = function(mode, btnElement) {
    forceStyleState = mode;
    
    // Update active control pill button
    document.querySelectorAll('.control-pill-btn').forEach(btn => btn.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');

    if (mode === 'force-scrolled') {
      navbar.classList.add('scrolled');
    } else if (mode === 'force-transparent') {
      navbar.classList.remove('scrolled');
    } else {
      handleScroll(); // return to auto dynamic mode
    }

    const liveStateDisplay = document.getElementById('liveNavState');
    if (liveStateDisplay) {
      liveStateDisplay.textContent = navbar.classList.contains('scrolled') ? 'Frosted & Compact' : 'Translucent Top';
    }
  };

  window.setAccentTheme = function(themeName, btnElement) {
    const root = document.documentElement;
    document.querySelectorAll('.accent-btn').forEach(b => b.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');

    if (themeName === 'cyber-cyan') {
      root.style.setProperty('--accent-cyan', '#00f2fe');
      root.style.setProperty('--accent-blue', '#4facfe');
      root.style.setProperty('--accent-gradient', 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)');
      root.style.setProperty('--accent-glow', 'rgba(0, 242, 254, 0.4)');
    } else if (themeName === 'neon-purple') {
      root.style.setProperty('--accent-cyan', '#b02a37');
      root.style.setProperty('--accent-blue', '#a855f7');
      root.style.setProperty('--accent-gradient', 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)');
      root.style.setProperty('--accent-glow', 'rgba(168, 85, 247, 0.4)');
    } else if (themeName === 'sunset-amber') {
      root.style.setProperty('--accent-cyan', '#f59e0b');
      root.style.setProperty('--accent-blue', '#ef4444');
      root.style.setProperty('--accent-gradient', 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)');
      root.style.setProperty('--accent-glow', 'rgba(245, 158, 11, 0.4)');
    }
  };

  // Keyboard accessibility for dropdown
  const dropdownTriggers = document.querySelectorAll('.has-dropdown');
  dropdownTriggers.forEach(item => {
    const link = item.querySelector('.nav-link');
    link.setAttribute('aria-haspopup', 'true');
    link.setAttribute('aria-expanded', 'false');

    item.addEventListener('mouseenter', () => {
      link.setAttribute('aria-expanded', 'true');
    });

    item.addEventListener('mouseleave', () => {
      link.setAttribute('aria-expanded', 'false');
    });
  });
});
