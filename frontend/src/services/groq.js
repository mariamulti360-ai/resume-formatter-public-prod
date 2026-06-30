const BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://127.0.0.1:8000/' 
  : window.location.origin + '/';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const apiService = {
  async post(endpoint, body) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(body),
    });

    return this.handleResponse(response);
  },

  async get(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: getHeaders(),
    });

    return this.handleResponse(response);
  },

  async handleResponse(response) {
    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;

    if (!response.ok) {
      return { 
        error: true, 
        data: data || 'Erro na requisição', 
        status: response.status 
      };
    }

    return { error: false, data, status: response.status };
  }
};