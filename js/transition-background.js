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
    
    // Fallback to first section if none found
    return sections[0];
  }
  
  // Set initial background color based on current viewport position
  const currentSection = getCurrentSection();
  if (currentSection) {
    const currentTheme = currentSection.getAttribute('background-color-theme');
    const currentColor = colorMap[currentTheme];
    if (currentColor) {
      gsap.set('body', { backgroundColor: currentColor });
      activeTheme = currentTheme;
    }
  }
  
  // Apply ScrollTrigger only to sections where theme changes
  sections.forEach((section, index) => {
    const themeValue = section.getAttribute('background-color-theme');
    const bgColor = colorMap[themeValue];
    
    // Get previous section's theme
    const prevTheme = index > 0 ? sections[index - 1].getAttribute('background-color-theme') : null;
    
    // Only create ScrollTrigger if theme is different from previous section
    if (bgColor && themeValue !== prevTheme) {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 32px',
        end: 'bottom 32px',
        onEnter: () => changeBackground(bgColor, themeValue),
        onEnterBack: () => changeBackground(bgColor, themeValue),
        // markers: true // Uncomment to see trigger points (debug mode)
      });
    }
  });
  
  // Function to change background with GSAP animation
  function changeBackground(color, theme) {
    if (activeTheme !== theme) {
      gsap.to('body', {
        backgroundColor: color,
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => {
          activeTheme = theme;
        }
      });
    }
  }
});