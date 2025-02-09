'use client';

import InputSelect from './input-select';

export default function AlternativeInput({ alternatives, criteria }) {
  // const alternatives = [
  //   {
  //     name: 'A1',
  //     scoreCriteria: { C1: 70, C2: 50, C3: 80, C4: 60 },
  //   },
  //   {
  //     name: 'A2',
  //     scoreCriteria: { C1: 50, C2: 60, C3: 82, C4: 70 },
  //   },
  //   {
  //     name: 'A3',
  //     scoreCriteria: { C1: 85, C2: 55, C3: 80, C4: 75 },
  //   },
  //   {
  //     name: 'A4',
  //     scoreCriteria: { C1: 82, C2: 70, C3: 65, C4: 85 },
  //   },
  //   {
  //     name: 'A5',
  //     scoreCriteria: { C1: 75, C2: 75, C3: 85, C4: 74 },
  //   },
  //   {
  //     name: 'A6',
  //     scoreCriteria: { C1: 62, C2: 50, C3: 75, C4: 80 },
  //   },
  // ];

  // const criteria = [
  //   { name: 'C1', weight: 5, subCriteria: [] },
  //   { name: 'C2', weight: 3, subCriteria: [] },
  //   { name: 'C3', weight: 4, subCriteria: [] },
  //   { name: 'C4', weight: 2, subCriteria: [] },
  // ];

  console.log('ALTER', alternatives);

  if (alternatives && alternatives.length < 0) {
    return <></>;
  }

  return (
    <>
      <div className='flex flex-col rounded-md border mt-10 p-2'>
        <h5 className='text-md font-semibold text-gray-700 mb-2'>
          Alternative
        </h5>

        {alternatives.map((item) => {
          return (
            <div className='flex flex-row w-full mt-2' key={item.name}>
              <div className='w-1/2 mx-2'>
                <label
                  htmlFor='first-name'
                  className='block text-sm/6 font-medium text-gray-900'
                >
                  Alternative Name
                </label>
                <div className='mt-2'>
                  <input
                    id='first-name'
                    name='first-name'
                    type='text'
                    autoComplete='given-name'
                    className='block w-full rounded-md border bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                    defaultValue={item.name}
                  />
                </div>

                {criteria.map((criteriaItem) => {
                  const score = item.scoreCriteria[criteriaItem.name];
                  return (
                    <div
                      className='flex flex-col mt-2 p-2'
                      key={criteriaItem.name}
                    >
                      <div className='flex flex-row w-full mt-2'>
                        <div className='w-1/2 mx-2'>
                          <label
                            htmlFor='first-name'
                            className='block text-sm/6 font-medium text-gray-900'
                          >
                            Criteria
                          </label>
                          <div className='mt-2'>
                            <input
                              id='first-name'
                              name='first-name'
                              type='text'
                              autoComplete='given-name'
                              className='block w-full rounded-md border bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                              defaultValue={criteriaItem.name}
                            />
                          </div>
                        </div>

                        <div className='flex flex-row w-full mt-2'>
                          <div className='w-1/2 mx-2'>
                            <label
                              htmlFor='first-name'
                              className='block text-sm/6 font-medium text-gray-900'
                            >
                              Nilai
                            </label>
                            <div className='mt-2'>
                              <input
                                id='first-name'
                                name='first-name'
                                type='text'
                                autoComplete='given-name'
                                className='block w-full rounded-md border bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                                defaultValue={score}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
