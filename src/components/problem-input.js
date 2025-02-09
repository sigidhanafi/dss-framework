'use client';

const option = [
  {
    id: 1,
    name: 'Sangat Baik',
  },
  {
    id: 2,
    name: 'Baik',
  },
  {
    id: 3,
    name: 'Standar',
  },
  {
    id: 4,
    name: 'Kurang Baik',
  },
];

export default function ProblemInput() {
  return (
    <div className='col-span-full'>
      <label
        htmlFor='problem'
        className='block text-sm/6 font-medium text-gray-900'
      >
        Tell us about the DSS problem
      </label>
      <div className='mt-2'>
        <textarea
          id='problem'
          name='problem'
          rows={3}
          className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 border placeholder:text-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
          defaultValue={'Problem DSS yang di sheet untuk quiz kelas sebelumnya'}
        />
      </div>
      <p className='mt-3 text-sm/6 text-gray-600'>
        Write a few sentences about your DSS problem.
      </p>
    </div>
  );
}
