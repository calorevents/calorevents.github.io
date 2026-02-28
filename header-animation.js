// List of image paths
const imagePaths = [
    "pics/test 1.png",
    "pics/test 2.png",
    "pics/test 3.png",
    "pics/test 4 ctx.png",
    "pics/test 5 ctx.png",
    "pics/test 6 ctx.png",
    "pics/test 6 cas.png",
    "pics/test 7 cas.png",
    "pics/test 8 stan.png",
    "pics/test stan 8.png",
    "pics/test 9 stan.png",
    "pics/test 10 pieter.png",
    "pics/test 11 pieter.png", 
    "pics/test 12 pieter.png",
    "pics/test 13 pieter.png",
    "pics/test 17 cas.png",
  ];
  
  // Initialize header animation
  function initHeaderAnimation() {
    // Global toggleChaos
    window.toggleChaos = function() {
      document.body.classList.toggle('chaos-mode');
      
      const promoVideo = document.getElementById('promoVideo');
      if (document.body.classList.contains('chaos-mode')) {
        if (promoVideo) promoVideo.playbackRate = 2.0;
        console.log("CHAOS INITIATED!");
      } else {
        if (promoVideo) promoVideo.playbackRate = 1.0;
      }
    };
    
    const container = document.getElementById('imageContainer');
    if (!container) return;
    
    // Use fixed height for the header to avoid measurement bugs in Safari
    const headerHeight = 60;
    
    // Create a new floating image
    function createRandomImage() {
      const randomIndex = Math.floor(Math.random() * imagePaths.length);
      const imagePath = imagePaths[randomIndex];
      
      const img = document.createElement('img');
      img.src = imagePath;
      img.alt = "Decorative background";
      img.classList.add('floating-image');
      
      // Ensure faces are always within the 60px header height
      img.style.left = "-60px";
      img.style.top = Math.floor(Math.random() * (headerHeight - 40)) + "px";
      
      container.appendChild(img);
      
      // Animate the image
      let duration = 6000 + Math.random() * 2000; 
      if (document.body.classList.contains('chaos-mode')) {
        duration = 1000 + Math.random() * 500; 
      }
      
      const start = performance.now();
      const startLeft = -60;
      const endLeft = window.innerWidth + 60; 
      
      function animate(timestamp) {
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);
        
        const newLeft = startLeft + (endLeft - startLeft) * progress;
        img.style.left = newLeft + "px";
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          img.remove();
        }
      }
      
      requestAnimationFrame(animate);
    }
    
    // Start animation
    function startImageAnimation() {
      // Initial faces
      for (let i = 0; i < 2; i++) {
        setTimeout(() => createRandomImage(), i * 1500);
      }
      
      // Create new face every ~1.2s
      setInterval(() => {
        createRandomImage();
      }, 1200 + Math.random() * 500);
    }
    
    startImageAnimation();
  }
  
  document.addEventListener('DOMContentLoaded', initHeaderAnimation);
