import React from 'react';
import { Wallet } from 'lucide-react';
import { clsx } from 'clsx';

interface PortfolioCardProps {
  stockName: string;
  quantity: number;
  buyPrice: number;
  currentValue: number;
  profitLoss: number;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  stockName,
  quantity,
  buyPrice,
  currentValue,
  profitLoss
}) => {
  const isProfit = profitLoss >= 0;
  const [sellQuantity, setSellQuantity] = React.useState(0);

  const handleSell = () => {
    if (sellQuantity > 0 && sellQuantity <= quantity) {
      alert(`Sell order placed for ${sellQuantity} shares of ${stockName}`);
      setSellQuantity(0);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{stockName}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Quantity: {quantity}</p>
        </div>
        <Wallet className="h-5 w-5 text-indigo-500" />
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Buy Price:</span>
          <span className="font-medium text-gray-900 dark:text-white">₹{buyPrice.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Current Value:</span>
          <span className="font-medium text-gray-900 dark:text-white">₹{currentValue.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">P/L:</span>
          <span
            className={clsx(
              'font-medium',
              isProfit ? 'text-green-500' : 'text-red-500'
            )}
          >
            {isProfit ? '+' : ''}₹{Math.abs(profitLoss).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-600 dark:text-gray-400">
            Sell Quantity:
          </label>
          <input
            type="number"
            min="0"
            max={quantity}
            value={sellQuantity}
            onChange={(e) => setSellQuantity(Math.min(quantity, Math.max(0, parseInt(e.target.value) || 0)))}
            className="w-20 px-2 py-1 text-sm border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <button
          onClick={handleSell}
          disabled={sellQuantity === 0 || sellQuantity > quantity}
          className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
        >
          Sell
        </button>
      </div>
    </div>
  );
};

export default PortfolioCard;