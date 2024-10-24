import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import Header from './components/Header';
import CourseCard from './components/CourseCard';
import CourseContent from './components/CourseContent';
import BadgesPage from './components/BadgesPage';
import ProfilePage from './components/Profile/ProfilePage';
import DAOPage from './components/DAOPage';
import { User, Course, Proposal } from './types';
import courseData from './data/courses.json';
import daoData from './data/dao.json';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('courses');
  const [courses, setCourses] = useState(courseData.courses);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [proposals, setProposals] = useState(daoData.proposals);

  const handleLogin = (email: string, password: string) => {
    setUser({
      id: '1',
      name: email.split('@')[0],
      email,
      badges: [],
      connections: {
        google: false,
        discord: false,
        wallet: false
      },
      votingPower: 0
    });
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('courses');
    setSelectedCourse(null);
  };

  const handleEnroll = (courseId: string) => {
    setCourses(prevCourses =>
      prevCourses.map(course =>
        course.id === courseId ? { ...course, enrolled: true } : course
      )
    );
  };

  const handleCourseComplete = () => {
    if (selectedCourse && user) {
      setCourses(prevCourses =>
        prevCourses.map(course =>
          course.id === selectedCourse.id ? { ...course, completed: true } : course
        )
      );
      setUser(prevUser => ({
        ...prevUser!,
        badges: [...prevUser!.badges, selectedCourse.id],
        votingPower: prevUser!.votingPower + selectedCourse.points
      }));
      setSelectedCourse(null);
    }
  };

  const handleVote = (proposalId: string, selectedOptions: number[]) => {
    if (!user) return;

    setProposals(prevProposals =>
      prevProposals.map(proposal =>
        proposal.id === proposalId
          ? {
              ...proposal,
              votes: {
                ...proposal.votes,
                [user.id]: selectedOptions,
              },
              votePower: {
                ...proposal.votePower,
                [user.id]: user.votingPower,
              },
            }
          : proposal
      )
    );
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header
        user={user}
        onLogout={handleLogout}
        onNavigate={setCurrentPage}
        currentPage={currentPage}
      />
      
      <main className="container mx-auto py-8 px-4">
        {currentPage === 'courses' && !selectedCourse && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                onEnroll={() => {
                  handleEnroll(course.id);
                  setSelectedCourse(course);
                }}
              />
            ))}
          </div>
        )}

        {currentPage === 'courses' && selectedCourse && (
          <CourseContent
            course={selectedCourse}
            onComplete={handleCourseComplete}
          />
        )}

        {currentPage === 'badges' && (
          <BadgesPage user={user} courses={courses} />
        )}

        {currentPage === 'profile' && (
          <ProfilePage user={user} onUpdateUser={setUser} />
        )}

        {currentPage === 'dao' && (
          <DAOPage
            proposals={proposals}
            user={user}
            onVote={handleVote}
          />
        )}
      </main>
    </div>
  );
}

export default App;