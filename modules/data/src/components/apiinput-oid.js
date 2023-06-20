import { html, Oid, OidUI } from '/lib/oidlib-dev.js'

async function makeHttpRequest(method, body, headers, url) {
  try {
    const headersObj = headers ? JSON.parse(headers) : {};
    const requestOptions = {
      method: method,
      headers: headersObj
    };

    if (body) {
      const bodyObj = JSON.parse(body);
      requestOptions.body = JSON.stringify(bodyObj);
    }

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const jsonResult = await response.json();
    return jsonResult;
  } catch (error) {
    throw new Error(error);
  }
}


export class ApiInputOid extends OidUI {
  async handleInput_api (topic, message) {
    const jsonData = message
    
    try {
      let rawData = await makeHttpRequest(jsonData.method, jsonData.body, jsonData.headers, jsonData.api_url)
      console.log(rawData)

      
      this._notify('output', rawData) // Processed file goes here
    } catch (e) {
      this._notify('output', {error: e.message})
    }
  }
}

Oid.component(
{
  id: 'ex:apiinput',
  element: 'api-input',
  properties: {
    id: {default: '1'}
  },
  receive: ['input_api'],
  implementation: ApiInputOid
})
