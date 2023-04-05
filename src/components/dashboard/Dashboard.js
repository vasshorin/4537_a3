import React, { useState, useEffect } from 'react'
import Report from '../report/Report'
import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import './Dashboard.css'


function Dashboard({accessToken, setAccessToken, refreshToken, setRefreshToken, setUser}) {

  const [reports, setReports] = useState([
    { id: 1, name: 'Report 1 - Unique API user' },
    { id: 2, name: 'Report 2 - TOP APIS users over period of time' },
    { id: 3, name: 'Report 3 - 4xx Errors By Endpoint' },
    { id: 4, name: 'Report 4 - TOP User for each end points' },
    { id: 5, name: 'Report 5 - Recent 4xx/5xx Errors' }
  ]);

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

  const onLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setAccessToken('');
    setUser({});
  };

  return (
    <div>
      <h1 id='header'>
      <h2>Welcome, admin!</h2>
      </h1>
      <nav>

        <ul>
        
          {reports.map(report => (
            <li key={report.id}><button><Link to={`report/${report.id}`}>{report.name}</Link>                </button></li>
          ))}

        </ul>
        <button className='logout' onClick={onLogout}>Logout</button>
      </nav>

      <div className="routes">
        
        <Routes>
          {reports.map(report => (

            <Route key={report.id} path={`/report/${report.id}`} element={<Report id={report.id} accessToken={accessToken} setAccessToken={setAccessToken} refreshToken={refreshToken} setRefreshToken={setRefreshToken} setUser={setUser}/>} />
          ))}
        </Routes>
      </div>
    </div>
  )
}

export default Dashboard
