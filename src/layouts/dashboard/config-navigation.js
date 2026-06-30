
import { useMemo } from 'react';
// routes
import { paths } from 'src/routes/paths';
// locales
import { useLocales } from 'src/locales';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';
import { Icon } from '@mui/material';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  support: icon('ic_support'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  trainers: icon('ic-trainers'),
  customers: icon('ic-customers'),
  languages: icon('ic-languages'),
  booking: icon('ic-booking'),
  faq: icon('ic_faq'),
  specializations: icon('ic-specializations'),
  trainingModes: icon('ic-trainingMode'),
  commonQuestions: icon('ic_common_question'),
  transactions: icon('ic_transaction'),
  history: icon('ic_history'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useLocales();

  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: t('Dashboard'),
        items: [
          {
            title: t('Dashboard'),
            path: paths.dashboard.root,
            icon: ICONS.dashboard,
          },
          {
            title: t('Users'),
            path: paths.dashboard.users.root,
            icon: ICONS.trainers,
          },
          // {
          //   title: t('Business'),
          //   path: paths.dashboard.business.root,
          //   icon: ICONS.ecommerce,
          // },
          {
            title: t('Accounts'),
            path: paths.dashboard.accounts.root,
            icon: <Iconify icon="mdi:account-circle" size={24}/>,
          },
          {
            title: t('APIs'),
            path: paths.dashboard.apis.root,
            icon: <Iconify icon="mdi:api" size={24}/>,
          },
          {
            title: t('Charges'),
            path: paths.dashboard.charges.root,
            icon: <Iconify icon="mdi:credit-card-outline" size={24}/>,
          },
          {
            title: t('Locations'),
            path: paths.dashboard.locations.root,
            icon: <Iconify icon="mdi:map-marker" size={24}/>,
          },
          {
            title: t('Metrics'),
            path: paths.dashboard.metrics.root,
            icon: <Iconify icon="mdi:chart-bar" size={24}/>,
          },
          {
            title: t('Platforms'),
            path: paths.dashboard.platforms.root,
            icon: <Iconify icon="mdi:web" size={24}/>,
          },
          {
            title: t('Products'),
            path: paths.dashboard.products.root,
            icon: <Iconify icon="mdi:package-variant" size={24}/>,
          },
          {
            title: t('Scripts'),
            path: paths.dashboard.scripts.root,
            icon: <Iconify icon="mdi:file-code-outline" size={24}/>,
          },
          {
            title: t('Devices'),
            path: paths.dashboard.signs.root,
            icon: <Iconify icon="mdi:devices" size={24}/>,
          },
          // {
          //   title: t('Sales'),
          //   path: paths.dashboard.sales.root,
          //   icon: ICONS.analytics,
          // },
          // {
          //   title: t('Transactions'),
          //   path: paths.dashboard.transactions.root,
          //   icon: ICONS.transactions,
          // },
          {
            title: t('History'),
            path: paths.dashboard.history.root,
            icon: ICONS.history,
          },
          {
            title: t('FAQs'),
            path: paths.dashboard.commonQuestions,
            icon: ICONS.commonQuestions,
          },
          {
            title: t('About Us'),
            path: paths.dashboard.aboutUs,
            icon: ICONS.tour,
          },
          {
            title: t('Privacy Policy'),
            path: paths.dashboard.privacyPolicy,
            icon: ICONS.lock,
          },
          // {
          //   title: t('Terms And Conditions'),
          //   path: paths.dashboard.termsAndConditions,
          //   icon: ICONS.file,
          // },
          // {
          //   title: t('Contact Support'),
          //   path: paths.dashboard.contactSupport,
          //   icon: ICONS.support,
          // }
        ],
      },
    ],
    [t]
  );

  return data;
}
