import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import Dashboard from './Dashboard'
import Search from './Search'
import Result from './Result'
import './Login.css'


function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const [refreshToken, setRefreshToken] = useState('')
  const [user, setUser] = useState({})
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const PAGE_SIZE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const onClickHandle = async (e) => {
    e.preventDefault()
    const res = await axios.post('http://localhost:5003/login',
      {
        username: username,
        password: password
      })
      localStorage.setItem('refreshToken', res.headers["auth-token-refresh"]);
      localStorage.setItem('accessToken', res.headers["auth-token-access"]);
      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(res.data);
      setAccessToken(res.headers["auth-token-access"]);
      setRefreshToken(res.headers["auth-token-refresh"]);
  }

  useEffect(() => {
    const savedRefreshToken = localStorage.getItem('refreshToken');
    const savedAccessToken = localStorage.getItem('accessToken');
    const savedUser = localStorage.getItem('user');
    if (savedRefreshToken && savedUser && savedAccessToken) {
      setRefreshToken(savedRefreshToken);
      setAccessToken(savedAccessToken)
      setUser(JSON.parse(savedUser));
    }
  }, []);
    

  return (
    <div>
      {
        (accessToken && user?.role === "admin") &&
        <Dashboard
          accessToken={accessToken}
          setAccessToken={setAccessToken}
          refreshToken={refreshToken}
          setRefreshToken={setRefreshToken}
          setUser={setUser}
        />
      }
     {
  (accessToken && user?.role === "user") &&
  <Search selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
}
{
  (selectedTypes.length > 0 || searchTerm.length > 0) &&
  <Result
    selectedTypes={selectedTypes}
    PAGE_SIZE={PAGE_SIZE}
    setCurrentPage={setCurrentPage}
    currentPage={currentPage}
    searchTerm={searchTerm}
    setSearchTerm={setSearchTerm}
  />
}
      {
        (!accessToken) &&
        <form onSubmit={onClickHandle}>
          <input
            type="text"
            placeholder='username'
            onChange={(e) => { setUsername(e.target.value) }}
          />
          <input
            type="password"
            placeholder='password'
            onChange={(e) => { setPassword(e.target.value) }}
          />
          <button type="submit">Login</button>
        </form>
      }
    </div>
  )
}

export default Login