import { m } from 'framer-motion';
// @mui
import Container from '@mui/material/Container';
import { alpha, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// utils
// components
import { MotionViewport, varFade } from 'src/components/animate';
import Image from 'src/components/image';
import { useSettingsContext } from 'src/components/settings';
import { useLocales } from 'src/locales';
// import AvatarImage from 'src/assets/privacy-policy.jpeg'

// ----------------------------------------------------------------------

export const SKILLS = [...Array(3)].map((_, index) => ({
  label: ['Partners', 'Customer', 'Booking'][index],
  value: [55, 40, 20][index],
}));

// ----------------------------------------------------------------------

export default function AboutWhat({ data }) {
  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  const isLight = theme.palette.mode === 'light';

  const settings = useSettingsContext();

  const { t, currentLang } = useLocales();

  const shadow = `-40px 40px 80px ${alpha(
    isLight ? theme.palette.grey[500] : theme.palette.common.black,
    0.24
  )}`;

  return (
    <Container
      component={MotionViewport}
      sx={{
        py: { xs: 2, md: 15 },
        textAlign: { xs: 'center', md: 'unset' },
      }}
    >
      <Grid
        sx={{ direction: 'ltr' }}
        flexDirection={
          currentLang?.label === 'Arabic' || currentLang?.label === 'Urdu' ? 'row-reverse' : 'row'
        }
        container
        alignItems="flex-start"
      >
        <Grid
          container
          xs={11}
          md={6}
          lg={7}
          alignItems="center"
          sx={{
            p: { md: 3 },
            display: {
              lg: 'block',
              md: 'block',
              sm: 'none',
              xs: 'none',
            },
          }}
        >
          <Grid xs={11}>
            <m.div variants={varFade().inUp}>
              <Image alt="our office 2" src={`${data?.image}`} ratio="1/1" sx={{ borderRadius: 3 }} />
            </m.div>
          </Grid>
        </Grid>

        <Grid xs={11} md={6} lg={5}>
          <m.div variants={varFade().inRight}>
            <Typography whiteSpace={'nowrap'} variant="h2" sx={{ mb: 0}}>
              {data.title}
            </Typography>
          </m.div>

          <m.div variants={varFade().inRight}>
            <Typography
              sx={{
                color: theme.palette.mode === 'light' ? 'text.secondary' : 'common.white',
              }}
            >
              <div
                style={{ direction: 'ltr' }}
                dangerouslySetInnerHTML={{
                  __html: data?.content ? `${data?.content}` : `${t('No Data Found')}`,
                }}
              />
            </Typography>
          </m.div>
        </Grid>
      </Grid>
    </Container>
    // </Box>
  );
}
