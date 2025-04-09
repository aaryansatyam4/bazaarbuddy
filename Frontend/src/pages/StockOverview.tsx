import React from 'react';
import StockCard from '../components/StockCard';
import AlertBanner from '../components/AlertBanner';
import stockData from '../data/stocks.json';

const StockOverview: React.FC = () => {
  const [alerts, setAlerts] = React.useState(stockData.alerts);

  const dismissAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        {alerts.map(alert => (
          <AlertBanner
            key={alert.id}
            alert={alert}
            onDismiss={dismissAlert}
          />
        ))}
      </div>
      
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Market Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stockData.stocks.map(stock => (
          <StockCard
            key={stock.id}
            id={stock.id}
            name={stock.name}
            ticker={stock.ticker}
            price={stock.price}
            change={stock.change}
            volume={stock.volume}
          />
        ))}
      </div>
    </div>
  );
};

export default StockOverview;