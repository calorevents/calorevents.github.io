// Countdown logic
function updateCountdown() {
  const targetDate = new Date("March 20, 2026 00:00:00").getTime();
  const now = new Date().getTime();
  const gap = targetDate - now;

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const d = Math.floor(gap / day);
  const h = Math.floor((gap % day) / hour);
  const m = Math.floor((gap % hour) / minute);

  const countdownElement = document.getElementById("countdown");
  if (countdownElement) {
    countdownElement.innerText = 
      `${d.toString().padStart(2, '0')} DAYS : ${h.toString().padStart(2, '0')} HOURS : ${m.toString().padStart(2, '0')} MINUTES`;
  }
}

setInterval(updateCountdown, 1000);

// Popup Logic
window.addEventListener('load', () => {
  const signupModal = document.getElementById("signupModal");
  const closeSignup = document.getElementById("closeSignup");
  
  if (signupModal) {
    setTimeout(() => {
      signupModal.style.display = "block";
      signupModal.classList.add("active");
    }, 2000); // Show after 2 seconds
  }

  if (closeSignup) {
    closeSignup.onclick = () => {
      signupModal.style.display = "none";
      signupModal.classList.remove("active");
    };
  }

  // AJAX Submission for Formspree
  const signupForm = document.getElementById("signupForm");
  const signupStatus = document.getElementById("signupStatus");

  if (signupForm) {
    signupForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const data = new FormData(event.target);
      
      signupStatus.innerText = "SENDING...";
      
      fetch(event.target.action, {
        method: signupForm.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(response => {
        if (response.ok) {
          signupStatus.innerText = "THANKS! YOU'RE SUBSCRIBED.";
          signupForm.reset();
          setTimeout(() => {
            signupModal.style.display = "none";
          }, 2000);
        } else {
          signupStatus.innerText = "OOPS! SOMETHING WENT WRONG.";
        }
      }).catch(error => {
        signupStatus.innerText = "OOPS! SOMETHING WENT WRONG.";
      });
    });
  }
});

// Reference the poster image and promo video
const poster = document.getElementById('ticketPoster');
const promoVideo = document.getElementById('promoVideo');

function wigglePoster() {
  if (!poster) return;
  poster.classList.add('wiggle');
  setTimeout(() => {
    poster.classList.remove('wiggle');
  }, 1000);
}

// Browser Autoplay workaround: 
// Most browsers block autoplay with sound. We'll try to play it unmuted 
// as soon as the user interacts with the page (click).
function startVideoOnInteraction() {
  if (promoVideo) {
    promoVideo.play().catch(error => {
      console.log("Autoplay with sound blocked. Waiting for interaction.");
      // If blocked, we try again on the first document click
      document.addEventListener('click', () => {
        promoVideo.play();
      }, { once: true });
    });
  }
}

// Trigger the wiggle every 10 seconds
setInterval(wigglePoster, 10000);

// Start on load
window.addEventListener('load', () => {
  wigglePoster();
  startVideoOnInteraction();
});
