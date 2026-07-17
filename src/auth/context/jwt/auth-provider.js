import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from './auth-context';
import { isValidToken, setSession } from './utils';
import { logout as reduxLogout, selectUser } from 'src/store/slices/userSlice';

// ----------------------------------------------------------------------
// Auth is driven by Redux (user.token). This provider only syncs axios
// sessionStorage and exposes context for Minimal UI guards/layout.
// Public signup/register is disabled — admins create users in the portal.
// ----------------------------------------------------------------------

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    const token = user?.token;
    if (token && isValidToken(token)) {
      setSession(token);
    } else if (!token) {
      setSession(null);
    }
  }, [user?.token]);

  const logout = async () => {
    setSession(null);
    dispatch(reduxLogout());
  };

  const checkAuthenticated = user?.token ? 'authenticated' : 'unauthenticated';

  const memoizedValue = useMemo(
    () => ({
      user: user
        ? {
            ...user,
            accessToken: user.token,
            displayName: user.displayName || user.name || user.email,
          }
        : null,
      method: 'jwt',
      loading: false,
      authenticated: checkAuthenticated === 'authenticated',
      unauthenticated: checkAuthenticated === 'unauthenticated',
      login: async () => {
        throw new Error('Use the login form (RTK auth). AuthProvider.login is disabled.');
      },
      register: async () => {
        throw new Error('Public registration is disabled. An admin must create accounts.');
      },
      logout,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, checkAuthenticated]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
