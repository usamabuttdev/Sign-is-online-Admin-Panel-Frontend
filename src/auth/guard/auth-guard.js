import PropTypes from 'prop-types';
import { useEffect, useCallback, useState } from 'react';
// routes
import { useRouter } from 'src/routes/hooks';
import { useMockedUser } from 'src/hooks/use-mocked-user';

// ----------------------------------------------------------------------

export default function AuthGuard({ children }) {
  const router = useRouter();
  const { user } = useMockedUser();
  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!user?.token) {
      router.replace('/login');
      setChecked(false);
    } else {
      setChecked(true);
    }
  }, [user?.token, router]);

  useEffect(() => {
    check();
  }, [check]);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}

AuthGuard.propTypes = {
  children: PropTypes.node,
};
