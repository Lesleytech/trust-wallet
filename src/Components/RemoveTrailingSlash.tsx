import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RemoveTrailingSlash: FC = () => {
  const location = useLocation();

  if (location.pathname.match('/.*/$')) {
    return (
      <Navigate
        replace
        to={{
          pathname: location.pathname.replace(/\/+$/, ''),
          search: location.search,
        }}
      />
    );
  } else return null;
};

export { RemoveTrailingSlash };
