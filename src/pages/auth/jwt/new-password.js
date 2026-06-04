import { Helmet } from 'react-helmet-async';
// sections
import { JwtNewPasswordView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export default function ClassicNewPasswordPage() {
  return (
    <>
      <Helmet>
        <title> Auth Classic: New Password</title>
      </Helmet>

      <JwtNewPasswordView />
    </>
  );
}
