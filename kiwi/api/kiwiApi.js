// npm install axios
// node kiwiApi.js
// https://axios-http.com/

const axios = require('axios');
const https = require('https');

class JsonRpcClient {
  constructor(url, username, password) {
    this.url = url;
    this.auth = { username, password };
    this.agent = new https.Agent({ rejectUnauthorized: false });
  }

  async execute(method, params = {}) {
    const requestData = {
      jsonrpc: '2.0',
      method,
      params,
      id: Date.now()
    };

    const conf = {
      httpsAgent: this.agent,
      auth: this.auth
    };

    try {
      const response = await axios.post(this.url, requestData, conf);
      const res = response.data;
      if (res.error) throw new Error(`Error ${res.error.code}: ${res.error.message}`);
      return res.result;
    } catch (error) {
      throw new Error(`Error en la llamada JSON-RPC: ${error.message}`);
    }
  }
}

const rpc = new JsonRpcClient('https://localhost/json-rpc/', 'admin', 'admin');

// Obtener version de Kiwi TCMS
rpc.execute('KiwiTCMS.version', {})
.then(result => console.log(result))
.catch(error => console.error(error.message));
