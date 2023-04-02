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

function Report({id, accessToken, setAccessToken, refreshToken}) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const [chartData, setChartData] = useState(null);

  // Add a request interceptor
  const axiosToBeIntercepted = axios.create()
  axiosToBeIntercepted.interceptors.request.use(async function (config) {

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
      let res;
      if (id === 1) {
        // Perform the MongoDB aggregation query for Report 1
        res = await axiosToBeIntercepted.get("http://localhost:6003/logs/unique-api-users", {
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
      } else if (id === 2) {
        console.log("id is 2")
        res = await axiosToBeIntercepted.get(`http://localhost:6003/log/top-api-users`, {
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
      } else if (id === 3) {
        res = await axiosToBeIntercepted.get(`http://localhost:6003/logs/error-by-endpoint`, {
          headers: {
            "auth-token-access": accessToken,
          },
        });
        console.log(res.data)
        if (res.data) {
            const labels = res.data.map((item) => item._id);
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

        } else if(id === 4)
        {
            res = await axiosToBeIntercepted.get(`http://localhost:6003/logs/top-users-by-endpoint`, {
          headers: {
            "auth-token-access": accessToken,
          },
        })
        console.log(res.data)

        if (res.data) {
            const labels = res.data.map(item => item.endpoint);
            const topUsers = res.data.map(item => item.top_user);
            const counts = res.data.map(item => item.count);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Top User Requests by Endpoint',
            data: counts,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      });
    }
    }  else if(id === 5){

        res = await axiosToBeIntercepted.get(`http://localhost:6003/logs/recent-errors`, {
            headers: {
                "auth-token-access": accessToken,
            },
            })
            console.log(res.data)

            if (res.data) {
                const labels = res.data.map(item => new Date(item.timestamp).toLocaleString());
                const data = res.data.map(item => item.status_code);
                setChartData({
                  labels: labels,
                  datasets: [
                    {
                      label: 'Status Code',
                      data: data,
                      fill: false,
                      borderColor: 'rgba(255, 99, 132, 1)',
                      borderWidth: 1,
                    },
                  ],
                });
              }
            } else {
        // Fetch the report data from the server for other reports
        res = await axiosToBeIntercepted.get(`http://localhost:6003/report?id=${id}`, {
          headers: {
            "auth-token-access": accessToken,
          },
        });
      }
    }
    fetchReport();
  }, [accessToken, axiosToBeIntercepted, id]);

  return (
    <div>
      Report {id}
      {chartData ? <Bar data={chartData} /> : <p>Loading chart data...</p>}
    </div>
  );
}

export default Report;
