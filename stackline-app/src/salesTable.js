import React, {useState} from 'react';
import './App.css';

const SalesTable = ({ sales }) => {
    const [sortConfig, setSortConfig] = useState({ key: 'weekEnding', direction: 'ascending' });
  
    const sortedSales = [...sales].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  
    const requestSort = (key) => {
      let direction = 'ascending';
      if (sortConfig.key === key && sortConfig.direction === 'ascending') {
        direction = 'descending';
      }
      setSortConfig({ key, direction });
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(value);
      };
  
    return (
      <table className="sales-table">
        <thead>
          <tr>
            <th onClick={() => requestSort('weekEnding')}>Week Ending ↕</th>
            <th onClick={() => requestSort('retailSales')}>Retail Sales ↕</th>
            <th onClick={() => requestSort('wholesaleSales')}>Wholesale Sales ↕</th>
            <th onClick={() => requestSort('unitsSold')}>Units Sold ↕</th>
            <th onClick={() => requestSort('retailerMargin')}>Retailer Margin ↕</th>
          </tr>
        </thead>
        <tbody>
          {sortedSales.map((sale, index) => (
            <tr key={index}>
              <td>{sale.weekEnding}</td>
              <td>{formatCurrency(sale.retailSales)}</td>
              <td>{formatCurrency(sale.wholesaleSales)}</td>
              <td>{sale.unitsSold}</td>
              <td>{formatCurrency(sale.retailerMargin)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default SalesTable;