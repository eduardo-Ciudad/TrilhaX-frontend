(function guardAdminAccess() {
  const user = getUser();
  if (!isAuthenticated() || !user || user.role !== 'ADMIN') {
    window.location.href = 'login.html';
  }
})();

const modalOverlay = document.getElementById('modal-overlay');
const modalEl = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const modalCloseBtn = document.getElementById('modal-close');
const toastContainer = document.getElementById('toast-container');

let lastFocusedElement = null;

function openModal(html, { large = false } = {}) {
  modalContent.innerHTML = html;
  modalEl.classList.toggle('modal-lg', large);
  lastFocusedElement = document.activeElement;
  modalOverlay.classList.add('open');
  const firstField = modalContent.querySelector('input, textarea, select');
  if (firstField) firstField.focus();
}

function closeModal() {
  modalOverlay.classList.remove('open');
  modalContent.innerHTML = '';
  if (lastFocusedElement) lastFocusedElement.focus();
}

modalCloseBtn.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
    closeModal();
  }

  if (e.key === 'Tab' && modalOverlay.classList.contains('open')) {
    const focusable = modalEl.querySelectorAll(
      'button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toast-fade-out 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 2700);
}

const sidebarItems = document.querySelectorAll('.sidebar-item');
const tabPanels = document.querySelectorAll('.admin-tab');

const tabLoaders = {};

function setActiveTab(tab) {
  sidebarItems.forEach((item) => {
    item.classList.toggle('active', item.dataset.tab === tab);
  });
  tabPanels.forEach((panel) => {
    panel.classList.toggle('active', panel.dataset.tabPanel === tab);
  });

  if (tabLoaders[tab] && !tabLoaders[tab].loaded) {
    tabLoaders[tab].load();
  }
}

sidebarItems.forEach((item) => {
  item.addEventListener('click', () => setActiveTab(item.dataset.tab));
});

document.getElementById('logout-btn').addEventListener('click', logout);

const user = getUser();
if (user) {
  document.getElementById('admin-user-name').textContent = user.nome;
}

setActiveTab('planos');
