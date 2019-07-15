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
