// src/pages/Dashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5000/api/interview';

// Helper function to get auth headers
const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

const Dashboard = () => {
  const [jobRole, setJobRole] = useState('');
  const [techStack, setTechStack] = useState('');
  const [interviewQuestions, setInterviewQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [aiFeedback, setAiFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionId, setSessionId] = useState(null); // To store the current interview session ID
  const [pastSessions, setPastSessions] = useState([]); // To store past interview sessions
  const [showPastSessions, setShowPastSessions] = useState(false); // Toggle for past sessions view

  const navigate = useNavigate();

  // Fetch past interview sessions on component mount
  useEffect(() => {
    fetchPastSessions();
  }, []);

  const fetchPastSessions = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/sessions`, getAuthHeaders());
      setPastSessions(response.data);
    } catch (err) {
      console.error('Error fetching past sessions:', err.response?.data?.message || err.message);
      setError('Failed to load past sessions.');
    }
  };

  // Handles starting a new interview session
  const startInterview = async () => {
    if (!jobRole.trim()) {
      setError("Please enter a job role.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setInterviewQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setAiFeedback(null);
    setSessionId(null); // Clear previous session ID

    try {
      const response = await axios.post(
        `${API_BASE_URL}/generate-questions`,
        { jobRole, techStack },
        getAuthHeaders()
      );
      setInterviewQuestions(response.data.questions);
      setSessionId(response.data.sessionId); // Store the new session ID
      setShowPastSessions(false); // Hide past sessions when starting new interview
    } catch (err) {
      console.error('Error generating questions:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Failed to generate questions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handles submitting the user's answer and getting AI feedback
  const submitAnswer = async () => {
    if (!userAnswer.trim()) {
      setError("Please type your answer before submitting.");
      return;
    }
    if (!sessionId) {
      setError("No active interview session. Please start a new interview.");
      return;
    }

    setIsLoading(true);
    setError(null);
    const currentQuestion = interviewQuestions[currentQuestionIndex];

    try {
      const response = await axios.post(
        `${API_BASE_URL}/submit-answer`,
        { sessionId, question: currentQuestion, userAnswer, jobRole }, // Pass jobRole for context
        getAuthHeaders()
      );
      setAiFeedback(response.data.aiFeedback);
      // After submitting and getting feedback, refresh past sessions to see the update
      fetchPastSessions();
    } catch (err) {
      console.error('Error submitting answer:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Failed to get feedback. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handles moving to the next question or completing the session
  const nextQuestion = async () => {
    if (!aiFeedback) {
      setError("Please submit your answer and get feedback before moving to the next question.");
      return;
    }

    // Check if it's the last question
    if (currentQuestionIndex === interviewQuestions.length - 1) {
      // Mark session as completed
      try {
        await axios.put(`${API_BASE_URL}/complete-session/${sessionId}`, {}, getAuthHeaders());
        console.log('Session completed successfully.');
      } catch (err) {
        console.error('Error completing session:', err.response?.data?.message || err.message);
        setError('Failed to mark session as completed.');
      }
      resetInterview(); // Reset for a new interview
    } else {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setUserAnswer('');
      setAiFeedback(null);
      setError(null);
    }
  };

  const resetInterview = () => {
    setJobRole('');
    setTechStack('');
    setInterviewQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setAiFeedback(null);
    setIsLoading(false);
    setError(null);
    setSessionId(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  // Icon components (using inline SVG)
  const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  );

  const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );

  const RefreshCwIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-cw">
      <path d="M21 12a9 9 0 0 0-9-9c-7.2 0-9 1.8-9 9s1.8 9 9 9h3"/>
      <path d="M17 22l4-4-4-4"/>
    </svg>
  );

  const HistoryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-history">
      <path d="M12 8V4H8"/><circle cx="12" cy="12" r="10"/>
    </svg>
  );

  // Loading Spinner component
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
    </div>
  );

  // Render logic for past sessions
  const renderPastSessions = () => (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-indigo-300 mb-4">Past Interview Sessions</h3>
      {pastSessions.length === 0 ? (
        <p className="text-gray-400">No past sessions found. Start an interview to see your history!</p>
      ) : (
        <ul className="space-y-4">
          {pastSessions.map((session) => (
            <li key={session._id} className="bg-gray-700 p-4 rounded-lg shadow-md border border-gray-600">
              <p className="text-lg font-semibold text-purple-300">
                Job Role: {session.jobRole} {session.techStack && `(${session.techStack})`}
              </p>
              <p className="text-gray-300 text-sm">
                Date: {new Date(session.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-300 text-sm">
                Status: {session.status === 'completed' ? 'Completed' : 'In Progress'}
              </p>
              <p className="text-gray-300 text-sm">
                Questions Answered: {session.questionsAndAnswers.length}
              </p>
              {session.status === 'completed' && (
                <p className="text-gray-300 text-sm">
                  Total Score: {session.totalScore.toFixed(2)}
                </p>
              )}
              {/* You can add more details or a 'View Details' button here */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-800 to-purple-900 text-white font-inter p-4 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-gray-800 rounded-xl shadow-2xl p-6 md:p-8 border border-gray-700 mt-8 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-300">
            AI Interview Coach
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="bg-red-600 text-white p-3 rounded-md mb-4 text-center">
            {error}
          </div>
        )}

        {/* New Interview / Input Section */}
        {!sessionId && (
          <div className="mb-8 p-4 bg-gray-700 rounded-lg">
            <h2 className="text-2xl font-bold text-purple-300 mb-4">Start a New Interview</h2>
            <input
              type="text"
              className="w-full p-3 rounded-md bg-gray-600 border border-gray-500 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
              placeholder="Enter Job Role (e.g., Software Engineer)"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              disabled={isLoading}
            />
            <input
              type="text"
              className="w-full p-3 rounded-md bg-gray-600 border border-gray-500 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
              placeholder="Enter Tech Stack (e.g., React, Node.js, Python) - Optional"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              disabled={isLoading}
            />
            <button
              onClick={startInterview}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 flex items-center justify-center"
              disabled={isLoading || !jobRole.trim()}
            >
              {isLoading ? <LoadingSpinner /> : (
                <>
                  <PlayIcon className="mr-2" /> Generate Questions & Start
                </>
              )}
            </button>
            <button
              onClick={() => setShowPastSessions(!showPastSessions)}
              className="w-full mt-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 flex items-center justify-center"
            >
              <HistoryIcon className="mr-2" /> {showPastSessions ? 'Hide Past Sessions' : 'View Past Sessions'}
            </button>
          </div>
        )}

        {/* Display Current Interview Session */}
        {sessionId && interviewQuestions.length > 0 && (
          <div className="interview-session p-4 bg-gray-700 rounded-lg">
            <p className="text-lg text-gray-300 mb-2">
              Job Role: <span className="font-semibold text-indigo-400">{jobRole}</span>
              {techStack && <span className="font-semibold text-purple-400 ml-2">({techStack})</span>}
            </p>
            <p className="text-xl font-semibold mb-4 text-purple-300">
              Question {currentQuestionIndex + 1} of {interviewQuestions.length}:
            </p>
            <div className="bg-gray-600 p-4 rounded-lg mb-6 text-gray-200">
              <p className="text-lg">{interviewQuestions[currentQuestionIndex]}</p>
            </div>

            {/* Voice Recording Placeholder */}
            <div className="bg-blue-800 text-white p-3 rounded-md mb-4 text-center">
                <p className="font-bold">Voice Recording Feature Placeholder:</p>
                <p className="text-sm">
                    To enable voice recording, you would integrate a Speech-to-Text (STT) service here.
                    The browser's `MediaRecorder` API can capture audio, which then needs to be sent
                    to an STT API (e.g., Google Cloud Speech-to-Text) for transcription into text.
                    Once transcribed, that text would populate the 'Your Answer' textarea below.
                </p>
            </div>

            <textarea
              className="w-full h-32 p-3 rounded-md bg-gray-600 border border-gray-500 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y mb-4"
              placeholder="Type your answer here..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={isLoading}
            ></textarea>

            <div className="flex justify-between items-center mb-6">
              <button
                onClick={submitAnswer}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 mr-2 flex items-center justify-center"
                disabled={isLoading || !userAnswer.trim() || aiFeedback !== null}
              >
                {isLoading ? <LoadingSpinner /> : (
                  <>
                    <CheckIcon className="mr-2" /> Get Feedback
                  </>
                )}
              </button>
              <button
                onClick={nextQuestion}
                className={`flex-1 ${aiFeedback ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-500 cursor-not-allowed'} text-white font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 ml-2 flex items-center justify-center`}
                disabled={!aiFeedback || isLoading}
              >
                {currentQuestionIndex === interviewQuestions.length - 1 ? (
                  <>
                    <RefreshCwIcon className="mr-2" /> Finish Interview
                  </>
                ) : (
                  <>
                    Next Question
                  </>
                )}
              </button>
            </div>

            {aiFeedback && (
              <div className="bg-gray-600 p-4 rounded-lg border border-purple-500">
                <h3 className="text-xl font-semibold mb-3 text-purple-300">AI Feedback:</h3>
                <p className="mb-2">
                  <span className="font-medium">Score:</span> <span className="text-yellow-400">{aiFeedback.score}/10</span>
                </p>
                <p className="mb-2">
                  <span className="font-medium">Strengths:</span> {aiFeedback.strengths}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Weaknesses:</span> {aiFeedback.weaknesses}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Improvements:</span> {aiFeedback.improvements}
                </p>
                <p className="mb-2">
                  <span className="font-medium">AI Suggested Answer:</span> {aiFeedback.aiSuggestedAnswer}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Past Sessions Display */}
        {showPastSessions && renderPastSessions()}

      </div>
    </div>
  );
};

export default Dashboard;
