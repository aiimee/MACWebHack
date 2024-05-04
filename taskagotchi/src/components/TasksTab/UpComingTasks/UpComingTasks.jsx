const UpComingTasks = () => {
  return (
    <>
      {/* UPCOMING TASKS */}
      <div className='bg-white shadow-md rounded-lg mt-4'>
        <div className='px-4 py-2 border-b border-gray-200'>
          <h4 className='text-lg font-semibold'>Upcoming Tasks</h4>
        </div>
        <div className='p-4'>
          <div className='mb-4'>
            <div className='flex justify-between items-center mb-1'>
              <span className='text-md font-medium'>some urgent task here</span>
              <span className='text-sm text-gray-600'>due date: 00/00</span>
            </div>
            <div className='text-right'>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>hard</button>
            </div>
          </div>
          <div className='mb-4'>
            <div className='flex justify-between items-center mb-1'>
              <span className='text-md font-medium'>some urgent task here</span>
              <span className='text-sm text-gray-600'>due date: 00/00</span>
            </div>
            <div className='text-right'>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>easy</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UpComingTasks;

