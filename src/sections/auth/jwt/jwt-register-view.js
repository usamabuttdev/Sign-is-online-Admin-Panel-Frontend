import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------
// Public registration is disabled — only admins create users in the portal.
// ----------------------------------------------------------------------

export default function JwtRegisterView() {
  const [msg] = useState(
    'Public signup is disabled. Please contact an administrator to create your account.'
  );

  return (
    <Stack spacing={3}>
      <Typography variant="h4">Registration closed</Typography>
      <Alert severity="info">{msg}</Alert>
      <Link component={RouterLink} to={paths.auth.jwt.login} variant="body2" color="inherit">
        Back to login
      </Link>
    </Stack>
  );
}
