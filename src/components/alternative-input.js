'use client';

import { useState } from 'react';
import Modal from './modal';

export default function AlternativeInput({
  title,
  alternatives,
  criteria,
  action,
}) {
  const [showNewAlternative, setShowNewAlternative] = useState(false);

  return (
    <>
      <div className='w-3/5 mx-auto my-10'>
        <div className='flex justify-between my-2'>
          <h2 className='text-xl font-semibold mb-4'>{title}</h2>
          {(action == 'setting' || action == 'process') && (
            <div className='flex justify-end'>
              <button
                className='flex border-blue-300 border text-blue-400 px-4 py-2 rounded-lg'
                onClick={() => {
                  setShowNewAlternative(!showNewAlternative);
                }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='size-6'
                >
                  <path
                    fillRule='evenodd'
                    d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z'
                    clipRule='evenodd'
                  />
                </svg>
                <span className='mx-1'>Alternative</span>
              </button>
            </div>
          )}
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full border-collapse border border-gray-300'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='border border-gray-300 px-4 py-2'>Name</th>
                <th className='border border-gray-300 px-4 py-2'>Deskripsi</th>
                {action != 'none' && (
                  <th className='border border-gray-300 px-4 py-2'>Action</th>
                )}
              </tr>
            </thead>
            <tbody>
              {alternatives &&
                alternatives.map((alternative) => {
                  return (
                    <tr
                      key={alternative.name}
                      className='bg-white text-gray-700'
                    >
                      <td className='border border-gray-300 flex-grow px-4 py-2'>
                        <p className='px-4'>{alternative.name}</p>
                      </td>
                      <td className='border border-gray-300 px-4 py-2'>
                        {alternative.desc}
                      </td>
                      {action != 'none' && (
                        <td className='border border-gray-300'>
                          <div className='flex px-4 py-2 text-center justify-center space-x-4'>
                            {/* edit */}
                            <button
                              className='text-blue-400 hover:text-blue-500'
                              onClick={() => {
                                setShowNewAlternative(true);
                              }}
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                                className='size-5'
                              >
                                <path d='m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z' />
                                <path d='M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z' />
                              </svg>
                            </button>

                            {/* Delete */}
                            <button className='text-blue-400 hover:text-blue-500'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                                className='size-5'
                              >
                                <path
                                  fillRule='evenodd'
                                  d='M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z'
                                  clipRule='evenodd'
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {showNewAlternative && (
        <Modal
          title={'Create Alternative'}
          onCancel={() => {
            setShowNewAlternative(false);
          }}
        >
          {/* Form */}
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Alternative Name
              </label>
              <input
                type='text'
                className='w-full p-2 border rounded-md'
                placeholder='Enter alternative name'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Description
              </label>
              <textarea
                className='w-full p-2 border rounded-lg'
                placeholder='Enter alternative description'
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              onClick={() => {
                setShowNewAlternative(false);
              }}
              className='flex bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500'
            >
              Save
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
