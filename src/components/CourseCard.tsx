import React from 'react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onEnroll: (courseId: string) => void;
}

export default function CourseCard({ course, onEnroll }: CourseCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105">
      <img src={course.image} alt={course.title} className="h-48 w-full object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h3>
        <p className="text-gray-600 mb-4">{course.description}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
            {course.level}
          </span>
        </div>
        <button
          onClick={() => onEnroll(course.id)}
          className={`w-full py-2 rounded-lg transition-colors duration-200 ${
            course.enrolled
              ? 'bg-green-100 text-green-700 cursor-default'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {course.enrolled ? 'Enrolled' : 'Enroll Now'}
        </button>
      </div>
    </div>
  );
}