'use client';

import Modal from '@/components/modal';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async () => {};

  return (
    <>
      {/* Header / Title */}
      <div className='flex flex-col items-center justify-center min-h-20 mt-20'>
        <h1 className='text-3xl font-bold'>Login User</h1>
        <p>Login to process your DSS Topic</p>
      </div>

      <div className='w-11/12 md:w-4/5 lg:w-3/5 mx-auto my-10'>
        {/* Login Form */}
        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Username
            </label>
            <input
              type='text'
              className='w-full p-2 border rounded-md'
              placeholder='Enter username'
              defaultValue={''}
              onChange={(e) => {
                setFormTopic({ ...formTopic, name: e.target.value });
              }}
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <input
              type='text'
              className='w-full p-2 border rounded-md'
              placeholder='Enter password'
              defaultValue={''}
              onChange={(e) => {
                setFormTopic({ ...formTopic, name: e.target.value });
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={() => {
              handleLogin();
            }}
            className='flex bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500'
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}
