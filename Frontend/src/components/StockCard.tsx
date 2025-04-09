import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { clsx } from 'clsx';

interface StockCardProps {
  id: number;
  name: string;
  ticker: string;
  price: number;
  change: number;
  volume: number;
}

const StockCard: React.FC<StockCardProps> = ({ id, name, ticker, price, change, volume }) => {
  const isPositive = change >= 0;
  const [quantity, setQuantity] = React.useState(0);

  const handleBuy = (e: React.MouseEvent) => {
    e.preventDefault();
    if (quantity > 0) {
      alert(`Buy order placed for ${quantity} shares of ${ticker} at ₹${price}`);
      setQuantity(0);
    }
  };

  return (
    <Link to={`/stock/${id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-200">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{ticker}</p>
          </div>
          {isPositive ? (
            <TrendingUp className="h-5 w-5 text-green-500" />
          ) : (
            <TrendingDown className="h-5 w-5 text-red-500" />
          )}
        </div>
        <div className="mt-4">
          <div className="flex justify-between items-baseline">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              ₹{price.toLocaleString()}
            </span>
            <span
              className={clsx(
                'text-sm font-semibold',
                isPositive ? 'text-green-500' : 'text-red-500'
              )}
            >
              {isPositive ? '+' : ''}{change}%
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Vol: {volume.toLocaleString()}
          </p>
          
          <div className="mt-4 space-y-3" onClick={e => e.preventDefault()}>
            <div className="flex items-center space-x-2">
              <label htmlFor={`quantity-${id}`} className="text-sm text-gray-600 dark:text-gray-400">
                Quantity:
              </label>
              <input
                id={`quantity-${id}`}
                type="number"
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-20 px-2 py-1 text-sm border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <button
              onClick={handleBuy}
              className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              disabled={quantity === 0}
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StockCard;