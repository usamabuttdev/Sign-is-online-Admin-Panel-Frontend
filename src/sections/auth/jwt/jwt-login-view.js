import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { FormControlLabel, Radio } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { Controller } from 'react-hook-form';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';

// routes
import { paths } from 'src/routes/paths';

import { RouterLink } from 'src/routes/components';
import { useSearchParams, useRouter } from 'src/routes/hooks';
// config
import {
  PATH_AFTER_LOGIN,
  PATH_AFTER_SUPERADMIN_LOGIN,
  PATH_AFTER_ADMIN_LOGIN,
  FORGOT_PASSWORD,
} from 'src/config-global';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// auth
import { useAuthContext } from 'src/auth/hooks';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useLoginMutation } from '../../../store/Reducer/auth';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../store/slices/userSlice';
import { enqueueSnackbar } from 'notistack';

// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const dispatch = useDispatch();

  const [loginData] = useLoginMutation();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  // console.log( process.env.REACT_APP_LOGIN_TOKEN  ,' process.env.REACT_APP_LOGIN_TOKEN ')

  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const goTo = (role) => {
    switch (role) {
      case 'Employee':
        router.push(PATH_AFTER_LOGIN);
        break;
      case 'Admin':
        router.push(PATH_AFTER_ADMIN_LOGIN);
        break;
      case 'SuperAdmin':
        router.push(PATH_AFTER_SUPERADMIN_LOGIN);
        break;
      default:
        router.push(PATH_AFTER_LOGIN);
        break;
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const user_data = {
        email: data.email,
        password: data.password,
        deviceType: 'android',
        timezone: 'Asia/Karachi',
        deviceId: '123',
        userType: 'admin',
        token:'1234567890',
      };
      // const response = await loginData(user_data).unwrap();

      // if (!response.error) {
        // enqueueSnackbar(response?.message || 'Login successfully', { variant: 'success' });
        // dispatch(setUser(response?.data));
        dispatch(setUser(user_data));
        router.push(PATH_AFTER_LOGIN);
        reset();
      // }
    } catch (error) {
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">Sign in to Sign-In Online</Typography>

      {/* <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">New user?</Typography>

        <Link component={RouterLink} href={paths.auth.jwt.register} variant="subtitle2">
          Create an account
        </Link>
      </Stack> */}
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <RHFTextField
        name="email"
        label="Email address"
        inputProps={{ style: { textTransform: 'lowercase' } }}
        InputLabelProps={{ shrink: true }}
      />

      <RHFTextField
        name="password"
        label="Password"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        InputLabelProps={{ shrink: true }}
      />

      {/* <FormControl component="fieldset">
        <FormLabel component="legend">User Type</FormLabel>
        <Controller
          name="user_type"
          control={methods.control}
          render={({ field }) => (
            <RadioGroup
              row
              aria-label="user_type"
              {...field}  // Pass the field props from Controller
            >
              <FormControlLabel value="1" control={<Radio />} label="Super Admin" />
              <FormControlLabel value="2" control={<Radio />} label="Admin" />
              <FormControlLabel value="3" control={<Radio />} label="User" />
            </RadioGroup>
          )}
        />
      </FormControl> */}

      {/* <Link onClick={() => router.push(FORGOT_PASSWORD)} variant="body2" color="inherit" underline="always" sx={{ alignSelf: 'flex-end', cursor: 'pointer' }}>
        Forgot password?
      </Link> */}

      <LoadingButton
        fullWidth
        color="primary"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
      </LoadingButton>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}
      {/* 
      <Alert severity="info" sx={{ mb: 3 }}>
        Use email : <strong>demo@minimals.cc</strong> / password :<strong> demo1234</strong>
      </Alert> */}

      {renderForm}
    </FormProvider>
  );
}
