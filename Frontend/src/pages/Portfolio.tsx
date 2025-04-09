import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import PortfolioCard from '../components/PortfolioCard';
import stockData from '../data/stocks.json';

// Mock data for portfolio performance
const portfolioPerformanceData = [
  { date: '2024-01', value: 100000 },
  { date: '2024-02', value: 105000 },
  { date: '2024-03', value: 102000 },
  { date: '2024-04', value: 108000 },
  { date: '2024-05', value: 115000 },
  { date: '2024-06', value: 112000 },
];

const Portfolio: React.FC = () => {
  const portfolioWithStockDetails = stockData.portfolio.map(item => {
    const stock = stockData.stocks.find(s => s.id === item.stockId);
    return {
      ...item,
      stockName: stock?.name || 'Unknown Stock'
    };
  });

  const totalValue = portfolioWithStockDetails.reduce((sum, item) => sum + item.currentValue, 0);
  const totalProfitLoss = portfolioWithStockDetails.reduce((sum, item) => sum + item.profitLoss, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Portfolio Summary</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Value</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              ₹{totalValue.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total P/L</p>
            <p className={`text-2xl font-bold ${totalProfitLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {totalProfitLoss >= 0 ? '+' : ''}₹{Math.abs(totalProfitLoss).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="h-[300px] mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Portfolio Performance</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={portfolioPerformanceData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#6366f1"
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioWithStockDetails.map(item => (
          <PortfolioCard
            key={item.id}
            stockName={item.stockName}
            quantity={item.quantity}
            buyPrice={item.buyPrice}
            currentValue={item.currentValue}
            profitLoss={item.profitLoss}
          />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;