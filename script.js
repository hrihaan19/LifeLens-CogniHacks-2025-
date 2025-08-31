// Tab navigation
const navItems = document.querySelectorAll('.nav-item');
const tabContents = document.querySelectorAll('.tab-content');

function showTab(tab) {
  tabContents.forEach(tc => tc.classList.remove('active'));
  navItems.forEach(item => item.classList.remove('active'));
  const tabElement = document.getElementById(tab);
  if (tabElement) {
    tabElement.classList.add('active');
  }
  navItems.forEach(item => {
    if (item.dataset.tab === tab) item.classList.add('active');
  });
}

navItems.forEach(item => {
  item.addEventListener('click', () => showTab(item.dataset.tab));
});

// Form submission
const form = document.getElementById('lifelens-form');
const resultBox = document.getElementById('result');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    resultBox.style.display = 'block';
    resultBox.textContent = 'Generating your future...';
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    try {
      const res = await fetch('http://127.0.0.1:8000/api/lifelens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      resultBox.textContent = json.result;
    } catch (err) {
      resultBox.textContent = 'Error: Could not connect to backend.';
    }
  });
}



// Chatbot logic for new layout
document.addEventListener('DOMContentLoaded', function () {
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');

  if (chatForm && chatInput && chatMessages) {
    async function sendChatMessage(message) {
      // Display user message
      const userMsgDiv = document.createElement('div');
      userMsgDiv.className = 'chat-message user';
      userMsgDiv.innerHTML = `<div class="bubble">${message}</div>`;
      chatMessages.appendChild(userMsgDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Show loading for AI
      const aiMsgDiv = document.createElement('div');
      aiMsgDiv.className = 'chat-message ai';
      aiMsgDiv.innerHTML = '<div class="bubble">Thinking...</div>';
      chatMessages.appendChild(aiMsgDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      try {
        // Call backend (reuse counselor endpoint for now)
        const res = await fetch('http://127.0.0.1:8000/api/lifelens', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            grade: '',
            interests: '',
            subjects: '',
            career_ideas: '',
            hobbies: '',
            habits: message,
            future_years: 5,
            alternate_goal: ''
          })
        });
        const json = await res.json();
        aiMsgDiv.innerHTML = `<div class="bubble">${json.result}</div>`;
      } catch (err) {
        aiMsgDiv.innerHTML = '<div class="bubble">Error: Could not connect to backend.</div>';
      }
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const message = chatInput.value.trim();
      if (message) {
        sendChatMessage(message);
        chatInput.value = '';
      }
    });
  }
});

// Default tab
showTab('home');
