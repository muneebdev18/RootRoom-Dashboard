import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import barChartUtils from '../../utils/barChartUtils';
import { BASE_URL } from '../../app/constants';
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const StackedBarChart = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Users',
        data: [],
        backgroundColor: barChartUtils.CHART_COLORS.blue,
      },
      {
        label: 'Posts',
        data: [],
        backgroundColor: barChartUtils.CHART_COLORS?.peach,
      },
      {
        label: 'Groups',
        data: [],
        backgroundColor: barChartUtils.CHART_COLORS.purple,
      },
    ],
  });

  const adminData = JSON.parse(localStorage.getItem('admin_user'));
  const token = adminData?.token;

  useEffect(() => {
    fetch(`${BASE_URL}admin/dashboardChartsRecord`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => response.json())
    .then(result => {
      console.log(result);
      
      const userCounts = Array(result.data.userCounts.length).fill(0);
      const postCounts = Array(result.data.postCounts.length).fill(0);
      const groupCounts = Array(result.data.groupCounts.length).fill(0);
      const labels = [];

      result.data.userCounts.forEach((item, index) => {
        labels.push(`${barChartUtils.getMonthName(item.month)}\n${item.year}`);
        userCounts[index] = item.count;
      });

      result.data.postCounts.forEach((item, index) => {
        postCounts[index] = item.count;
      });

      result.data.groupCounts.forEach((item, index) => {
        groupCounts[index] = item.count;
      });

      setData({
        labels: labels,
        datasets: [
          {
            label: 'Users',
            data: userCounts,
            backgroundColor: barChartUtils.CHART_COLORS.blue,
          },
          {
            label: 'Posts',
            data: postCounts,
            backgroundColor: barChartUtils.CHART_COLORS.peach,
          },
          {
            label: 'Groups',
            data: groupCounts,
            backgroundColor: barChartUtils.CHART_COLORS.purple,
          },
        ],
      });
    })
    .catch(error => console.error('Error fetching data:', error));
  }, []);

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'App Analysis',
        font: {
          size: 24, // Increase the font size here
          
        },
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        ticks: {
          callback: function(value, index, ticks) {
            const label = this.getLabelForValue(value);
            return label.split('\n');
          }
        }
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default StackedBarChart;