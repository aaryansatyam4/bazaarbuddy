import React from 'react';
import { useParams } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { TrendingUp, TrendingDown, BarChart2 } from 'lucide-react';
import stockData from '../data/stocks.json';

const mockChartData = [
  { date: '2024-03-10', price: 2400 },
  { date: '2024-03-11', price: 2450 },
  { date: '2024-03-12', price: 2420 },
  { date: '2024-03-13', price: 2480 },
  { date: '2024-03-14', price: 2456 },
];

const StockDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const stock = stockData.stocks.find(s => s.id === Number(id));

  if (!stock) {
    return <div>Stock not found</div>;
  }

  const isBullish = stock.change >= 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{stock.name}</h1>
                <p className="text-gray-500 dark:text-gray-400">{stock.ticker}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{stock.price}</p>
                <p className={`text-sm font-semibold ${isBullish ? 'text-green-500' : 'text-red-500'}`}>
                  {isBullish ? '+' : ''}{stock.change}%
                </p>
              </div>
            </div>
            
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#6366f1"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Prediction Analysis
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Tomorrow's Predicted Price</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">₹{(stock.price * 1.02).toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Trend</p>
                <div className="flex items-center space-x-2">
                  {isBullish ? (
                    <>
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      <span className="font-medium text-green-500">Bullish</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="h-5 w-5 text-red-500" />
                      <span className="font-medium text-red-500">Bearish</span>
                    </>
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Confidence Score</p>
                <p className="text-xl font-bold text-indigo-600">89%</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Technical Indicators
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">7-Day Moving Average</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">₹{(stock.price * 0.98).toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">14-Day Moving Average</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">₹{(stock.price * 0.97).toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Volume</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{stock.volume.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetail;