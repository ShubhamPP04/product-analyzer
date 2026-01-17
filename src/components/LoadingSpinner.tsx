import { memo } from 'react';

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-200 border-t-emerald-600"></div>
    </div>
  );
}

export default memo(LoadingSpinner);
