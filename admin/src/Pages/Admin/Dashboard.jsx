import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date().toLocaleDateString();
    setCurrentDate(today);
  }, []);

  // Chart Data
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Daily Sales (LKR)",
        data: [500, 700, 400, 900, 1200, 600, 1100],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderRadius: 8,
      }
    ]
  };

  // Chart Options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Daily Sales Overview",
      },
    },
    scales: {
      x: {
        grid: {
          display: false, 
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='w-full'>

      <div className='flex flex-col items-center gap-4 md:text-start md:flex-row md:items-center md:gap-5'>
        <h1 className='font-semibold text-2xl md:text-3xl'>
          <span className='text-primary-700'>Admin</span> Dashboard
        </h1>
        <p className='py-[5px] px-[13px] border bg-white text-gray-600 rounded-full'>{currentDate}</p>
      </div>

      <div className='w-full flex flex-col max-h-[300px] md:flex-row mt-6 gap-4'>

        <div className='w-full md:w-[40%] flex flex-col md:grid md:grid-cols-4 gap-4'>

          <div className='md:col-span-2 flex flex-col gap-2 border w-full p-4 rounded border-primary-700 text-gray-600'>
            <p className='font-semibold text-base'>Customers</p>
            <p className='text-lg font-semibold text-black'>12,000</p>
            <p className='text-sm text-gray-400'>Since this month</p>
          </div>

          <div className='md:col-span-2 flex flex-col gap-2 border w-full p-4 rounded border-primary-700 text-gray-600'>
            <p className='font-semibold text-base'>Gas Request</p>
            <p className='text-lg font-semibold text-black'>1000</p>
            <p className='text-sm text-gray-400'>Since this month</p>
          </div>

          <div className='md:col-span-2 flex flex-col gap-2 border w-full p-4 rounded border-primary-700 text-gray-600'>
            <p className='font-semibold text-base'>Earning</p>
            <p className='text-lg font-semibold text-black'>200,000</p>
            <p className='text-sm text-gray-400'>Since this month</p>
          </div>

          <div className='md:col-span-2 flex flex-col gap-2 border w-full p-4 rounded border-primary-700 text-gray-600'>
            <p className='font-semibold text-base'>Outlet Request</p>
            <p className='text-lg font-semibold text-black'>20</p>
            <p className='text-sm text-gray-400'>Since this month</p>
          </div>

        </div>

        {/* Chart Section */}
        <div className='w-full  md:w-[60%] bg-white p-4 rounded-md border border-primary-700'>
          <h2 className='text-lg font-semibold text-center mb-2'>Daily Sales Chart</h2>
          <div className='h-[250px]'>
          <Bar data={data} options={options} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
