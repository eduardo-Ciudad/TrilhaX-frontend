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

/* Carreiras */

const listaCarreiras = document.getElementById('lista-carreiras');

function carreiraFormTemplate() {
  return `
    <h2 class="modal-title" id="modal-title">Criar nova carreira</h2>
    <div class="form-error" id="carreira-form-error"></div>
    <form id="carreira-form" novalidate>
      <div class="form-group">
        <label for="carreira-nome">Nome</label>
        <input type="text" id="carreira-nome" name="nome" maxlength="100" required />
      </div>
      <div class="form-group">
        <label for="carreira-descricao">Descrição</label>
        <textarea id="carreira-descricao" name="descricao" rows="3"></textarea>
      </div>
      <div class="form-group">
        <label for="carreira-icone">URL do ícone</label>
        <input type="text" id="carreira-icone" name="iconeUrl" placeholder="https://..." />
      </div>
      <div class="form-group">
        <label for="carreira-ordem">Ordem</label>
        <input type="number" id="carreira-ordem" name="ordem" min="0" required />
      </div>
      <div class="modal-actions">
        <button type="button" class="btn btn-secondary" id="carreira-cancel-btn">Cancelar</button>
        <button type="submit" class="btn btn-primary" id="carreira-submit-btn">Salvar</button>
      </div>
    </form>
  `;
}

function openCarreiraModal() {
  openModal(carreiraFormTemplate());
  document.getElementById('carreira-cancel-btn').addEventListener('click', closeModal);
  document.getElementById('carreira-form').addEventListener('submit', handleCarreiraSubmit);
}

