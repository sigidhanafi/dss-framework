'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function AlternativeValue({
  criteria,
  alternatives,
  showAction = true,
}) {
  const [isShowFormCriteria, setIsShowFormCriteria] = useState(false);
  const router = useRouter();

  const renderCriteria = (criteria, level = 0, alternatives) => {
    return criteria.map((crit, index) => {
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
            {alternatives.map((alternative) => {
              return (
                <td
                  key={crit.name + alternative.name}
                  className='border border-gray-300 px-4 py-2 flex-grow-0 text-center'
                >
                  -
                </td>
              );
            })}
          </tr>
          {crit.subcriteria &&
            crit.subcriteria.length > 0 &&
            renderCriteria(crit.subcriteria, level + 1, alternatives)}
        </React.Fragment>
      );
    });
  };

  return (
    <>
      {/* Topic Selection with Criteria Table */}
      <div className='py-8'>
        <div className='w-3/5 mx-auto'>
          <h2 className='text-xl font-semibold mb-4'>Alternatives</h2>
          <div className='overflow-x-auto'>
            <table className='w-full border-collapse border border-gray-300'>
              <thead>
                <tr className='bg-gray-200'>
                  <th className='border border-gray-300 px-4 py-2'>Criteria</th>
                  {alternatives.map((item) => {
                    return (
                      <th
                        key={item.name}
                        className='border border-gray-300 px-4 py-2'
                      >
                        {item.name}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>{renderCriteria(criteria, 0, alternatives)}</tbody>
            </table>
          </div>
          {showAction && (
            <div className='flex justify-end space-x-4 my-4'>
              <button
                className='bg-gray-400 text-white px-4 py-2 rounded'
                onClick={() => {
                  // router.back();
                }}
              >
                Back
              </button>
              <button
                className='bg-blue-400 text-white px-4 py-2 rounded'
                onClick={() => {
                  // router.back();
                  router.push('/proceses/2/input-alternative');
                }}
              >
                Input Alternatives
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
