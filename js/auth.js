function persistSession(data) {
  const { token, ...user } = data;
  localStorage.setItem('trilhax_token', token);
  localStorage.setItem('trilhax_user', JSON.stringify(user));
}

async function login(email, senha) {
  const data = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, senha }),
  });
  persistSession(data);
  return data;
}

async function register(nome, email, senha) {
  const data = await apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ nome, email, senha }),
  });
  persistSession(data);
  return data;
}

function logout() {
  localStorage.removeItem('trilhax_token');
  localStorage.removeItem('trilhax_user');
  window.location.href = 'index.html';
}

function getUser() {
  const stored = localStorage.getItem('trilhax_user');
  return stored ? JSON.parse(stored) : null;
}

function isAuthenticated() {
  return !!localStorage.getItem('trilhax_token');
}

function requireAuth() {
  if (!isAuthenticated()) {
    window.location.href = 'login.html';
  }
}

function redirectByRole() {
  const user = getUser();
  if (user && user.role === 'ADMIN') {
    window.location.href = 'admin.html';
  } else {
    window.location.href = 'dashboard.html';
  }
}
