"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function Signup() {
  const router = useRouter();
  const [error, setError] = useState(""); // State to track error message
  const [success, setSuccess] = useState(""); // State to track success message
  const [loading, setLoading] = useState(false); // Loading state for the signup button

  const signup = async (values) => {
    setLoading(true); // Set loading state
    setError(""); // Reset any previous errors
    setSuccess(""); // Reset success state

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to sign up');
      }

      setSuccess("Signup successful! Redirecting to login..."); // Set success message
      setTimeout(() => {
        router.push("/login"); // Redirect to login after success
      }, 2000); // Wait for 2 seconds to show the success message

    } catch (error) {
      console.error(error);
      setError("Signup failed. Please try again."); // Set error message
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  return (
    <div className='flex justify-center items-center h-screen shadow-inner'>
      <div className='w-6/12 mx-auto mt-10 p-6 bg-white rounded-lg shadow-md'>
        <h1 className='text-2xl font-semibold mb-6 text-black'>Signup</h1>

        {/* Error Notification */}
        {error && (
          <div className="mb-4 p-4 text-red-500 bg-red-100 border border-red-500 rounded-md">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Success Notification */}
        {success && (
          <div className="mb-4 p-4 text-green-500 bg-green-100 border border-green-500 rounded-md">
            <strong>{success}</strong>
          </div>
        )}

        <form
          className='space-y-4'
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const values = Object.fromEntries(formData.entries());
            signup(values);
          }}
        >
          <div>
            <label className='block text-sm font-medium text-black'>Fullname</label>
            <input
              type='text'
              name='fullname'
              required
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black'
              placeholder='Enter your fullname'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-black'>Email</label>
            <input
              type='email'
              name='email'
              required
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black'
              placeholder='Enter your email'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-black'>Password</label>
            <input
              type='password'
              name='password'
              required
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black'
              placeholder='Enter your password'
            />
          </div>
          <div>
            <button
              type='submit'
              disabled={loading} // Disable button when loading
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              {loading ? "Signing Up..." : "Signup"} {/* Show loading text */}
            </button>
          </div>
          <div className='flex items-center gap-3'>
            <label className='text-black'>Already have an account?</label>
            <Link href={"/login"} className='text-blue-600 font-medium'>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
