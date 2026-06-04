import PropTypes from 'prop-types';
import { useEffect, useCallback, useState } from 'react';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useSelector } from 'react-redux';

//
import { useAuthContext } from '../hooks';
import { useMockedUser } from 'src/hooks/use-mocked-user';


// ----------------------------------------------------------------------

const loginPaths = {
  jwt: paths.auth.jwt.login,
  auth0: paths.auth.auth0.login,
  amplify: paths.auth.amplify.login,
  firebase: paths.auth.firebase.login,
};

// ----------------------------------------------------------------------

export default function AuthGuard({ children }) {
  const router = useRouter();
  const {user}=useMockedUser(); 
  const {method } = useAuthContext();
  const [checked, setChecked] = useState(false);
  const check = useCallback(() => {
    if (!user?.token) {
      router.replace('/');
    } else {
      setChecked(true);
    }
  }, [user, method, router]);


  useEffect(() => {
    check();
  }, []);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}

AuthGuard.propTypes = {
  children: PropTypes.node,
};
