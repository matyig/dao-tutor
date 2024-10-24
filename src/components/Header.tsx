import React from 'react';
import { BookOpen, Award, User, LogOut, Vote } from 'lucide-react';
import { User as UserType } from '../types';

interface HeaderProps {
  user: UserType | null;
  onLogout: () => void;
  onNavigate: (page: 'courses' | 'badges' | 'profile' | 'dao') => void;
  currentPage: string;
}

export default function Header({ user, onLogout, onNavigate, currentPage }: HeaderProps) {
  return (
    <header className="bg-gray-800/50 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-6 h-6 text-indigo-400" />
          <h1 className="text-xl font-semibold text-white">Blockchain Academy</h1>
        </div>
        <nav className="flex items-center space-x-6">
          <button
            onClick={() => onNavigate('courses')}
            className={`flex items-center space-x-2 transition-colors ${
              currentPage === 'courses' ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Courses</span>
          </button>
          
          <button
            onClick={() => onNavigate('badges')}
            className={`flex items-center space-x-2 transition-colors ${
              currentPage === 'badges' ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Badges</span>
          </button>

          <button
            onClick={() => onNavigate('dao')}
            className={`flex items-center space-x-2 transition-colors ${
              currentPage === 'dao' ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Vote className="w-4 h-4" />
            <span>DAO</span>
          </button>
          
          <button
            onClick={() => onNavigate('profile')}
            className={`flex items-center space-x-2 transition-colors ${
              currentPage === 'profile' ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span>{user?.name}</span>
          </button>
          
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </header>
  );
}