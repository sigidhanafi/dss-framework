'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Modal from './modal';

export default function SettingCriteria({
  title,
  criteria,
  topicId,
  action,
  refetchTrigger,
}) {
  const router = useRouter();

  const [showFormCriteria, setShowFormCriteria] = useState(false);
  const [formCriteria, setFormCriteria] = useState({
    topicId: Number(topicId),
    criteriaId: null,
    name: '',
    description: '',
    type: '',
    weight: 0,
    parentCriteriaId: null,
  });

  const handleResetForm = () => {
    // reset form
    setFormCriteria({
      topicId: Number(topicId),
      name: '',
      description: '',
      type: '',
      weight: 0,
      parentCriteriaId: null,
      criteriaId: null,
    });
  };

  const handleSuccessCRUD = () => {
    // reset form
    handleResetForm();

    // dismiss form
    setShowFormCriteria(false);

    // refetch trigger
    refetchTrigger();
  };

  const handleCreateCriteria = async () => {
    const params = { ...formCriteria };
    const response = await fetch('/api/criterias', {
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

  const handleUpdateCriteria = async () => {
    const params = { ...formCriteria };
    const response = await fetch('/api/criterias/' + formCriteria.criteriaId, {
      method: 'PUT',
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

  const handleCreateSubCriteria = async () => {
    const params = { ...formCriteria };
    const response = await fetch('/api/criterias', {
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

  const renderCriteria = (data, level = 0, action) => {
    return data.map((crit, index) => {
      const spacerWidthClasses = [
        'w-0',
        'w-1/5',
        'w-2/5',
        'w-3/5',
        'w-4/5',
        'w-full',
      ];

      return (
        <React.Fragment key={index + level}>
          <tr key={index + level} className='bg-white text-gray-700'>
            <td className='border border-gray-300 flex-grow'>
              <div className='flex flex-row items-center'>
                <div
                  className={`flex bg-gray-300 h-1 ${spacerWidthClasses[level]}`}
                ></div>
                <p className='px-4'>{crit.name}</p>
              </div>
            </td>
            <td className='border border-gray-300 px-4 py-2 flex-grow-0'>
              {crit.description}
            </td>
            <td className='border border-gray-300 px-4 py-2 text-center'>
              {crit.type}
            </td>
            <td className='border border-gray-300 px-4 py-2 text-center'>
              {crit.weight}
            </td>
            {action != 'none' && (
              <td className='border border-gray-300'>
                <div className='flex px-4 py-2 text-center justify-between'>
                  {action == 'setting' && (
                    <>
                      {/* edit criteria */}
                      <button
                        className='text-blue-400 hover:text-blue-500'
                        onClick={() => {
                          setFormCriteria({
                            ...formCriteria,
                            name: crit.name,
                            description: crit.description,
                            type: crit.type,
                            weight: crit.weight,
                            parentCriteriaId: crit.parentCriteriaId || null,
                            criteriaId: crit.criteriaId,
                          });

                          setShowFormCriteria(true);
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
                      {/* add subcriteria */}
                      <button
                        className='text-blue-500 hover:text-blue-700'
                        onClick={() => {
                          setFormCriteria({
                            ...formCriteria,
                            parentCriteriaId: crit.criteriaId,
                          });

                          setShowFormCriteria(true);
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
                            d='M3.75 3a.75.75 0 0 1 .75.75v7.5h10.94l-1.97-1.97a.75.75 0 0 1 1.06-1.06l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 1 1-1.06-1.06l1.97-1.97H3.75A.75.75 0 0 1 3 12V3.75A.75.75 0 0 1 3.75 3Z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </button>
                    </>
                  )}

                  {action == 'process' && (
                    <label className='relative inline-flex items-center cursor-pointer'>
                      <input
                        type='checkbox'
                        checked={crit.selected}
                        onChange={() => {}}
                        className='sr-only peer'
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  )}
                </div>
              </td>
            )}
          </tr>
          {crit.subCriteria &&
            crit.subCriteria.length > 0 &&
            renderCriteria(crit.subCriteria, level + 1, action)}
        </React.Fragment>
      );
    });
  };

  return (
    <>
      {/* Topic Selection with Criteria Table */}
      <div className='py-8'>
        <div className='w-3/5 mx-auto'>
          <div className='flex justify-between my-2'>
            <h2 className='text-xl font-semibold mb-4'>{title}</h2>
            {action == 'setting' && (
              <div className='flex justify-end'>
                <button
                  className='flex border-blue-300 border text-blue-400 px-4 py-2 rounded-lg'
                  onClick={() => {
                    setShowFormCriteria(true);
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
                  <span className='mx-1'>New Criteria</span>
                </button>
              </div>
            )}
          </div>
          <div className='overflow-x-auto'>
            <table className='w-full border-collapse border border-gray-300'>
              <thead>
                <tr className='bg-gray-200'>
                  <th className='border border-gray-300 px-4 py-2'>
                    Nama Kriteria
                  </th>
                  <th className='border border-gray-300 px-4 py-2'>
                    Deskripsi
                  </th>
                  <th className='border border-gray-300 px-4 py-2'>
                    Tipe Kriteria
                  </th>
                  <th className='border border-gray-300 px-4 py-2'>
                    Bobot Kriteria
                  </th>
                  {action != 'none' && (
                    <th className='border border-gray-300 px-4 py-2'>Action</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {/* criteria */}
                {criteria &&
                  criteria.length > 0 &&
                  renderCriteria(criteria, 0, action)}

                {/* empty criteria */}
                {criteria && criteria.length <= 0 && (
                  <tr className='bg-white text-gray-700'>
                    <td
                      className='border border-gray-300 flex-grow text-center py-4'
                      colSpan={action != 'none' ? 5 : 4}
                    >
                      <p className='text-gray-500'>
                        No criteria available. Click "Manage".{' '}
                        <button
                          className='text-blue-400 py-2'
                          onClick={() => {
                            router.push('/topics/' + topicId + '/update');
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

          {action == 'process' && (
            <div className='flex justify-end space-x-4 my-4'>
              <button
                className='bg-gray-200 text-gray-500 px-4 py-2 rounded hover:bg-gray-300'
                onClick={() => {
                  router.back();
                }}
              >
                Back
              </button>
              <button
                className='bg-blue-400 text-white px-4 py-2 rounded'
                onClick={() => {
                  router.push('/proceses/2/review-alternative');
                }}
              >
                Review Alternatives
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Form to Add Criteria */}
      {showFormCriteria && (
        <Modal
          title={'Create New Criteria'}
          onCancel={() => {
            handleResetForm();
            setShowFormCriteria(false);
          }}
        >
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Criteria Name
              </label>
              <input
                name='name'
                className='border p-2 w-full rounded-md'
                placeholder='Enter name'
                defaultValue={formCriteria.name}
                onChange={(e) => {
                  setFormCriteria({
                    ...formCriteria,
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
                defaultValue={formCriteria.description}
                onChange={(e) => {
                  setFormCriteria({
                    ...formCriteria,
                    description: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Type
              </label>
              <select
                name='type'
                className='border p-2 w-full rounded-md'
                defaultValue={formCriteria.type}
                onChange={(e) => {
                  setFormCriteria({
                    ...formCriteria,
                    type: e.target.value,
                  });
                }}
                placeholder={'Select type'}
              >
                <option value='BENEFIT'>Benefit</option>
                <option value='COST'>Cost</option>
              </select>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Weight
              </label>
              <select
                name='weight'
                className='border p-2 w-full mb-2'
                defaultValue={formCriteria.weight}
                onChange={(e) => {
                  setFormCriteria({
                    ...formCriteria,
                    weight: Number(e.target.value),
                  });
                }}
                placeholder={'Weight'}
              >
                <option value='5'>1. Sangat Rendah</option>
                <option value='2'>2. Rendah</option>
                <option value='3'>3. Sedang</option>
                <option value='4'>4. Tinggi</option>
                <option value='5'>5. Sangat Tinggi</option>
              </select>
            </div>

            <button
              className='flex bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500'
              onClick={() => {
                if (
                  formCriteria.parentCriteriaId == null &&
                  formCriteria.criteriaId == null
                ) {
                  // create
                  handleCreateCriteria();
                } else if (formCriteria.criteriaId != null) {
                  // update
                  handleUpdateCriteria();
                } else if (formCriteria.parentCriteriaId != null) {
                  console.log('SUB', formCriteria.parentCriteriaId);
                  // add subcriteria
                  handleCreateSubCriteria();
                } else {
                  console.log('Not Handled');
                }
              }}
            >
              Save
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
