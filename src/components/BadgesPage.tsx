import React from 'react';
import { Award, Trophy } from 'lucide-react';
import { User, Course } from '../types';

interface BadgesPageProps {
  user: User;
  courses: Course[];
}

function BadgesPage({ user, courses }: BadgesPageProps) {
  if (!user.badges) {
    return (
      <div className="text-center py-12">
        <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">No Badges Yet</h2>
        <p className="text-gray-400">Complete courses to earn badges!</p>
      </div>
    );
  }

  const earnedBadges = courses.filter(course => user.badges.includes(course.id));
  const totalPoints = earnedBadges.reduce((sum, course) => sum + course.points, 0);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">Your Badges</h2>
        <div className="flex items-center gap-3 bg-yellow-500/10 px-4 py-2 rounded-xl">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="text-yellow-500 font-bold">{totalPoints} Points</span>
        </div>
      </div>

      {earnedBadges.length === 0 ? (
        <div className="text-center py-12">
          <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Badges Yet</h3>
          <p className="text-gray-400">Complete courses to earn badges!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {earnedBadges.map(course => (
            <div
              key={course.id}
              className="bg-gray-800 rounded-lg p-6 flex flex-col items-center relative overflow-hidden"
            >
              <div className="absolute top-3 right-3 flex items-center gap-1 bg-yellow-500/20 px-2 py-1 rounded-full">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="text-yellow-500 font-medium">{course.points}</span>
              </div>
              <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center mb-4">
                <Award className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white text-center mb-2">
                {course.title}
              </h3>
              <p className="text-gray-400 text-sm text-center">
                Completed {course.level} Course
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BadgesPage;