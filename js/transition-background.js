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
  
  // Set initial background color from first section
  const firstSection = sections[0];
  if (firstSection) {
    const firstTheme = firstSection.getAttribute('background-color-theme');
    const firstColor = colorMap[firstTheme];
    if (firstColor) {
      gsap.set('body', { backgroundColor: firstColor });
      activeTheme = firstTheme;
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
        start: 'top 50%',
        end: 'bottom 50%',
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