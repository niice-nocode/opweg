gsap.registerPlugin(SplitText, ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {

  let headings = document.querySelectorAll('[data-split="heading"]')
  headings.forEach(heading => {
    SplitText.create(heading, {
        type: "lines",
        autoSplit: true,
        mask: "lines",
        onSplit(instance) {
          return gsap.from(instance.lines, {
            duration: 0.8, 
            yPercent: 110,
            stagger: 0.1,
            ease:"expo.out",
          });
        }
    });    
  });
  
});

document.addEventListener("DOMContentLoaded", () => {

  let headings = document.querySelectorAll('[data-split="heading"]')
  headings.forEach(heading => {
    SplitText.create(heading, {
      type: "lines",
      autoSplit: true,
      mask: "lines",
      onSplit(instance) {
        return gsap.from(instance.lines, {
          duration: 0.8, 
          yPercent: 110,
          stagger: 0.1,
          ease:"expo.out",
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            once: true,
          }
        });
      }
    });    
  });
});