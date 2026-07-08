// Countdown logic
function updateCountdown() {
  const targetDate = new Date("July 18, 2026 23:59:00").getTime();
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

// Reference the poster image
const poster = document.getElementById('ticketPoster');

function wigglePoster() {
  if (!poster) return;
  poster.classList.add('wiggle');
  setTimeout(() => {
    poster.classList.remove('wiggle');
  }, 1000);
}

let currentBg = 0;
const bgClasses = ['', 'bg-dutch', 'bg-orange', 'bg-lightblue'];
function cycleBackground() {
  const body = document.body;
  body.classList.remove(...bgClasses.filter(c => c));
  currentBg = (currentBg + 1) % bgClasses.length;
  if (bgClasses[currentBg]) {
    body.classList.add(bgClasses[currentBg]);
  }
}

// Trigger the wiggle every 10 seconds
setInterval(wigglePoster, 10000);

// Start on load
window.addEventListener('load', () => {
  wigglePoster();
});
