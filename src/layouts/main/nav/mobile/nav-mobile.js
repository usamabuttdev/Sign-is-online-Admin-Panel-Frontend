import PropTypes from 'prop-types';
import { useEffect } from 'react';
// @mui
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// routes
import { usePathname } from 'src/routes/hooks';
// components
import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';
import SvgColor from 'src/components/svg-color';
//
import { LoginButtonSmall } from 'src/layouts/_common/login-button';
import NavList from './nav-list';

// ----------------------------------------------------------------------

export default function NavMobile({ offsetTop, data }) {
  const pathname = usePathname();

  const nav = useBoolean();

  useEffect(() => {
    if (nav.value) {
      nav.onFalse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <IconButton
        onClick={nav.onTrue}
        sx={{
          ml: 1,
          ...(offsetTop && {
            color: 'text.primary',
          }),
        }}
      >
        <SvgColor src="/assets/icons/navbar/ic_menu_item.svg" />
      </IconButton>

      <Drawer
        open={nav.value}
        onClose={nav.onFalse}
        PaperProps={{
          sx: {
            pb: 5,
            width: 260,
          },
        }}
      >
        <Scrollbar>
          <Logo sx={{ mx: 2.5, my: 3 }} />

          <List component="nav" disablePadding>
            {data.map((link) => (
              <NavList key={link.title} item={link} />
            ))}
          </List>
          <LoginButtonSmall/>
        </Scrollbar>
      </Drawer>
    </>
  );
}

NavMobile.propTypes = {
  data: PropTypes.array,
  offsetTop: PropTypes.bool,
};
