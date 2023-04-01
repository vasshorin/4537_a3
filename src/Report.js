import React from "react";
import axios from 'axios'
import { useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";

function Report({id, accessToken, setAccessToken, refreshToken}) {
  
const [reportTable, setReportTable] = useState(null);
  
// Add a request interceptor
const axiosToBeIntercepted = axios.create()
axiosToBeIntercepted.interceptors.request.use(async function (config) {
  // Do something before request is sent

  // try to refresh token
  // check if token is expired
  const decoded = jwt_decode(accessToken);
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    console.log("token expired")
    // send a request to refresh token
    const res = await axios.get('http://localhost:5003/requestNewAccessToken',
      {
        headers: {
          "auth-token-refresh": refreshToken
        }
      })
    setAccessToken(res.headers["auth-token-access"])
    config.headers["auth-token-access"] = res.headers["auth-token-access"]
  }

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
  
useEffect(() => {
    async function fetchReport() {
      const res = await axiosToBeIntercepted.get(
        `http://localhost:6003/report?id=${id}`
        , {
          headers: {
            "auth-token-access": accessToken
          }
        })
      setReportTable(res.data)
    }
    fetchReport()
  }, [accessToken, axiosToBeIntercepted, id])
  
 return (
    <div>
      Report {id} 
      {
        (reportTable) &&
         reportTable
      }
    </div>
  );
}

export default Report;