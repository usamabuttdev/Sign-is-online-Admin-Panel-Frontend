import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
// routes
import { paths } from 'src/routes/paths';
import { useRouter, useSearchParams } from 'src/routes/hooks';
//
import { useAuthContext } from '../hooks';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

export default function GuestGuard({ children }) {
  const router = useRouter();

  const {user}=useSelector((state)=>state.user)

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo') || paths.dashboard.root;

  const { authenticated } = useAuthContext();
  const check = useCallback(() => {
    if (user?.token) {
      router.replace(returnTo);
    }
  }, [authenticated, returnTo, router]);

  useEffect(() => {
    check();
  }, [check]);

  return <>{children}</>;
}

GuestGuard.propTypes = {
  children: PropTypes.node,
};
