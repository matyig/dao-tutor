import React, { useState } from 'react';
import { Vote, Calendar, Users, AlertCircle, Trophy } from 'lucide-react';
import { Proposal, User, Course } from '../types';

interface DAOPageProps {
  proposals: Proposal[];
  user: User;
  onVote: (proposalId: string, selectedOptions: number[]) => void;
}

export default function DAOPage({ proposals, user, onVote }: DAOPageProps) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number[]>>({});

  const handleVote = (proposalId: string) => {
    if (selectedOptions[proposalId]) {
      onVote(proposalId, selectedOptions[proposalId]);
      // Reset selection after voting
      setSelectedOptions(prev => {
        const newState = { ...prev };
        delete newState[proposalId];
        return newState;
      });
    }
  };

  const toggleOption = (proposalId: string, optionIndex: number) => {
    setSelectedOptions(prev => {
      const current = prev[proposalId] || [];
      const exists = current.includes(optionIndex);
      
      if (exists) {
        return {
          ...prev,
          [proposalId]: current.filter(idx => idx !== optionIndex)
        };
      } else {
        return {
          ...prev,
          [proposalId]: [...current, optionIndex]
        };
      }
    });
  };

  const getVoteCount = (proposalId: string, optionIndex: number) => {
    const proposal = proposals.find(p => p.id === proposalId);
    if (!proposal) return 0;
    
    return Object.entries(proposal.votes).reduce((total, [userId, votes]) => {
      const userVotePower = proposal.votePower[userId] || 0;
      return total + (votes.includes(optionIndex) ? userVotePower : 0);
    }, 0);
  };

  const getTotalVotePower = (proposalId: string) => {
    const proposal = proposals.find(p => p.id === proposalId);
    if (!proposal) return 0;
    
    return Object.values(proposal.votePower).reduce((sum, power) => sum + power, 0) || 1;
  };

  const hasVoted = (proposalId: string) => {
    const proposal = proposals.find(p => p.id === proposalId);
    return proposal ? !!proposal.votes[user.id] : false;
  };

  const getTimeLeft = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return `${days} days left`;
  };

  const getUserVotePower = (proposalId: string) => {
    const proposal = proposals.find(p => p.id === proposalId);
    return proposal?.votePower[user.id] || 0;
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Governance Portal</h2>
          <p className="text-gray-400">Shape the future of our platform</p>
        </div>
        <div className="flex items-center gap-3 bg-yellow-500/10 px-4 py-2 rounded-xl">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="text-yellow-500 font-bold">
            {user.votingPower} Points Voting Power
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {proposals.map(proposal => {
          const userVotePower = getUserVotePower(proposal.id);
          const totalVotePower = getTotalVotePower(proposal.id);

          return (
            <div
              key={proposal.id}
              className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-white/10"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {proposal.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{proposal.description}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 bg-indigo-500/10 px-3 py-1 rounded-full">
                    <Calendar className="w-4 h-4 text-indigo-400" />
                    <span className="text-indigo-400 text-sm">
                      {getTimeLeft(proposal.endDate)}
                    </span>
                  </div>
                  {!hasVoted(proposal.id) && (
                    <div className="flex items-center gap-2 bg-yellow-500/10 px-3 py-1 rounded-full">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      <span className="text-yellow-500 text-sm">
                        {userVotePower} Vote Power
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                {proposal.options.map((option, index) => {
                  const voteCount = getVoteCount(proposal.id, index);
                  const isSelected = selectedOptions[proposal.id]?.includes(index);
                  const percentage = (voteCount / totalVotePower) * 100;

                  return (
                    <div
                      key={index}
                      className={`relative ${
                        hasVoted(proposal.id) ? 'cursor-default' : 'cursor-pointer'
                      }`}
                      onClick={() => !hasVoted(proposal.id) && toggleOption(proposal.id, index)}
                    >
                      <div
                        className={`p-4 rounded-lg border ${
                          isSelected
                            ? 'border-indigo-500 bg-indigo-500/10'
                            : 'border-white/10 bg-white/5'
                        } relative z-10`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-white">{option}</span>
                          <div className="flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-yellow-500" />
                            <span className="text-gray-400">
                              {voteCount} power ({percentage.toFixed(1)}%)
                            </span>
                          </div>
                        </div>
                      </div>
                      {hasVoted(proposal.id) && (
                        <div
                          className="absolute inset-0 bg-indigo-500/5 rounded-lg"
                          style={{ width: `${percentage}%` }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {!hasVoted(proposal.id) && (
                <button
                  onClick={() => handleVote(proposal.id)}
                  disabled={!selectedOptions[proposal.id]?.length}
                  className="mt-4 w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cast Vote ({userVotePower} voting power)
                </button>
              )}

              <div className="mt-4 flex items-center gap-2 text-gray-400">
                <Users className="w-4 h-4" />
                <span>{Object.keys(proposal.votes).length} voters</span>
                <span className="mx-2">•</span>
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span>{totalVotePower} total voting power</span>
                {proposal.status === 'active' && (
                  <>
                    <span className="mx-2">•</span>
                    <AlertCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-400">Active</span>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}