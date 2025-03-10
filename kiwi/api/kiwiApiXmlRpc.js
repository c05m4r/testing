// npm install xmlrpc
// node kiwiApiXmlRpc.js
// https://www.npmjs.com/package/xmlrpc

const xmlrpc = require('xmlrpc');
const https = require('https');

class XmlRpcClient {
  constructor(url, username, password) {
    this.url = url;
    this.username = username;
    this.password = password;
    this.cookies = [];
    this.client = xmlrpc.createSecureClient({
      url: this.url,
      rejectUnauthorized: false
    });
  }

  async login() {
    return new Promise((resolve, reject) => {
      this.client.methodCall('Auth.login', [this.username, this.password], (error, value) => {
        if (error) {
          reject(new Error(`Error en la llamada XML-RPC: ${error.message}`));
        } else {
          this.cookies = value.headers['set-cookie'];
          resolve(value);
        }
      });
    });
  }

  execute(method, params = []) {
    return new Promise((resolve, reject) => {
      const options = {
        host: this.url,
        path: '/',
        headers: {
          'Cookie': this.cookies.join('; ')
        }
      };

      this.client.methodCall(method, params, options, (error, value) => {
        if (error) {
          reject(new Error(`Error en la llamada XML-RPC: ${error.message}`));
        } else {
          resolve(value);
        }
      });
    });
  }
}

const rpc = new XmlRpcClient('https://localhost/xml-rpc/', 'admin', 'admin');

rpc.login()
  .then(() => {
    return rpc.execute('KiwiTCMS.version');
  })
  .then(result => {
    console.log('Versión de Kiwi TCMS:', result);
    return rpc.execute('User.filter', [{}]);
  })
  .then(result => {
    console.log('Lista de usuarios:', result);
  })
  .catch(error => {
    console.error(error.message);
  });