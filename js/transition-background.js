// GSAP ScrollTrigger - Section Background & Text Color Change with Attributes
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
  
  // Background color map
  const bgColorMap = {
    'dark': 'var(--background-color--dark)',
    'light': 'var(--background-color--light)',
  };
  
  // Text color map
  const textColorMap = {
    'black': 'var(--text-color--text-primary)',
    'green': 'var(--base-color-brand--green)',
    'light': 'var(--text-color--text-secondary)',
  };
  
  let activeTheme = null;
  let isAnimating = false;

  const sections = document.querySelectorAll('[background-color-theme]');
  const textElements = document.querySelectorAll('[text-color-on-light]');
  
  console.log('Sections found:', sections.length);
  console.log('Text elements found:', textElements.length);
  
  if (sections.length === 0) {
    console.log('No sections with background-color-theme attribute found');
    return;
  }
  
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
    
    if (window.scrollY < sections[0].offsetTop) {
      return sections[0];
    }
    return sections[sections.length - 1];
  }
  
  function checkAndUpdateColors() {
    if (isAnimating) return;
    
    const currentSection = getCurrentSection();
    if (currentSection) {
      const currentTheme = currentSection.getAttribute('background-color-theme');
      const currentColor = bgColorMap[currentTheme];
      
      if (currentColor && activeTheme !== currentTheme) {
        changeColors(currentColor, currentTheme);
      }
    }
  }
  
  // Set initial colors
  checkAndUpdateColors();
  
  sections.forEach((section, index) => {
    const themeValue = section.getAttribute('background-color-theme');
    const bgColor = bgColorMap[themeValue];
    const prevTheme = index > 0 ? sections[index - 1].getAttribute('background-color-theme') : null;
    
    if (bgColor && themeValue !== prevTheme) {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 25%',
        end: 'bottom 25%',
        onEnter: () => changeColors(bgColor, themeValue),
        onEnterBack: () => changeColors(bgColor, themeValue),
      });
    }
  });
  
  function changeColors(bgColor, theme) {
    console.log('changeColors called:', theme, bgColor);
    console.log('activeTheme:', activeTheme);
    
    if (activeTheme === theme) return;
    
    isAnimating = true;
    
    // Animate background
    gsap.to('body', {
      backgroundColor: bgColor,
      duration: 0.3,
      ease: 'power2.out',
    });
    
    // Animate text elements
    textElements.forEach(el => {
      let textColor;
      
      if (theme === 'dark') {
        // Background is dark → tekst wordt altijd light
        textColor = textColorMap['light'];
      } else if (theme === 'light') {
        // Background is light → tekst wordt groen of zwart op basis van attribute
        const colorKey = el.getAttribute('text-color-on-light');
        textColor = textColorMap[colorKey];
      }
      
      console.log('Text element:', el, 'Color:', textColor);
      
      if (textColor) {
        gsap.to(el, {
          color: textColor,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    });
    
    gsap.delayedCall(0.3, () => {
      activeTheme = theme;
      isAnimating = false;
    });
  }
  
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
  
  let lastScrollY = window.scrollY;
  const debouncedCheck = debounce(checkAndUpdateColors, 100);
  
  window.addEventListener('scroll', function() {
    const currentScrollY = window.scrollY;
    const scrollDiff = Math.abs(currentScrollY - lastScrollY);
    
    if (scrollDiff > window.innerHeight) {
      ScrollTrigger.refresh();
      setTimeout(checkAndUpdateColors, 50);
    }
    
    lastScrollY = currentScrollY;
    debouncedCheck();
  });
  
  ScrollTrigger.addEventListener('scrollEnd', checkAndUpdateColors);
});