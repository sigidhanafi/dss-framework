export default function Modal({ children, title, onCancel }) {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-6 rounded-md shadow-lg w-96'>
        {/* Modal Header */}
        <div className='flex justify-between items-center border-b pb-2 mb-4'>
          <h2 className='text-lg font-semibold'>{title}</h2>
          <button
            onClick={() => onCancel()}
            className='text-gray-500 hover:text-gray-700'
          >
            &times;
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
