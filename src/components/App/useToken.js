import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const token = sessionStorage.getItem('token');
    return token
  };

  const [token, setToken] = useState(getToken());

  const saveToken = response => {
    sessionStorage.setItem('token', response.data?.accessToken);
    setToken(response.data?.accessToken);
  };

  return {
    setToken: saveToken,
    token
  }
}