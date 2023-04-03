import React, { useState, useEffect } from 'react'
import Report from './Report'
import {
    Routes,
    Route,
    Link
  } from "react-router-dom";


function Dashboard({accessToken, setAccessToken, refreshToken, setRefreshToken, setUser}) {

  useEffect(() => {
    console.log("Lpgin use effect is called")
    const savedRefreshToken = localStorage.getItem('refreshToken');
    const savedAccessToken = localStorage.getItem('accessToken');
    const savedUser = localStorage.getItem('user');
    if (savedRefreshToken && savedUser && savedAccessToken) {
      setRefreshToken(savedRefreshToken);
      setAccessToken(savedAccessToken)
      setUser(JSON.parse(savedUser));
    }
  }, []);
  

  const onLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setAccessToken('');
    setUser({});
  };

  return (
    <div>
        <h1>
        Dashboard
        </h1> 
        <nav>
        <ul>
            <li><Link to="report/1">Report 1 - Unique API user</Link></li>
            <li><Link to="report/2">Report 2 - TOP APIS users over period of time</Link></li>
            <li><Link to="report/3">Report 3 - 4xx Errors By Endpoint</Link></li>
            <li><Link to="report/4">Report 4 - TOP User for each end points</Link></li>
            <li><Link to="report/5">Report 5 - Recent 4xx/5xx Errors</Link></li>
        </ul>
        </nav>

       <Routes>
        <Route path="/report/1" element={<Report id={1} accessToken={accessToken} setAccessToken={setAccessToken} refreshToken={refreshToken} setRefreshToken={setRefreshToken} setUser={setUser}/>} />
        <Route path="/report/2" element={<Report id={2} accessToken={accessToken} setAccessToken={setAccessToken} refreshToken={refreshToken} setRefreshToken={setRefreshToken} setUser={setUser}/>} />
        <Route path="/report/3" element={<Report id={3} accessToken={accessToken} setAccessToken={setAccessToken} refreshToken={refreshToken} setRefreshToken={setRefreshToken} setUser={setUser}/>} />
        <Route path="/report/4" element={<Report id={4} accessToken={accessToken} setAccessToken={setAccessToken} refreshToken={refreshToken} setRefreshToken={setRefreshToken} setUser={setUser}/>} />
        <Route path="/report/5" element={<Report id={5} accessToken={accessToken} setAccessToken={setAccessToken} refreshToken={refreshToken} setRefreshToken={setRefreshToken} setUser={setUser}/>} />
      </Routes>

      <div>
      <h1>Welcome, admin!</h1>
      <button onClick={onLogout}>Logout</button>
    </div>
    </div>
  )
}

export default Dashboard