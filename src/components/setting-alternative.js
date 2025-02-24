'use client';

import { useState } from 'react';
import Modal from './modal';
import { useParams, useRouter } from 'next/navigation';

export default function SettingAlternative({
  title,
  alternatives,
  dssAlternatives,
  topicId,
  action,
  refetchTrigger,
}) {
  const route = useRouter();
  const { dssID } = useParams();

  const [showFormAlternative, setShowFormAlternative] = useState(false);
  const [formAlternative, setFormAlternative] = useState({
    name: '',
    description: '',
    alternativeId: null,
    topicId: Number(topicId),
  });

  const handleResetForm = () => {
    // reset form
    setFormAlternative({
      ...formAlternative,
      name: '',
      description: '',
      alternativeId: null,
    });
  };

  const handleSuccessCRUD = () => {
    // reset form
    handleResetForm();

    // dismiss form
    setShowFormAlternative(false);

    // refetch trigger
    refetchTrigger();
  };

  const handleCreateAlternative = async () => {
    const params = { ...formAlternative };
    const response = await fetch('/api/alternatives', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    const responseJson = await response.json();

    if (responseJson.status == 200) {
      handleSuccessCRUD();
    } else {
      // show notif error
    }
  };

  const handleUpdateAlternative = async () => {
    const params = { ...formAlternative };
    console.log('PATAM', params);
    const response = await fetch(
      '/api/alternatives/' + formAlternative.alternativeId,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      }
    );

    const responseJson = await response.json();

    if (responseJson.status == 200) {
      handleSuccessCRUD();
    } else {
      // show notif error
    }
  };

  const handleDeleteAlternative = async (alternativeId) => {
    const response = await fetch('/api/alternatives/' + alternativeId, {
      method: 'DELETE',
    });

    const responseJson = await response.json();

    if (responseJson.status == 200) {
      handleSuccessCRUD();
    } else {
      // show notif error
    }
  };

  const handleSelectAlternative = async (alternativeId) => {
    const params = { alternativeId };
    const response = await fetch('/api/dss/' + dssID + '/alternatives', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    const responseJson = await response.json();
  };

  const handleRemoveAlternative = async (alternativeId) => {
    const params = { alternativeId };
    const response = await fetch('/api/dss/' + dssID + '/alternatives', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    const responseJson = await response.json();
  };

  return (
    <>
      <div className='w-11/12 md:w-4/5 lg:w-3/5 mx-auto my-10'>
        <div className='flex justify-between my-2'>
          <h2 className='text-xl font-semibold mb-4'>{title}</h2>
          {action == 'setting' && (
            <div className='flex justify-end'>
              <button
                className='flex border-blue-300 border text-blue-400 px-4 py-2 rounded-lg'
                onClick={() => {
                  setShowFormAlternative(true);
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
              {/* alternative */}
              {alternatives &&
                alternatives.length > 0 &&
                alternatives.map((alternative) => {
                  const defaultChecked =
                    dssAlternatives &&
                    dssAlternatives.includes(alternative.alternativeId);
                  return (
                    <tr
                      key={alternative.name}
                      className='bg-white text-gray-700'
                    >
                      <td className='border border-gray-300 flex-grow px-4 py-2'>
                        <p className='px-4'>{alternative.name}</p>
                      </td>
                      <td className='border border-gray-300 px-4 py-2'>
                        {alternative.description}
                      </td>
                      {action == 'setting' && (
                        <td className='border border-gray-300'>
                          <div className='flex px-4 py-2 text-center justify-center space-x-4'>
                            {/* edit alternative */}
                            <button
                              className='text-blue-400 hover:text-blue-500'
                              onClick={() => {
                                setFormAlternative({
                                  ...formAlternative,
                                  name: alternative.name,
                                  description: alternative.description,
                                  alternativeId: alternative.alternativeId,
                                });
                                setShowFormAlternative(true);
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
                            <button
                              className='text-blue-400 hover:text-blue-500'
                              onClick={() => {
                                handleDeleteAlternative(
                                  alternative.alternativeId
                                );
                              }}
                            >
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

                      {action == 'process' && (
                        <td className='border border-gray-300'>
                          <div className='flex px-4 py-2 text-center justify-center space-x-4'>
                            <label className='relative inline-flex items-center cursor-pointer'>
                              <input
                                type='checkbox'
                                defaultChecked={defaultChecked}
                                onChange={(e) => {
                                  if (e.target.checked == true) {
                                    handleSelectAlternative(
                                      Number(alternative.alternativeId)
                                    );
                                  } else {
                                    handleRemoveAlternative(
                                      Number(alternative.alternativeId)
                                    );
                                  }
                                }}
                                className='sr-only peer'
                              />
                              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}

              {/* empty criteria */}
              {alternatives && alternatives.length <= 0 && (
                <tr className='bg-white text-gray-700'>
                  <td
                    className='border border-gray-300 flex-grow text-center py-4'
                    colSpan={action != 'none' ? 3 : 2}
                  >
                    <p className='text-gray-500'>
                      No alternative available. Click Manage.{' '}
                      <button
                        className='text-blue-400 py-2'
                        onClick={() => {
                          route.push('/topics/' + topicId + '/update');
                        }}
                      >
                        <span className='mx-2'>Manage</span>
                      </button>
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {showFormAlternative && (
        <Modal
          title={'Create Alternative'}
          onCancel={() => {
            setShowFormAlternative(false);
          }}
        >
          {/* Form */}
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Alternative Name
              </label>
              <input
                name='name'
                className='border p-2 w-full rounded-md'
                placeholder='Enter name'
                defaultValue={formAlternative.name}
                onChange={(e) => {
                  setFormAlternative({
                    ...formAlternative,
                    name: e.target.value,
                  });
                }}
                autoComplete='off'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Description
              </label>
              <textarea
                name='description'
                className='w-full p-2 border rounded-lg'
                placeholder='Enter description'
                defaultValue={formAlternative.description}
                onChange={(e) => {
                  setFormAlternative({
                    ...formAlternative,
                    description: e.target.value,
                  });
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={() => {
                if (formAlternative.alternativeId == null) {
                  handleCreateAlternative();
                } else if (!isNaN(formAlternative.alternativeId)) {
                  handleUpdateAlternative();
                }
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
