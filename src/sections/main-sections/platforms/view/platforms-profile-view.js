import { useState, useCallback } from 'react';
// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// hooks
import { useMockedUser } from 'src/hooks/use-mocked-user';
// _mock
import { _userAbout, _userFeeds} from 'src/_mock';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import ProfileHome from '../profile-home';
import { Avatar, Stack } from '@mui/material';


// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function PlatformsProfileView() {
  const settings = useSettingsContext();

  const { user } = useMockedUser();

  const [searchFriends, setSearchFriends] = useState('');

  const [currentTab, setCurrentTab] = useState('profile');

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  const handleSearchFriends = useCallback((event) => {
    setSearchFriends(event.target.value);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Stack direction="row" spacing={2}>
      <Avatar
          alt={'John Doe'}
          src={""}
          sx={{ marginTop: '.5rem', width: 56, height: 56 }}
        />
      <CustomBreadcrumbs
        heading="John Doe"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Trainer', href: paths.dashboard.trainer.root },
          { name: 'John Doe' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      </Stack>
      {/* <Card
        sx={{
          mb: 3,
          height: 290,
        }}
      >
        <ProfileCover
          role={'Trainer'}
          name={'John Doe'}
          avatarUrl={user?.photoURL}
          coverUrl={_userAbout.coverUrl}
        />

        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          sx={{
            width: 1,
            bottom: 0,
            zIndex: 9,
            position: 'absolute',
            bgcolor: 'background.paper',
            [`& .${tabsClasses.flexContainer}`]: {
              pr: { md: 3 },
              justifyContent: {
                sm: 'center',
                md: 'flex-end',
              },
            },
          }}
        >
          {TABS.map((tab) => (
            <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
          ))}
        </Tabs>
      </Card> */}

      {currentTab === 'profile' && <ProfileHome info={_userAbout} posts={_userFeeds} />}

      {/* {currentTab === 'followers' && <ProfileFollowers followers={_userFollowers} />}

      {currentTab === 'friends' && (
        <ProfileFriends
          friends={_userFriends}
          searchFriends={searchFriends}
          onSearchFriends={handleSearchFriends}
        />
      )}

      {currentTab === 'gallery' && <ProfileGallery gallery={_userGallery} />} */}
    </Container>
  );
}
