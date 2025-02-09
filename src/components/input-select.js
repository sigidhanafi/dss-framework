'use client';

const option = [
  {
    id: 5,
    name: 'Sangat Baik',
  },
  {
    id: 4,
    name: 'Baik',
  },
  {
    id: 3,
    name: 'Standar',
  },
  {
    id: 2,
    name: 'Kurang Baik',
  },
  {
    id: 1,
    name: 'Jelek',
  },
];

export default function InputSelect() {
  return (
    <div className='sm:col-span-3'>
      <label
        htmlFor='country'
        className='block text-sm/6 font-medium text-gray-900'
      >
        Nilai
      </label>
      <div className='mt-2 grid grid-cols-1'>
        <select
          id='country'
          name='country'
          autoComplete='country-name'
          className='col-start-1 row-start-1 w-full appearance-none rounded-md border bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
        >
          {option.map((item) => {
            return <option key={item.id}>{item.name}</option>;
          })}
        </select>
        {/* <ChevronDownIcon
          aria-hidden='true'
          className='pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4'
        /> */}
      </div>
    </div>
  );
}
