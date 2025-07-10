// supabase-api.js

// ✅ Configurações do Supabase
const SUPABASE_URL = 'https://buscdmudxutdlzjbvuns.supabase.co'; // Substitua pelo seu URL
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1c2NkbXVkeHV0ZGx6amJ2dW5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyODgwMDIsImV4cCI6MjA2NTg2NDAwMn0.3yhGL2HMOVhswUOwN00KgiZy2YyFmdiFdovIYITSAu4'; // Substitua pela sua anon key

// ✅ Criação da instância do Axios
const api = axios.create({
  baseURL: `${SUPABASE_URL}/rest/v1`,
  headers: {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ✅ Funções utilitárias

// GET - lista registros
async function getAll(table) {
  const { data } = await api.get(`/${table}`);
  return data;
}

// GET - lista registros por id
async function getById(tabela, id) {
  const { data } = await api.get(`/${tabela}?id=eq.${id}&select=*`);
  if (!data || !data.length) throw new Error("Registro não encontrado");
  return data[0];
}

// GET com filtros
async function getFiltered(table, queryParams = '') {
  const { data } = await api.get(`/${table}?${queryParams}`);
  return data;
}

// POST - cria um novo registro
async function create(table, payload) {
  const { data } = await api.post(`/${table}`, payload, {
    headers: {
      Prefer: 'return=representation', // retorna o dado criado
    },
  });
  return data;
}

// PATCH - atualiza registro(s)
async function update(table, filter, payload) {
  const { data } = await api.patch(`/${table}?${filter}`, payload, {
    headers: {
      Prefer: 'return=representation',
    },
  });
  return data;
}

// DELETE - remove registro(s)
async function remove(table, filter) {
  const { data } = await api.delete(`/${table}?${filter}`);
  return data;
}

// Exportando as funções para uso no HTML
window.supabaseApi = {
  getAll,
  getFiltered,
  getById,
  create,
  update,
  remove,
};
