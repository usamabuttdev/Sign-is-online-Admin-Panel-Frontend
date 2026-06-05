import PropTypes from 'prop-types';
// @mui
import Button from '@mui/material/Button';
// routes
import { RouterLink } from 'src/routes/components';
// config
import { Box, useTheme } from '@mui/material';
import { PATH_AFTER_LOGIN } from 'src/config-global';
import { useMockedUser } from 'src/hooks/use-mocked-user';

// ----------------------------------------------------------------------

export default function LoginButton({ sx }) {
  const {user}= useMockedUser()
  return (
    <Button component={RouterLink} href={PATH_AFTER_LOGIN} variant="contained" color="primary" sx={{ mr: 1, ...sx }}>
     {user?.email ? "Dashboard" :"Login"} 
    </Button>
  );
}

export function LoginButtonSmall({ sx }) {
  const theme = useTheme();
  const {user}= useMockedUser()
  console.log("User from login button small", user)
  return (
    <Box sx={{ marginTop: 2, display: { md: "none", xs: "flex" }, alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 2 }}>

      <Button component={RouterLink} size='large' href={"/login"} variant="outlined" sx={{ width: "90%", px: 3, mr: 1, border: `2px solid ${theme.palette.primary.dark}`, ...sx }}>
       {user?.email ? "Dashboard" :"Login"} 
      </Button>
    </Box>
  );
}

LoginButton.propTypes = {
  sx: PropTypes.object,
};
