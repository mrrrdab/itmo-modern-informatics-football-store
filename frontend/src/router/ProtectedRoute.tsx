import { Navigate, useLocation } from 'react-router-dom';

import { APP_ROUTER } from '@/constants';
import { useGetUserPayloadQuery } from '@/hooks';

export const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const location = useLocation();

  const { data: userData } = useGetUserPayloadQuery();

  if (!userData) {
    return <Navigate to={APP_ROUTER.SIGN_IN} state={{ from: location }} replace />;
  }

  return children;
};
