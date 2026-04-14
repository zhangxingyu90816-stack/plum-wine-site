const ageGate = document.getElementById('ageGate');
const enterSite = document.getElementById('enterSite');
const leaveSite = document.getElementById('leaveSite');

if (sessionStorage.getItem('isAdult') === 'true') {
  ageGate.classList.add('hidden');
}

enterSite?.addEventListener('click', () => {
  sessionStorage.setItem('isAdult', 'true');
  ageGate.classList.add('hidden');
});

leaveSite?.addEventListener('click', () => {
  window.location.href = 'https://www.google.com';
});

function submitInquiry(event) {
  event.preventDefault();
  const formMsg = document.getElementById('formMsg');
  formMsg.textContent = '已收到查詢示範。請把表單改成你的 Email、WhatsApp 或後台表單服務。';
  event.target.reset();
  return false;
}

window.submitInquiry = submitInquiry;
