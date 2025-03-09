// npm install axios
// node kiwiApi.js
// https://axios-http.com/

const axios = require('axios');
const qs = require('qs');
const https = require('https');

const API_BASE_URL = 'https://localhost';
const LOGIN_URL = `${API_BASE_URL}/accounts/login/`;
const JSON_RPC_URL = `${API_BASE_URL}/json-rpc/`;

async function login() {
  try {
    const response = await axios.post(LOGIN_URL, qs.stringify({
      username: 'admin',
      password: 'admin'
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      withCredentials: true
    });
    const cookies = response.headers['set-cookie'];
    if (!cookies) {
      throw new Error('No se recibieron cookies de sesión');
    }
    return cookies;
  } catch (error) {
    console.error('Error en login:', error.message);
    throw error;
  }
}

async function callKiwiTCMS(cookies, method, params) {
  const requestData = {
    jsonrpc: '2.0',
    method,
    params,
    id: 1
  };

  try {
    const response = await axios.post(JSON_RPC_URL, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookies.join('; ')
      },
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      withCredentials: true
    });
    if (response.data.error) {
      throw new Error(response.data.error.message);
    }
    return response.data.result;
  } catch (error) {
    console.error('Error al conectar con la API de Kiwi TCMS:', error.message);
    throw error;
  }
}

(async () => {
  try {
    const cookies = await login();
    console.log('Cookies de sesión:', cookies);
    const testCases = await callKiwiTCMS(cookies, 'TestCase.filter', { summary__startswith: 'test' });
    console.log('Casos de prueba:', testCases);
  } catch (error) {
    console.error('Error en el flujo de autenticación:', error.message);
  }
})();