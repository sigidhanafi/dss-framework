export default function ModelSelect() {
  return (
    <div className='flex flex-col rounded-md border mt-10 p-2'>
      <div className='flex flex-row w-full mt-2'>
        <fieldset>
          <legend className='text-sm/6 font-semibold text-gray-900'>
            Model
          </legend>
          <p className='mt-1 text-sm/6 text-gray-600'>Choose Model to used</p>
          <div className='mt-6 space-y-6'>
            <div className='flex items-center gap-x-3'>
              <input
                defaultChecked
                id='push-everything'
                name='push-notifications'
                type='radio'
                className='relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden'
              />
              <label
                htmlFor='push-everything'
                className='block text-sm/6 font-medium text-gray-900'
              >
                WP
              </label>
            </div>
            <div className='flex items-center gap-x-3'>
              <input
                id='push-email'
                name='push-notifications'
                type='radio'
                className='relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden'
              />
              <label
                htmlFor='push-email'
                className='block text-sm/6 font-medium text-gray-900'
              >
                SAW
              </label>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  );
}
