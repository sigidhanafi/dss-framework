'use client';

export default function AlternativeInput({ alternatives, criteria }) {
  return (
    <>
      <div className='w-3/5 mx-auto'>
        <h2 className='text-xl font-semibold mb-4'>Alternative</h2>
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse border border-gray-300'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='border border-gray-300 px-4 py-2'>Name</th>
                <th className='border border-gray-300 px-4 py-2'>Deskripsi</th>

                <th className='border border-gray-300 px-4 py-2'>Action</th>
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
                      <td className='border border-gray-300 flex-grow'>
                        <p className='px-4'>{alternative.name}</p>
                      </td>
                      <td className='border border-gray-300 px-4 py-2 flex-grow-0'>
                        {alternative.desc}
                      </td>
                      <td className='border border-gray-300'>
                        <div className='flex px-4 py-2 text-center justify-center space-x-2'>
                          <button
                            className='text-blue-500 hover:text-blue-700'
                            onClick={() => {}}
                          >
                            edit
                          </button>
                          <button className='text-blue-500 hover:text-blue-700'>
                            delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
