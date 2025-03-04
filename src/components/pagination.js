import Link from 'next/link';

export default function Pagination({ page, total }) {
  const renderLeftPagination = ({ page, total }) => {
    let element = [];
    if (page > 1) {
      element.push({ label: 'Prev', value: page - 1, isEnable: true });
    } else {
      element.push({ label: 'Prev', value: page - 1, isEnable: false });
    }

    for (let i = page - 3; i < page; i++) {
      if (i > 0) {
        element.push({ label: i, value: i });
      }
    }

    return (
      <>
        {element.map((item) => {
          if (item.isEnable == false) {
            return (
              <div key={item.label} className={'text-gray-500'}>
                {item.label}
              </div>
            );
          }

          return (
            <Link
              href={`/topics?page=${item.value}`}
              key={item.label}
              className={`${item.isEnable ? 'text-blue-500' : 'text-gray-500'}`}
            >
              {item.label}
            </Link>
          );
        })}
      </>
    );
  };

  const renderRightPagination = ({ page, total }) => {
    let element = [];

    for (let i = page + 1; i < page + 3; i++) {
      if (i <= total) {
        element.push({ label: i, value: i });
      }
    }

    if (page < total) {
      element.push({ label: 'Next', value: page + 1, isEnable: true });
    } else {
      element.push({ label: 'Next', value: page + 1, isEnable: false });
    }

    return (
      <>
        {element.map((item) => {
          if (item.isEnable == false) {
            return (
              <div key={item.label} className={'text-gray-500'}>
                {item.label}
              </div>
            );
          }

          return (
            <Link
              href={`/topics?page=${item.value}`}
              key={item.label}
              className={'text-blue-500'}
            >
              {item.label}
            </Link>
          );
        })}
      </>
    );
  };

  return (
    <div className='flex justify-center space-x-4 my-6'>
      {renderLeftPagination({ page, total })}
      <div>
        <Link href={`/topics?page=${page}`} className='text-blue-500'>
          {page}
        </Link>
      </div>
      {renderRightPagination({ page, total })}
    </div>
  );
}
