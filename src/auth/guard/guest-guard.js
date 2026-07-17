import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { paths } from 'src/routes/paths';
import { useRouter, useSearchParams } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export default function GuestGuard({ children }) {
  const router = useRouter();
  const { user } = useSelector((state) => state.user);
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo') || paths.dashboard.root;

  const check = useCallback(() => {
    if (user?.token) {
      router.replace(returnTo);
    }
  }, [user?.token, returnTo, router]);

  useEffect(() => {
    check();
  }, [check]);

  return <>{children}</>;
}

GuestGuard.propTypes = {
  children: PropTypes.node,
};
