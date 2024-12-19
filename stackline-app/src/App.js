import React from 'react';
import logo from './stackline_logo.svg';
import './App.css';
import data from './stackline_frontend_assessment_data_2021.json';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, plugins, scales, ticks } from 'chart.js';
import SalesTable from './salesTable';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function App() {
  const product = data[0];
  const sales = product.sales;
  const getMonth = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'short' }).toUpperCase();
  }
  const salesData = {
    labels: sales.map(sale => getMonth(sale.weekEnding)),
    datasets: [
      {
        label: 'Retail Sales',
        data: sales.map(sale => sale.retailSales),
        fill: false,
        borderColor: 'rgb(0, 140, 255)',
        tension: 0.4,
        pointRadius: 0
      },
      {
        label: 'Wholesale Sales',
        data: sales.map(sale => sale.wholesaleSales),
        fill: false,
        borderColor: 'rgb(190, 190, 190)',
        tension: 0.4,
        pointRadius: 0
      }
    ]
  };
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
        align: 'start'
      },
      title: {
        display: true,
        text: 'Retail & Wholesale Sales',
        align: 'start',
        position: 'top',
        font:{
          family: 'Montserrat',
          size: 25
        },
        padding: {
          top: 30,
          bottom: -30,
          left: 50
        }
      }
    },
    scales: {
      x: {
        title: {
          display: false,
        },
        grid: {
          display: false
        },
        ticks: {
          callback: function(value, index) {
            // Show every other tick
            return index % 4 === 1 ? getMonth(sales[value].weekEnding) : '';
          },
        }
      },
      y: {
        grid: {
          display: false
        },
        legend: {
          display: false
        },
        ticks: {
          display: false
        },
        border: {
          display: false
        }
      }
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="App-body">
        <div className="column col-left">
          <img src={product.image} alt={product.title} className="product-image" />
          <h3>{product.title}</h3>
          <p>{product.subtitle}</p>
          <div className="tags"> 
            {product.tags.map((tag, index) => (
              <button key={index} className="tag">{tag}</button>
            ))}
          </div>
        </div>
        <div className="column col-right">
          <Line data={salesData} options={chartOptions} />
          <SalesTable sales={sales} />
        </div>
      </div>
    </div>
  );
}

export default App;
