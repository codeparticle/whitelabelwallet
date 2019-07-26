/**
 * @fileOverview a collection of reusable rest hooks
 * @name rest-hooks.js
 * @author Marc Mathieu
 */

import { useState, useEffect } from 'react';
import { api } from 'rdx/api';

export function useFetch(initialValue = {}, url) {
  const [data, setData] = useState(initialValue);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (!url) {
      return;
    }

    setFetching(true);

    api.request({
      method: 'GET',
      url,
    }).then((response) => {
      setData(response.data);
      setFetching(false);
      setDataLoaded(true);
    }).catch((err) => {
      setError(err);
    });
  }, []);

  return {
    dataLoaded,
    error,
    fetching,
    payload: data,
  };
}