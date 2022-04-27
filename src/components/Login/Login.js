import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
const axios = require('axios').default;

async function loginUser(email, password) {
  return axios.post('http://154.53.63.196:8080/user/login', {
    email: email, password: password
  })
    .catch(({ response }) => {
      // throw new Error(response.data?.error)
      throw new Error(response.data.error)
    });
}


export default function Login({ setToken }) {

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [hasError, setHasError] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = await loginUser(username, password);
      setToken(token);
    } catch (error) {
      // alert(error.message)
      setError(error.message);
      setHasError(true);
      
    }
  }

  return (
    <>
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
        {hasError && <div>{error}</div>}
      </form>
    </div>
    </>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}