'use client';

import Modal from '@/components/modal';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();

  return (
    <>
      {/* Header / Title */}
      <div className='flex flex-col items-center justify-center min-h-20 mt-20'>
        <h1 className='text-3xl font-bold'>Login User</h1>
        <p>Login to process your DSS Topic</p>
      </div>

      <div className='w-1/5 mx-auto my-10'>
        {/* Login Form */}
        <form className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              type='email'
              className='w-full p-2 border rounded-md'
              placeholder='Enter your email'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <input
              type='password'
              className='w-full p-2 border rounded-md'
              placeholder='Enter your password'
            />
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500'
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
