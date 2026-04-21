const ageGate = document.getElementById('ageGate');
const enterSiteBtn = document.getElementById('enterSiteBtn');
const leaveSiteBtn = document.getElementById('leaveSiteBtn');
const ageConfirmed = localStorage.getItem('meijianAgeConfirmed');
if (ageConfirmed === 'true') ageGate.style.display = 'none';
enterSiteBtn?.addEventListener('click', () => {
  localStorage.setItem('meijianAgeConfirmed', 'true');
  ageGate.style.display = 'none';
});
leaveSiteBtn?.addEventListener('click', () => {
  window.location.href = 'https://www.google.com';
});
function submitInquiry(event) {
  event.preventDefault();
  const msg = document.getElementById('formMsg');
  msg.textContent = '查詢已提交，我們會盡快與你聯絡。';
  event.target.reset();
  return false;
}
window.submitInquiry = submitInquiry;

const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => io.observe(el));
