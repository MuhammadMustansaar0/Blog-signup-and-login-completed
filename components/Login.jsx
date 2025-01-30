"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function Login() {
  const router = useRouter();
  const [error, setError] = useState(""); // State to track errors
  const [loading, setLoading] = useState(false); // Loading state to manage button state

  const login = async (values) => {
    setLoading(true); // Set loading to true when making request
    setError(""); // Reset error state before each attempt

    if (!values.email || !values.password) {
      setError("Please fill in both email and password."); // More friendly message
      setLoading(false);
      return; // Don't proceed if any field is empty
    }

    try {
      // Fetch POST request to the backend API
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        // If response is not ok, handle errors based on status code
        if (response.status === 400) {
          setError("Invalid email or password. Please check your credentials."); // Clear message
        } else {
          setError("Oops! Something went wrong. Please try again later.");
        }
        setLoading(false);
        return;
      }

      router.push("/blog"); // Redirect on success
    } catch (error) {
      console.error(error); // Log error for debugging
      setError("An error occurred while logging in. Please try again.");
      setLoading(false); // Set loading to false when done
    }
  };

  return (
    <div className='flex justify-center items-center h-screen shadow-inner'>
      <div className='w-6/12 mx-auto mt-10 p-6 bg-white rounded-lg shadow-md'>
        <h1 className='text-2xl font-semibold mb-6 text-black'>Login</h1>

        {/* Error Notification with Friendly Styles */}
        {error && (
          <div className="mb-4 p-4 text-red-500 bg-red-100 border border-red-500 rounded-md">
            <strong>Error:</strong> {error}
          </div>
        )}

        <form
          className='space-y-4'
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const values = Object.fromEntries(formData.entries());
            login(values);
          }}
        >
          <div>
            <label className='block text-sm font-medium text-black'>Email</label>
            <input
              type='email'
              name='email'
              required
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder='Enter your email'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-black'>Password</label>
            <input
              type='password'
              name='password'
              required
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder='Enter your password'
            />
          </div>

          <div>
            <button
              type='submit'
              disabled={loading} // Disable button when loading
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? 'bg-gray-400' : 'bg-indigo-600'} hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {loading ? "Logging In..." : "Login"} {/* Show loading state text */}
            </button>
          </div>

          <div className='flex items-center gap-3'>
            <label className='text-black'>Don't have an account?</label>
            <Link href={"/signup"} className='text-indigo-600 font-medium'>Register now</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
