import axios from 'axios'
import React, { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import jwt_decode from "jwt-decode";

function Report({id, accessToken, setAccessToken, refreshToken, setRefreshToken, setUser}) {
    ChartJS.register(
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend
    );
  
    const [chartData, setChartData] = useState(null);
  
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
  
    useEffect(() => {
      async function fetchReport() {
        let res;
        if (id === 1) {
          // Perform the MongoDB aggregation query for Report 1
          try {
            res = await axios.get("http://localhost:6003/logs/unique-api-users", {
              headers: {
                "auth-token-access": accessToken,
              },
            });
            console.log(res.data)
            // modify the data and labels arrays for the Bar chart
            if (res.data) {
              const labels = res.data.map(item => `${item._id.day}-${item._id.month}-${item._id.year}`);
              const data = res.data.map(item => item.count);
              setChartData({
                labels: labels,
                datasets: [
                  {
                    label: 'Number of Unique API Users',
                    data: data,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                  },
                ],
              });
            }
          } catch (error) {
            console.error(error);
          }
        } else if (id === 2) {
          // Perform the MongoDB aggregation query for Report 2
          try {
            res = await axios.get(`http://localhost:6003/log/top-api-users`, {
              headers: {
                "auth-token-access": accessToken,
              },
            });
            console.log(res.data)
            // modify the data and labels arrays for the Bar chart
            if (res.data) {
              const data = res.data.map(item => item.count);
              const labels = res.data.map(item => item._id);
              setChartData({
                labels: labels,
                datasets: [
                  {
                    label: 'Top API Users',
                    data: data,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                  },
                ],
              });
            }
          } catch (error) {
            console.error(error);
          }
        } else if (id === 3) {
          // Perform the MongoDB aggregation query for Report 3
          try {
            res = await axios.get(`http://localhost:6003/logs/error-by-endpoint`, {
              headers: {
                "auth-token-access": accessToken,
              },
            });
            console.log(res.data)
            if (res.data) {
              const labels = res.data.map((item) => item._id.endpoint);
  
              const data = res.data.map((item) => item.count);
              setChartData({
                labels: labels,
                datasets: [
                  {
                    label: 'Number of 4xx Errors',
                    data: data,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                  },
                ],
              });
            }
            } catch (error) {
                console.error(error);
            }
        }
        }
        fetchReport();
    }, [id, accessToken]);

    return (
        <div>
            <h1>Report {id}</h1>
            {chartData && <Bar data={chartData} />}
        </div>
    )
}


export default Report;
