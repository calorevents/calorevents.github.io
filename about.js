// Team members data
const teamMembers = [
  {
    name: "Lennart",
    image: "pics/test 5 ctx.png",
    bio: "Lennart is DJ en oprichter Calor. Thuishaven negeerde zijn mag ik draaien?-mails toen hij zestien was en zo is hij uit koppigheid en ook wel passie voor muziek een feest gaan organiseren. Nu Calor. Zijn DJ-naam is Coûteux (Frans). Dit zou 'kostbaar' betekenen, wat draaiën voor hem is, en dit was dan mooi. Echter bleek het toch meer 'd uur' te betekenen. Dat was ook goed, want dure spullen zijn ook mooi. Zijn tante heeft er een paar jaar gewoond, maar niet per se verdere verbindingen met Frankrijk."
  },
  {
    name: "Edgar",
    image: "pics/test 4 ed.png",
    bio: "Edgar is een knotsgekke jongen. Niemand weet het, maar hij is letterlijk de allerbeste. Dit komt omdat hij vanaf jonge leeftijd naar Britney Spears keek op MTV, en daardoor begrijpt hij muziek als geen ander."
  },
  {
    name: "Stan",
    image: "pics/test 8 stan.png",
    bio: "Stan kan heel goed schrijven. Ze noemen hem vaak Large Language Stan. Het schijnt dat Stan alle ChatGPT antwoorden genereert. Hij is dus niet werkloos zoals iedereen de hele tijd denkt. Hij kan ook goed coderen en goed in wiskunde."
  },
  {
    name: "Pieter",
    image: "pics/test 10 pieter.png",
    bio: "Pieter is een bekend lid van het team. Hij staat bekend om zijn creatieve aanpak van problemen en onvermoeibare werkethiek. Als hij niet aan het werken is voor Calor Events, kun je hem vinden terwijl hij aan zijn eigen muziekprojecten werkt."
  },
  {
    name: "Cas",
    image: "pics/test 7 cas.png",
    bio: "Cas is een essentieel lid van ons team. Met een achtergrond in evenementenbeheer en een passie voor muziek, brengt hij een unieke mix van vaardigheden naar Calor Events. Zijn aandacht voor detail en vermogen om onder druk te werken maken hem onmisbaar."
  }
];

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const teamMembersContainer = document.querySelector('.team-members');
  const modal = document.getElementById('memberModal');
  const modalName = document.getElementById('modalName');
  const modalBio = document.getElementById('modalBio');
  const closeBtn = document.querySelector('.close-btn');

  if (!teamMembersContainer || !modal) return;

  // Generate member cards
  function renderTeamMembers() {
    teamMembersContainer.innerHTML = '';
    
    teamMembers.forEach(member => {
      const memberCard = document.createElement('div');
      memberCard.className = 'member-card';
      memberCard.innerHTML = `
        <img src="${member.image}" alt="${member.name}" class="member-image">
        <div class="member-name">${member.name}</div>
      `;
      
      memberCard.addEventListener('click', () => {
        openModal(member);
      });
      
      teamMembersContainer.appendChild(memberCard);
    });
  }

  // Open modal with member info
  function openModal(member) {
    modalName.textContent = member.name;
    modalBio.textContent = member.bio;
    
    // First set display to block so the element is in the DOM
    modal.style.display = 'block';
    
    // Small delay to ensure display change takes effect before adding the active class
    setTimeout(() => {
      modal.classList.add('active');
    }, 10);
    
    document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
  }

  // Close modal
  function closeModal() {
    modal.classList.remove('active');
    
    // Wait for animation to complete before hiding
    setTimeout(() => {
      if (!modal.classList.contains('active')) {
        modal.style.display = 'none';
      }
    }, 300);
    
    document.body.style.overflow = ''; // Restore scrolling
  }

  // Event listeners
  closeBtn.addEventListener('click', closeModal);
  
  // Close modal when clicking outside of it
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Close modal with Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Initialize
  renderTeamMembers();

  // Make modal display: none by default (for animation purposes)
  modal.style.display = 'none';
});
