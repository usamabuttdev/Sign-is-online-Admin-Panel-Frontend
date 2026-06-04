import { Helmet } from 'react-helmet-async';
// sections
import { JwtForgotPasswordView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export default function ClassicForgotPasswordPage() {
  return (
    <>
      <Helmet>
        <title> Auth Classic: Forgot Password</title>
      </Helmet>

      <JwtForgotPasswordView />
    </>
  );
}
