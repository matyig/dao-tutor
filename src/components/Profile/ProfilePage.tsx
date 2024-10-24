import React, { useState } from 'react';
import { User, Mail, Wallet } from 'lucide-react';
import { User as UserType } from '../../types';
import ConnectButton from './ConnectButton';

interface ProfilePageProps {
  user: UserType;
  onUpdateUser: (user: UserType) => void;
}

export default function ProfilePage({ user, onUpdateUser }: ProfilePageProps) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onUpdateUser({ ...user, name, email });
    setIsEditing(false);
  };

  const toggleConnection = (provider: 'google' | 'discord' | 'wallet') => {
    const isConnected = user.authProvider === provider;
    if (isConnected) {
      onUpdateUser({ ...user, authProvider: 'email' });
    } else {
      onUpdateUser({ 
        ...user, 
        authProvider: provider,
        walletAddress: provider === 'wallet' ? '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' : undefined
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white">Profile Settings</h2>
        {isEditing ? (
          <div className="space-x-3">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
            >
              Save Changes
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Edit Profile
          </button>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditing}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-white/40 disabled:opacity-50"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditing}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-white/40 disabled:opacity-50"
            />
          </div>
        </div>

        <div className="pt-6 border-t border-white/10">
          <h3 className="text-lg font-medium text-white mb-4">Connected Accounts</h3>
          <div className="space-y-3">
            <ConnectButton
              provider="google"
              isConnected={user.authProvider === 'google'}
              onToggle={() => toggleConnection('google')}
              icon={<img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />}
            />
            <ConnectButton
              provider="discord"
              isConnected={user.authProvider === 'discord'}
              onToggle={() => toggleConnection('discord')}
              icon={<img src="https://discord.com/assets/favicon.ico" alt="Discord" className="w-5 h-5" />}
            />
            <ConnectButton
              provider="wallet"
              isConnected={user.authProvider === 'wallet'}
              onToggle={() => toggleConnection('wallet')}
              icon={<Wallet className="w-5 h-5" />}
            />
          </div>
        </div>

        <div className="pt-6 border-t border-white/10">
          <h3 className="text-lg font-medium text-white mb-4">Achievements</h3>
          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <User className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-white font-medium">Earned Badges</p>
                <p className="text-gray-400">{user.badges.length} badges collected</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}