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

/* Helpers */

function escapeHtml(value) {
  const div = document.createElement('div');
  div.textContent = value ?? '';
  return div.innerHTML;
}

function formatCurrency(value) {
  return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function extractErrorMessage(err, fallback) {
  return err?.message || err?.erro || fallback;
}

function renderEmptyState(container, { icon, message, buttonLabel, onCreate }) {
  container.innerHTML = `
    <div class="empty-state">
      <div class="empty-state-icon">${icon}</div>
      <p class="empty-state-message">${message}</p>
      ${buttonLabel ? '<button class="btn btn-primary" id="empty-state-btn">' + buttonLabel + '</button>' : ''}
    </div>
  `;
  if (buttonLabel && onCreate) {
    document.getElementById('empty-state-btn').addEventListener('click', onCreate);
  }
}

function renderLoading(container) {
  container.innerHTML = '<p class="loading-text">Carregando...</p>';
}

/* Planos */

const listaPlanos = document.getElementById('lista-planos');

function planoFormTemplate() {
  return `
    <h2 class="modal-title" id="modal-title">Criar novo plano</h2>
    <div class="form-error" id="plano-form-error"></div>
    <form id="plano-form" novalidate>
      <div class="form-group">
        <label for="plano-nome">Nome</label>
        <input type="text" id="plano-nome" name="nome" maxlength="100" required />
      </div>
      <div class="form-group">
        <label for="plano-descricao">Descrição</label>
        <textarea id="plano-descricao" name="descricao" rows="3"></textarea>
      </div>
      <div class="form-group">
        <label for="plano-preco">Preço (R$)</label>
        <input type="number" id="plano-preco" name="preco" step="0.01" min="0.01" required />
      </div>
      <div class="form-group">
        <label for="plano-duracao">Duração (dias)</label>
        <input type="number" id="plano-duracao" name="duracaoDias" min="1" required />
      </div>
      <div class="modal-actions">
        <button type="button" class="btn btn-secondary" id="plano-cancel-btn">Cancelar</button>
        <button type="submit" class="btn btn-primary" id="plano-submit-btn">Salvar</button>
      </div>
    </form>
  `;
}

function openPlanoModal() {
  openModal(planoFormTemplate());
  document.getElementById('plano-cancel-btn').addEventListener('click', closeModal);
  document.getElementById('plano-form').addEventListener('submit', handlePlanoSubmit);
}

async function handlePlanoSubmit(e) {
  e.preventDefault();
  const formError = document.getElementById('plano-form-error');
  const submitBtn = document.getElementById('plano-submit-btn');
  formError.classList.remove('visible');

  const nome = document.getElementById('plano-nome').value.trim();
  const descricao = document.getElementById('plano-descricao').value.trim();
  const preco = parseFloat(document.getElementById('plano-preco').value);
  const duracaoDias = parseInt(document.getElementById('plano-duracao').value, 10);

  if (!nome || !preco || preco <= 0 || !duracaoDias || duracaoDias < 1) {
    formError.textContent = 'Preencha os campos obrigatórios corretamente.';
    formError.classList.add('visible');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Salvando...';

  try {
    await apiFetch('/planos', {
      method: 'POST',
      body: JSON.stringify({ nome, descricao, preco, duracaoDias }),
    });
    closeModal();
    showToast('Plano criado com sucesso!', 'success');
    loadPlanos();
  } catch (err) {
    formError.textContent = extractErrorMessage(err, 'Não foi possível criar o plano.');
    formError.classList.add('visible');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Salvar';
  }
}

function renderPlanos(planos) {
  if (planos.length === 0) {
    renderEmptyState(listaPlanos, {
      icon: '📋',
      message: 'Nenhum plano cadastrado. Crie o primeiro!',
      buttonLabel: '+ Novo Plano',
      onCreate: openPlanoModal,
    });
    return;
  }

  listaPlanos.innerHTML = planos
    .map((plano) => {
      const ativo = plano.ativo !== false;
      return `
        <div class="item-card">
          <div class="item-card-main">
            <h3 class="item-card-title">${escapeHtml(plano.nome)}</h3>
            ${plano.descricao ? `<p class="item-card-desc">${escapeHtml(plano.descricao)}</p>` : ''}
          </div>
          <div class="item-card-meta">
            <span class="item-price">${formatCurrency(plano.preco)}</span>
            <span class="item-detail">${plano.duracaoDias} dias</span>
            <span class="badge ${ativo ? 'badge-active' : 'badge-inactive'}">${ativo ? 'Ativo' : 'Inativo'}</span>
          </div>
        </div>
      `;
    })
    .join('');
}

async function loadPlanos() {
  renderLoading(listaPlanos);
  tabLoaders.planos.loaded = true;
  try {
    const planos = await apiFetch('/planos');
    renderPlanos(planos);
  } catch (err) {
    listaPlanos.innerHTML = `<p class="loading-text">Erro ao carregar planos.</p>`;
    tabLoaders.planos.loaded = false;
  }
}

tabLoaders.planos = { loaded: false, load: loadPlanos };

document.getElementById('btn-novo-plano').addEventListener('click', openPlanoModal);

setActiveTab('planos');
