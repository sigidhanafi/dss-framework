'use client';

export default function CriteriaInput() {
  const criteria = [
    { name: 'C1', weight: 5, subCriteria: [] },
    { name: 'C2', weight: 3, subCriteria: [] },
    { name: 'C3', weight: 4, subCriteria: [] },
    { name: 'C4', weight: 2, subCriteria: [] },
  ];

  return (
    <>
      <div className='flex flex-col rounded-md border mt-10 p-2'>
        <h5 className='text-md font-semibold text-gray-700 mb-2'>
          Criteria Information
        </h5>

        {criteria.map((item) => {
          return (
            <div className='flex flex-row w-full mt-2' key={item.name}>
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
                    defaultValue={item.name}
                  />
                </div>
              </div>

              <div className='w-1/2 mx-2'>
                <label
                  htmlFor='last-name'
                  className='block text-sm/6 font-medium text-gray-900'
                >
                  Weight
                </label>
                <div className='mt-2'>
                  <input
                    id='last-name'
                    name='last-name'
                    type='text'
                    autoComplete='family-name'
                    className='block w-full rounded-md border bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                    defaultValue={item.weight}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
