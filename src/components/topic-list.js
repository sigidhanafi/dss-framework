'use client';

import Link from 'next/link';
import Modal from './modal';
import { useState } from 'react';
import { createTopic } from '@/app/topics/action';

export default function TopicList({ data: topics }) {
  const [formTopic, setFormTopic] = useState({ name: '', description: '' });
  const [formValidation, setFormValidation] = useState({ name: '' });
  const [showForm, setShowForm] = useState(false);

  const validateForm = () => {
    let name = '';
    if (formTopic.name.length <= 0) {
      name = 'Topic name is required';
    }

    setFormValidation({ ...formValidation, name });

    if (name.length > 0) {
      return false;
    }

    return true;
  };

  const handleCreateTopic = async () => {
    if (validateForm() == false) {
      return;
    }

    const params = { name: formTopic.name, description: formTopic.description };
    const status = await createTopic(params);
    if (status == 200) {
      setShowForm(false);
    } else {
      // show notif error
    }
  };

  return (
    <>
      <div className='w-11/12 md:w-4/5 lg:w-3/5 mx-auto text-center rounded-lg'>
        <div className='py-8 text-center'>
          <div className='mx-auto flex justify-end'>
            <button
              className='flex bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500'
              onClick={() => {
                setShowForm(true);
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
              <span className='mx-2'>New Topic</span>
            </button>
          </div>

          {topics && topics.length <= 0 && (
            <div className='mt-4 p-4 border-blue-200 border rounded-lg'>
              <p className='text-gray-500'>
                No topics available. Click New Topic to add one.{' '}
                <button
                  className='text-blue-400 py-2'
                  onClick={() => {
                    setShowForm(true);
                  }}
                >
                  <span className='mx-2'>New Topic</span>
                </button>
              </p>
            </div>
          )}

          {topics && topics.length > 0 && (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
              {topics.map((item) => {
                return (
                  <Link key={item.id} href={'/topics/' + item.id}>
                    <div className='border-blue-200 border p-4 rounded-lg'>
                      <p>{item.name}</p>
                      <span className='text-xs'>by {item.author}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Modal Form */}
      {showForm && (
        <Modal
          title={'Create New Topic'}
          onCancel={() => {
            setShowForm(false);
          }}
        >
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Topic Name
              </label>
              <input
                type='text'
                className='w-full p-2 border rounded-md'
                placeholder='Enter topic name'
                defaultValue={formTopic.name}
                onChange={(e) => {
                  if (e.target.value.length > 0) {
                    setFormValidation({ ...formValidation, name: '' });
                  }
                  setFormTopic({ ...formTopic, name: e.target.value });
                }}
              />
              <span className='text-sm text-red-500'>
                {formValidation.name}
              </span>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Description
              </label>
              <textarea
                className='w-full p-2 border rounded-lg'
                placeholder='Enter topic description'
                defaultValue={formTopic.description}
                onChange={(e) => {
                  setFormTopic({ ...formTopic, description: e.target.value });
                }}
              ></textarea>
            </div>

            <button
              onClick={() => {
                handleCreateTopic();
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
