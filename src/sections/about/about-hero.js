// import PropTypes from 'prop-types';
// import { m } from 'framer-motion';
// // @mui
// import Stack from '@mui/material/Stack';
// import Container from '@mui/material/Container';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// // components
// import { MotionContainer, varFade } from 'src/components/animate';

// // ----------------------------------------------------------------------

// export default function AboutHero() {
//   return (
//     <Box
//       sx={{
//         height: { md: 560 },
//         py: { xs: 10, md: 0 },
//         overflow: 'hidden',
//         position: 'relative',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundImage:
//           'url(/assets/background/overlay_1.svg), url(/assets/images/about/hero.jpg)',
//       }}
//     >
//       <Container component={MotionContainer}>
//         <Box
//           sx={{
//             bottom: { md: 80 },
//             position: { md: 'absolute' },
//             textAlign: {
//               xs: 'center',
//               md: 'unset',
//             },
//           }}
//         >
//           <TextAnimate text="Who" variants={varFade().inRight} sx={{ color: 'primary.main' }} />

//           <br />

//           <Stack spacing={2} display="inline-flex" direction="row" sx={{ color: 'common.white' }}>
//             <TextAnimate text="we" />
//             <TextAnimate text="are?" />
//           </Stack>

//           {/* <m.div variants={varFade().inRight}>
//             <Typography
//               variant="h4"
//               sx={{
//                 mt: 3,
//                 color: 'common.white',
//                 fontWeight: 'fontWeightSemiBold',
//               }}
//             >
//               Let&apos;s work together and
//               <br /> make awesome site easily
//             </Typography>
//           </m.div> */}
//         </Box>
//       </Container>
//     </Box>
//   );
// }

// // ----------------------------------------------------------------------

// function TextAnimate({ text, variants, sx, ...other }) {
//   return (
//     <Box
//       component={m.div}
//       sx={{
//         typography: 'h1',
//         overflow: 'hidden',
//         display: 'inline-flex',
//         ...sx,
//       }}
//       {...other}
//     >
//       {text.split('').map((letter, index) => (
//         <m.span key={index} variants={variants || varFade().inUp}>
//           {letter}
//         </m.span>
//       ))}
//     </Box>
//   );
// }

// TextAnimate.propTypes = {
//   sx: PropTypes.object,
//   text: PropTypes.string,
//   variants: PropTypes.object,
// };

// import PropTypes from 'prop-types';
// import { m } from 'framer-motion';
// // @mui
// import Stack from '@mui/material/Stack';
// import Container from '@mui/material/Container';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// // components
// import { MotionContainer, varFade } from 'src/components/animate';

// // ----------------------------------------------------------------------

// export default function AboutHero() {
//   return (
//     <Box
//       sx={{
//         height: { md: 560 },
//         py: { xs: 10, md: 0 },
//         overflow: 'hidden',
//         position: 'relative',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundImage:
//           'url(/assets/background/overlay_1.svg), url(/assets/images/about/hero.jpg)',
//       }}
//     >
//       <Container component={MotionContainer}>
//         <Box
//           sx={{
//             bottom: { md: 80 },
//             position: { md: 'absolute' },
//             textAlign: {
//               xs: 'center',
//               md: 'unset',
//             },
//           }}
//         >
//           <TextAnimate text="Who" variants={varFade().inRight} sx={{ color: 'primary.main' }} />

//           <br />

//           <Stack spacing={2} display="inline-flex" direction="row" sx={{ color: 'common.white' }}>
//             <TextAnimate text="we" />
//             <TextAnimate text="are?" />
//           </Stack>

//           <m.div variants={varFade().inRight}>
//             <Typography
//               variant="h4"
//               sx={{
//                 mt: 3,
//                 color: 'common.white',
//                 fontWeight: 'fontWeightSemiBold',
//               }}
//             >
//               Let&apos;s work together and
//               <br /> make awesome site easily
//             </Typography>
//           </m.div>
//         </Box>
//       </Container>
//     </Box>
//   );
// }

// // ----------------------------------------------------------------------

// function TextAnimate({ text, variants, sx, ...other }) {
//   return (
//     <Box
//       component={m.div}
//       sx={{
//         typography: 'h1',
//         overflow: 'hidden',
//         display: 'inline-flex',
//         ...sx,
//       }}
//       {...other}
//     >
//       {text.split('').map((letter, index) => (
//         <m.span key={index} variants={variants || varFade().inUp}>
//           {letter}
//         </m.span>
//       ))}
//     </Box>
//   );
// }

// TextAnimate.propTypes = {
//   sx: PropTypes.object,
//   text: PropTypes.string,
//   variants: PropTypes.object,
// };
import { m } from 'framer-motion';
import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
// components
import { alpha, useTheme } from '@mui/material/styles';
import { MotionContainer, varFade } from 'src/components/animate';
import { useLocales } from 'src/locales';
import { bgGradient } from 'src/theme/css';
// ----------------------------------------------------------------------

export default function AboutHero({ data }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.grey[900], 0.8),
        }),
        height: { md: 400 },
        py: { xs: 10, md: 0 },
        borderRadius: '.7rem .7rem .7rem .7rem',
        overflow: 'hidden',
        position: 'relative',
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginX: ".5rem",
        backgroundImage:
          `
          url(/assets/background/overlay_1.svg), 
          url(/assets/aboutusImage.jpg)
          `,
        // url(/assets/images/about/hero.jpg)
      }}
    >
      <Container sx={{ textAlign: 'center' }} component={MotionContainer}>
        <Box
          sx={{
            bottom: { md: 20 },

          }}
        >
          <TextAnimate text={data?.title || "Who"} variants={varFade().inRight} sx={{ color: 'primary.main', marginRight: '1rem' }} />

          <Stack spacing={2} display="inline-flex" direction="row" sx={{ color: 'common.white' }}>
            {data?.list ? (
              data?.list?.map((v, index) => <TextAnimate key={index} text={v} />)
            ) : (
              <>
                <TextAnimate text="We" />
                <TextAnimate text="are?" />
              </>
            )}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function TextAnimate({ text, variants, sx, ...other }) {

  const { t } = useLocales();


  return (
    <Box
      component={m.div}
      sx={{
        typography: 'h1',
        overflow: 'hidden',
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >

      <m.span variants={variants || varFade().inUp}>
        {t(text)}
      </m.span>

    </Box>
  );
}

TextAnimate.propTypes = {
  sx: PropTypes.object,
  text: PropTypes.string,
  variants: PropTypes.object,
};
// AboutHero.propTypes = {
//   text: PropTypes.arrayOf(PropTypes.string),
// };
