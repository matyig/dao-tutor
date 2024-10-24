import React, { useState } from 'react';
import { CheckCircle, XCircle, Award, ArrowLeft } from 'lucide-react';
import { Module, Question } from '../types';

interface CourseContentProps {
  course: {
    lessons: {
      id: string;
      title: string;
      content: string;
    }[];
    questions: Question[];
  };
  onComplete: () => void;
}

export default function CourseContent({ course, onComplete }: CourseContentProps) {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [showTest, setShowTest] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleTestSubmit = () => {
    const totalScore = course.questions.reduce((acc, q, idx) => {
      return acc + (answers[idx] === q.correctAnswer ? 1 : 0);
    }, 0);
    
    setScore(totalScore);
    const passed = (totalScore / course.questions.length) >= 0.7;
    setTestSubmitted(true);
    
    if (passed) {
      onComplete();
    }
  };

  const handleBackToLessons = () => {
    setShowTest(false);
    setTestSubmitted(false);
    setAnswers([]);
    setScore(0);
  };

  if (showTest) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="flex items-center mb-6">
          <button
            onClick={handleBackToLessons}
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Lessons
          </button>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Final Test</h2>
          {testSubmitted && (
            <div className="mb-6 p-4 rounded-lg bg-white/5">
              <p className="text-lg text-white mb-2">
                Your Score: {score} out of {course.questions.length}
                {' '}({((score / course.questions.length) * 100).toFixed(0)}%)
              </p>
              <p className="text-gray-300">
                {score / course.questions.length >= 0.7 
                  ? 'Congratulations! You passed the test!' 
                  : 'Keep learning and try again!'}
              </p>
            </div>
          )}
        </div>

        {course.questions.map((q, idx) => (
          <div key={q.id} className="mb-8 bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">{q.question}</h3>
            <div className="space-y-3">
              {q.options.map((option, optIdx) => {
                const isSelected = answers[idx] === optIdx;
                const isCorrect = optIdx === q.correctAnswer;
                const showResult = testSubmitted && (isSelected || isCorrect);

                return (
                  <label 
                    key={optIdx} 
                    className={`flex items-center space-x-3 p-4 rounded-lg transition-colors ${
                      testSubmitted
                        ? isCorrect
                          ? 'bg-green-500/10 border border-green-500/20'
                          : isSelected && !isCorrect
                          ? 'bg-red-500/10 border border-red-500/20'
                          : 'bg-white/5 border border-white/10'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${idx}`}
                      checked={isSelected}
                      onChange={() => {
                        if (!testSubmitted) {
                          const newAnswers = [...answers];
                          newAnswers[idx] = optIdx;
                          setAnswers(newAnswers);
                        }
                      }}
                      className="h-4 w-4 text-indigo-600"
                      disabled={testSubmitted}
                    />
                    <span className="text-white flex-grow">{option}</span>
                    {showResult && (
                      isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )
                    )}
                  </label>
                );
              })}
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center">
          <button
            onClick={handleBackToLessons}
            className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Cancel Test
          </button>
          
          {!testSubmitted ? (
            <button
              onClick={handleTestSubmit}
              disabled={answers.length !== course.questions.length}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Test
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              {score / course.questions.length >= 0.7 ? (
                <div className="flex items-center space-x-2 text-yellow-500">
                  <Award className="w-6 h-6" />
                  <span>Badge Earned!</span>
                </div>
              ) : (
                <button
                  onClick={handleBackToLessons}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Try Again
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">Course Content</h2>
        <div className="text-sm text-gray-400">
          Lesson {currentLesson + 1} of {course.lessons.length}
        </div>
      </div>
      
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-6 border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-4">{course.lessons[currentLesson].title}</h3>
        <p className="text-gray-300 leading-relaxed mb-6">{course.lessons[currentLesson].content}</p>
        
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentLesson(m => Math.max(0, m - 1))}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
            disabled={currentLesson === 0}
          >
            Previous
          </button>
          
          {currentLesson === course.lessons.length - 1 ? (
            <button
              onClick={() => setShowTest(true)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Take Test
            </button>
          ) : (
            <button
              onClick={() => setCurrentLesson(m => Math.min(course.lessons.length - 1, m + 1))}
              className="px-4 py-2 text-indigo-600 hover:text-white transition-colors"
            >
              Next
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-2 justify-center">
        {course.lessons.map((_, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 rounded-full ${
              idx === currentLesson ? 'bg-indigo-600' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}