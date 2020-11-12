/**
* MIT License
*
* Copyright (c) 2020 Code Particle Inc.
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
import isoFetch from 'isomorphic-fetch';

class Api {
  static headers(authToken) {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'nope',
    };
    if (authToken) {
      headers.Authorization = authToken;
    }
    return headers;
  }

  static get(route, authToken) {
    return Api.xhr(route, 'GET', null, authToken);
  }

  static post(route, params, authToken) {
    return Api.xhr(route, 'POST', params, authToken);
  }

  static put(route, params, authToken) {
    return Api.xhr(route, 'PUT', params, authToken);
  }

  static patch(route, params, authToken) {
    return Api.xhr(route, 'PATCH', params, authToken);
  }

  static delete(route, authToken) {
    return Api.xhr(route, 'DELETE', null, authToken);
  }

  static xhr(route, verb, params, authToken) {
    const options = { method: verb };
    options.headers = Api.headers(authToken);
    if (params) {
      options.body = JSON.stringify(params);
    }
    return isoFetch(route, options)
      .then(res => res.json());
  }
}

export default Api;
