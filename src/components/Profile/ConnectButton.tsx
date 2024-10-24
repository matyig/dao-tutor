import React from 'react';
import { Check, X } from 'lucide-react';

interface ConnectButtonProps {
  provider: 'google' | 'discord' | 'wallet';
  isConnected: boolean;
  onToggle: () => void;
  icon: React.ReactNode;
}

export default function ConnectButton({ provider, isConnected, onToggle, icon }: ConnectButtonProps) {
  const getProviderColor = () => {
    switch (provider) {
      case 'google':
        return 'from-red-500 to-red-600';
      case 'discord':
        return 'from-indigo-500 to-indigo-600';
      case 'wallet':
        return 'from-orange-500 to-amber-500';
    }
  };

  return (
    <button
      onClick={onToggle}
      className={`flex items-center justify-between w-full px-4 py-3 rounded-xl bg-gradient-to-r ${getProviderColor()} text-white hover:opacity-90 transition-opacity`}
    >
      <div className="flex items-center space-x-3">
        {icon}
        <span className="font-medium capitalize">{provider}</span>
      </div>
      {isConnected ? (
        <div className="flex items-center space-x-2">
          <Check className="w-4 h-4" />
          <span>Connected</span>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <X className="w-4 h-4" />
          <span>Not Connected</span>
        </div>
      )}
    </button>
  );
}