async function handleCarreiraSubmit(e) {
  e.preventDefault();
  const formError = document.getElementById('carreira-form-error');
  const submitBtn = document.getElementById('carreira-submit-btn');
  formError.classList.remove('visible');

  const nome = document.getElementById('carreira-nome').value.trim();
  const descricao = document.getElementById('carreira-descricao').value.trim();
  const iconeUrl = document.getElementById('carreira-icone').value.trim();
  const ordem = parseInt(document.getElementById('carreira-ordem').value, 10);

  if (!nome || Number.isNaN(ordem) || ordem < 0) {
    formError.textContent = 'Preencha os campos obrigatórios corretamente.';
    formError.classList.add('visible');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Salvando...';

  try {
    await apiFetch('/carreiras', {
      method: 'POST',
      body: JSON.stringify({ nome, descricao, iconeUrl, ordem }),
    });
    closeModal();
    showToast('Carreira criada com sucesso!', 'success');
    loadCarreiras();
    carreirasCache = null;
  } catch (err) {
    formError.textContent = extractErrorMessage(err, 'Não foi possível criar a carreira.');
    formError.classList.add('visible');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Salvar';
  }
}

function renderCarreiras(carreiras) {
  if (carreiras.length === 0) {
    renderEmptyState(listaCarreiras, {
      icon: '🎯',
      message: 'Nenhuma carreira cadastrada.',
      buttonLabel: '+ Nova Carreira',
      onCreate: openCarreiraModal,
    });
    return;
  }

  listaCarreiras.innerHTML = carreiras
    .map((carreira) => {
      const ativa = carreira.ativa !== false;
      return `
        <div class="item-card">
          <div class="item-card-main">
            <h3 class="item-card-title">${escapeHtml(carreira.nome)}</h3>
            ${carreira.descricao ? `<p class="item-card-desc">${escapeHtml(carreira.descricao)}</p>` : ''}
          </div>
          <div class="item-card-meta">
            <span class="badge badge-order">Ordem ${carreira.ordem}</span>
            <span class="badge ${ativa ? 'badge-active' : 'badge-inactive'}">${ativa ? 'Ativa' : 'Inativa'}</span>
          </div>
        </div>
      `;
    })
    .join('');
}

async function loadCarreiras() {
  renderLoading(listaCarreiras);
  tabLoaders.carreiras.loaded = true;
  try {
    const carreiras = await apiFetch('/carreiras');
    renderCarreiras(carreiras);
  } catch (err) {
    listaCarreiras.innerHTML = `<p class="loading-text">Erro ao carregar carreiras.</p>`;
    tabLoaders.carreiras.loaded = false;
  }
}

tabLoaders.carreiras = { loaded: false, load: loadCarreiras };

document.getElementById('btn-nova-carreira').addEventListener('click', openCarreiraModal);

/* Ebooks */

const listaEbooks = document.getElementById('lista-ebooks');
const selectCarreiraFiltro = document.getElementById('select-carreira-filtro');

let carreirasCache = null;
let carreiraFiltroId = '';

async function getCarreirasCache() {
  if (!carreirasCache) {
    carreirasCache = await apiFetch('/carreiras');
  }
  return carreirasCache;
}

function renderCarreiraOptions(select, carreiras, selectedId) {
  select.innerHTML =
    '<option value="">Selecione uma carreira</option>' +
    carreiras
      .map(
        (c) =>
          `<option value="${c.id}" ${String(c.id) === String(selectedId) ? 'selected' : ''}>${escapeHtml(c.nome)}</option>`
      )
      .join('');
}

function ebookFormTemplate(carreiras) {
  return `
    <h2 class="modal-title" id="modal-title">Criar novo ebook</h2>
    <div class="form-error" id="ebook-form-error"></div>
    <form id="ebook-form" novalidate>
      <div class="form-group">
        <label for="ebook-carreira">Carreira</label>
        <select id="ebook-carreira" name="carreiraId" required>
          <option value="">Selecione uma carreira</option>
          ${carreiras
            .map(
              (c) =>
                `<option value="${c.id}" ${String(c.id) === String(carreiraFiltroId) ? 'selected' : ''}>${escapeHtml(c.nome)}</option>`
            )
            .join('')}
        </select>
      </div>
      <div class="form-group">
        <label for="ebook-titulo">Título</label>
        <input type="text" id="ebook-titulo" name="titulo" maxlength="150" required />
      </div>
      <div class="form-group">
        <label for="ebook-descricao">Descrição</label>
        <textarea id="ebook-descricao" name="descricao" rows="2"></textarea>
      </div>
      <div class="form-group">
        <label for="ebook-conteudo">Conteúdo do roadmap</label>
        <textarea
          id="ebook-conteudo"
          name="conteudo"
          class="mono"
          required
          placeholder="# Fase 1 — Fundamentos

## 1. Tópico
- Item 1
- Item 2

## 2. Tópico
- Item 1"
        ></textarea>
        <p class="form-hint">Use Markdown para formatar o conteúdo (# títulos, ## subtítulos, - listas)</p>
      </div>
      <div class="form-group">
        <label for="ebook-ordem">Ordem</label>
        <input type="number" id="ebook-ordem" name="ordem" min="0" required />
      </div>
      <div class="modal-actions">
        <button type="button" class="btn btn-secondary" id="ebook-cancel-btn">Cancelar</button>
        <button type="submit" class="btn btn-primary" id="ebook-submit-btn">Salvar</button>
      </div>
    </form>
  `;
}

async function openEbookModal() {
  const carreiras = await getCarreirasCache();
  openModal(ebookFormTemplate(carreiras), { large: true });
  document.getElementById('ebook-cancel-btn').addEventListener('click', closeModal);
  document.getElementById('ebook-form').addEventListener('submit', handleEbookSubmit);
}

async function handleEbookSubmit(e) {
  e.preventDefault();
  const formError = document.getElementById('ebook-form-error');
  const submitBtn = document.getElementById('ebook-submit-btn');
  formError.classList.remove('visible');

  const carreiraId = document.getElementById('ebook-carreira').value;
  const titulo = document.getElementById('ebook-titulo').value.trim();
  const descricao = document.getElementById('ebook-descricao').value.trim();
  const conteudo = document.getElementById('ebook-conteudo').value.trim();
  const ordem = parseInt(document.getElementById('ebook-ordem').value, 10);

  if (!carreiraId || !titulo || !conteudo || Number.isNaN(ordem) || ordem < 0) {
    formError.textContent = 'Preencha os campos obrigatórios corretamente.';
    formError.classList.add('visible');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Salvando...';

  try {
    await apiFetch('/ebooks', {
      method: 'POST',
      body: JSON.stringify({ carreiraId: Number(carreiraId), titulo, descricao, conteudo, ordem }),
    });
    closeModal();
    showToast('Ebook criado com sucesso!', 'success');
    if (String(carreiraId) === String(carreiraFiltroId)) {
      loadEbooks(carreiraFiltroId);
    }
  } catch (err) {
    formError.textContent = extractErrorMessage(err, 'Não foi possível criar o ebook.');
    formError.classList.add('visible');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Salvar';
  }
}

function renderEbooksPrompt() {
  renderEmptyState(listaEbooks, {
    icon: '📚',
    message: 'Selecione uma carreira para ver os ebooks.',
  });
}

function renderEbooks(ebooks) {
  if (ebooks.length === 0) {
    renderEmptyState(listaEbooks, {
      icon: '📚',
      message: 'Nenhum ebook nesta carreira. Crie o primeiro!',
      buttonLabel: '+ Novo Ebook',
      onCreate: openEbookModal,
    });
    return;
  }

  const carreiraNome =
    carreirasCache?.find((c) => String(c.id) === String(carreiraFiltroId))?.nome || '';

  listaEbooks.innerHTML = ebooks
    .map(
      (ebook) => `
        <div class="item-card">
          <div class="item-card-main">
            <h3 class="item-card-title">${escapeHtml(ebook.titulo)}</h3>
            ${ebook.descricao ? `<p class="item-card-desc">${escapeHtml(ebook.descricao)}</p>` : ''}
          </div>
          <div class="item-card-meta">
            <span class="badge badge-order">Ordem ${ebook.ordem}</span>
            <span class="badge badge-carreira">${escapeHtml(carreiraNome)}</span>
          </div>
        </div>
      `
    )
    .join('');
}

async function loadEbooks(carreiraId) {
  renderLoading(listaEbooks);
  try {
    const ebooks = await apiFetch(`/ebooks/carreira/${carreiraId}`);
    renderEbooks(ebooks);
  } catch (err) {
    listaEbooks.innerHTML = `<p class="loading-text">Erro ao carregar ebooks.</p>`;
  }
}

selectCarreiraFiltro.addEventListener('change', (e) => {
  carreiraFiltroId = e.target.value;
  if (carreiraFiltroId) {
    loadEbooks(carreiraFiltroId);
  } else {
    renderEbooksPrompt();
  }
});

async function loadEbooksTab() {
  tabLoaders.ebooks.loaded = true;
  try {
    const carreiras = await getCarreirasCache();
    renderCarreiraOptions(selectCarreiraFiltro, carreiras, carreiraFiltroId);
    renderEbooksPrompt();
  } catch (err) {
    listaEbooks.innerHTML = `<p class="loading-text">Erro ao carregar carreiras.</p>`;
    tabLoaders.ebooks.loaded = false;
  }
}

tabLoaders.ebooks = { loaded: false, load: loadEbooksTab };

document.getElementById('btn-novo-ebook').addEventListener('click', openEbookModal);

setActiveTab('planos');
