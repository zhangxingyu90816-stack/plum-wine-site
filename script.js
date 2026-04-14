const cart = [];
const ageGate = document.getElementById('ageGate');
const enterSite = document.getElementById('enterSite');
const leaveSite = document.getElementById('leaveSite');
const cartBtn = document.getElementById('cartBtn');
const closeCart = document.getElementById('closeCart');
const cartDrawer = document.getElementById('cartDrawer');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const checkoutLink = document.getElementById('checkoutLink');

if (localStorage.getItem('plumAgeVerified') === 'yes') {
  ageGate.classList.add('hidden');
}

enterSite?.addEventListener('click', () => {
  localStorage.setItem('plumAgeVerified', 'yes');
  ageGate.classList.add('hidden');
});

leaveSite?.addEventListener('click', () => {
  window.location.href = 'https://www.google.com';
});

cartBtn?.addEventListener('click', () => cartDrawer.classList.add('open'));
closeCart?.addEventListener('click', () => cartDrawer.classList.remove('open'));

document.querySelectorAll('.add-to-cart').forEach((btn) => {
  btn.addEventListener('click', () => {
    cart.push({
      name: btn.dataset.name,
      price: Number(btn.dataset.price),
    });
    renderCart();
    cartDrawer.classList.add('open');
  });
});

function renderCart() {
  cartCount.textContent = cart.length;

  if (!cart.length) {
    cartItems.innerHTML = '<p class="empty-cart">目前沒有商品。</p>';
    cartTotal.textContent = 'HK$0';
    checkoutLink.href = '#contact';
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartItems.innerHTML = cart.map((item, idx) => `
    <div class="cart-item">
      <div>
        <strong>${item.name}</strong>
        <div>HK$${item.price}</div>
      </div>
      <button class="btn btn-secondary" onclick="removeItem(${idx})">移除</button>
    </div>
  `).join('');

  cartTotal.textContent = `HK$${total}`;

  const orderText = encodeURIComponent(
    '你好，我想查詢以下梅子酒訂單：\n' +
    cart.map((item) => `- ${item.name} / HK$${item.price}`).join('\n') +
    `\n總計：HK$${total}`
  );
  checkoutLink.href = `https://wa.me/85228886688?text=${orderText}`;
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}
window.removeItem = removeItem;

function submitInquiry(event) {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  const msg = `姓名：${data.get('name')}\n電郵：${data.get('email')}\n電話：${data.get('phone')}\n需求：${data.get('type')}\n留言：${data.get('message')}`;
  const subject = encodeURIComponent('香港梅子酒網站查詢');
  const body = encodeURIComponent(msg);
  window.location.href = `mailto:hello@plumsee.hk?subject=${subject}&body=${body}`;
  const formMsg = document.getElementById('formMsg');
  formMsg.textContent = '已打開你的電郵程式，你可以直接發送查詢。';
  form.reset();
  return false;
}
window.submitInquiry = submitInquiry;
