import React from 'react';
import { Bell, X } from 'lucide-react';
import { clsx } from 'clsx';

interface Alert {
  id: number;
  type: string;
  message: string;
  severity: string;
}

interface AlertBannerProps {
  alert: Alert;
  onDismiss: (id: number) => void;
}

const AlertBanner: React.FC<AlertBannerProps> = ({ alert, onDismiss }) => {
  return (
    <div
      className={clsx(
        'rounded-lg p-4 mb-4 flex items-center justify-between',
        {
          'bg-red-100 text-red-900': alert.severity === 'high',
          'bg-yellow-100 text-yellow-900': alert.severity === 'medium',
          'bg-blue-100 text-blue-900': alert.severity === 'low'
        }
      )}
    >
      <div className="flex items-center space-x-3">
        <Bell className="h-5 w-5" />
        <span>{alert.message}</span>
      </div>
      <button
        onClick={() => onDismiss(alert.id)}
        className="hover:bg-opacity-20 hover:bg-gray-900 rounded-full p-1"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default AlertBanner;