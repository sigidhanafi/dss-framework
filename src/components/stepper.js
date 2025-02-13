export default function Stepper({ step }) {
  return (
    <div className='w-3/5 mx-auto my-10 flex justify-between'>
      {[1, 2, 3, 4].map((num) => (
        <div
          key={num}
          className={`flex flex-col items-center ${
            step >= num ? 'text-blue-500' : 'text-gray-400'
          }`}
        >
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
              step >= num ? 'border-blue-500' : 'border-gray-400'
            }`}
          >
            {num}
          </div>
          <p className='mt-2 text-sm'>
            {num === 1
              ? 'Choose Topic & Setting Criteria'
              : num === 2
              ? 'Review the Alternatives'
              : num === 3
              ? 'Review Process & Select Method'
              : 'Ranking Result'}
          </p>
        </div>
      ))}
    </div>
  );
}
