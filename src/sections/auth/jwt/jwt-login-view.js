import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// routes

import { useRouter } from 'src/routes/hooks';
// config
import {
  FORGOT_PASSWORD,
  // PATH_AFTER_ADMIN_LOGIN,
  PATH_AFTER_LOGIN,
} from 'src/config-global';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// auth
// components
import { useDispatch } from 'react-redux';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import { setUser } from '../../../store/slices/userSlice';
import { useLoginMutation } from '../../../store/Reducer/auth';
import { paths } from 'src/routes/paths';
import { Link } from '@mui/material';
import { RouterLink } from 'src/routes/components';
import { setSession } from 'src/auth/context/jwt/utils';

// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const dispatch = useDispatch();

  const [login] = useLoginMutation();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');
  const password = useBoolean();

  const ADMIN_EMAIL = process.env.REACT_APP_ADMIN_EMAIL;
  const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD;

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues =  useMemo(()=>{
   return {
    email: ADMIN_EMAIL || '',
    password: ADMIN_PASSWORD || '',
   }  
  } ,[ADMIN_EMAIL,ADMIN_PASSWORD]);

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const result = await login({ email: data.email, password: data.password }).unwrap();
      const accessToken = result.data.accessToken;
      setSession(accessToken);
      dispatch(setUser({
        ...result.data.user,
        token: accessToken,
      }));
      router.push(PATH_AFTER_LOGIN);
      reset();
    } catch (error) {
      setErrorMsg(error?.data?.message || 'Invalid email or password');
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">Sign in to Storefront</Typography>
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

      <Link
        component={RouterLink}
        to={paths.auth.forgotPassword}
        variant="body2"
        color="inherit"
        underline="always"
        sx={{ alignSelf: 'flex-end', cursor: 'pointer' }}
      >
        Forgot password?
      </Link>

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
      {renderForm}
    </FormProvider>
  );
}
