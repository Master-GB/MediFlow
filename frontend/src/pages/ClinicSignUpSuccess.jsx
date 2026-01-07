// src/pages/ClinicSignupSuccess.jsx
import { useLocation } from 'react-router-dom';

const ClinicSignupSuccess = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email');

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800 rounded-xl p-8 text-center">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-4">Registration Successful!</h1>
        <p className="text-gray-300 mb-6">
          Thank you for registering your clinic. A verification email has been sent to:
        </p>
        <div className="bg-slate-700/50 rounded-lg p-3 mb-6">
          <span className="font-mono text-blue-300 break-all">{email}</span>
        </div>
        <p className="text-gray-400 text-sm mb-6">
          Please check your email and verify your account to get started.
        </p>
        <button
          onClick={() => window.location.href = "/login"}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default ClinicSignupSuccess;