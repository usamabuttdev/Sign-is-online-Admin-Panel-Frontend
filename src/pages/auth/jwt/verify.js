import { Helmet } from 'react-helmet-async';
// sections
import { JwtVerifyPasswordView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export default function ClassicVerifyPage() {
  return (
    <>
      <Helmet>
        <title> Auth Classic: Verify</title>
      </Helmet>

      <JwtVerifyPasswordView />
    </>
  );
}
