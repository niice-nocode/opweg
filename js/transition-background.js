// GSAP ScrollTrigger - Section Background Color Change with Attributes
gsap.registerPlugin(ScrollTrigger);

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  
  // Map attribute values to CSS variables
  const colorMap = {
    'dark': 'var(--background-color--dark)',
    'light': 'var(--background-color--light)',
  };
  
  let activeTheme = null;
  let isAnimating = false;

  // Find all elements with the background-color-theme attribute
  const sections = document.querySelectorAll('[background-color-theme]');
  
  if (sections.length === 0) return;
  
  // Function to get the section currently in viewport center
  function getCurrentSection() {
    const viewportCenter = window.scrollY + (window.innerHeight / 2);
    
    for (let section of sections) {
      const rect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const sectionBottom = sectionTop + rect.height;
      
      if (viewportCenter >= sectionTop && viewportCenter <= sectionBottom) {
        return section;
      }
    }
    
    // Fallback to first section if at top, last if at bottom
    if (window.scrollY < sections[0].offsetTop) {
      return sections[0];
    }
    return sections[sections.length - 1];
  }
  
  // Function to check and update background based on current position
  function checkAndUpdateBackground() {
    if (isAnimating) return;
    
    const currentSection = getCurrentSection();
    if (currentSection) {
      const currentTheme = currentSection.getAttribute('background-color-theme');
      const currentColor = colorMap[currentTheme];
      
      if (currentColor && activeTheme !== currentTheme) {
        changeBackground(currentColor, currentTheme);
      }
    }
  }
  
  // Set initial background color
  checkAndUpdateBackground();
  
  // Apply ScrollTrigger to sections where theme changes
  sections.forEach((section, index) => {
    const themeValue = section.getAttribute('background-color-theme');
    const bgColor = colorMap[themeValue];
    const prevTheme = index > 0 ? sections[index - 1].getAttribute('background-color-theme') : null;
    
    if (bgColor && themeValue !== prevTheme) {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 25%',
        end: 'bottom 25%',
        onEnter: () => changeBackground(bgColor, themeValue),
        onEnterBack: () => changeBackground(bgColor, themeValue),
        // markers: true
      });
    }
  });
  
  // Function to change background with GSAP animation
  function changeBackground(color, theme) {
    if (activeTheme !== theme) {
      isAnimating = true;
      gsap.to('body', {
        backgroundColor: color,
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => {
          activeTheme = theme;
          isAnimating = false;
        }
      });
    }
  }
  
  // Debounce helper
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  // Listen to scroll events for instant scrolls (like "back to top" buttons)
  let lastScrollY = window.scrollY;
  const debouncedCheck = debounce(checkAndUpdateBackground, 100);
  
  window.addEventListener('scroll', function() {
    const currentScrollY = window.scrollY;
    const scrollDiff = Math.abs(currentScrollY - lastScrollY);
    
    // If scroll difference is large (instant scroll), check immediately
    if (scrollDiff > window.innerHeight) {
      ScrollTrigger.refresh();
      setTimeout(checkAndUpdateBackground, 50);
    }
    
    lastScrollY = currentScrollY;
    debouncedCheck();
  });
  
  // Also check on scroll end
  ScrollTrigger.addEventListener('scrollEnd', checkAndUpdateBackground);
});