import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/auth/guard';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import { LoadingScreen } from 'src/components/loading-screen';

// STATIC PAGES
import AboutUsPage from 'src/pages/main-dashboard/about-us/about-us-page';
import FaqPage from 'src/pages/main-dashboard/faq/faq-page';
import PrivacyPolicyPage from 'src/pages/main-dashboard/privacy-policy/privacy-policy-page';
import SupportPage from 'src/pages/main-dashboard/support/support-page';
import TacPage from 'src/pages/main-dashboard/terms-and-conditions/tac-page';

// ----------------------------------------------------------------------
// OVERVIEW
const IndexPage = lazy(() => import('src/pages/dashboard/app'));
const OverviewEcommercePage = lazy(() => import('src/pages/dashboard/ecommerce'));
const OverviewAnalyticsPage = lazy(() => import('src/pages/dashboard/analytics'));
const OverviewBankingPage = lazy(() => import('src/pages/dashboard/banking'));
const OverviewBookingPage = lazy(() => import('src/pages/dashboard/booking'));
const OverviewFilePage = lazy(() => import('src/pages/dashboard/file'));

// USER
const UserProfilePage = lazy(() => import('src/pages/main-dashboard/user/profile'));
const UserCardsPage = lazy(() => import('src/pages/main-dashboard/user/cards'));
const UserListPage = lazy(() => import('src/pages/main-dashboard/user/list'));
const UserAccountPage = lazy(() => import('src/pages/main-dashboard/user/account'));
const UserCreatePage = lazy(() => import('src/pages/main-dashboard/user/new'));
const UserEditPage = lazy(() => import('src/pages/main-dashboard/user/edit'));

// FILE MANAGER
const FileManagerPage = lazy(() => import('src/pages/dashboard/file-manager'));

// APP
const ChatPage = lazy(() => import('src/pages/dashboard/chat'));
const MailPage = lazy(() => import('src/pages/dashboard/mail'));
const CalendarPage = lazy(() => import('src/pages/dashboard/calendar'));
const KanbanPage = lazy(() => import('src/pages/dashboard/kanban'));
const BlankPage = lazy(() => import('src/pages/dashboard/blank'));

// // TRAINERS / CUSTOMERS / BOOKINGS
// const TrainersListPage = lazy(() => import('src/pages/main-dashboard/trainers/list'));
// const TrainerProfilePage = lazy(() => import('src/pages/main-dashboard/trainers/profile'));

// const CustomerProfilePage = lazy(() => import('src/pages/main-dashboard/customers/profile'));
// const CustomerListPage = lazy(() => import('src/pages/main-dashboard/customers/customers-page'));

// const BookingListPage = lazy(() => import('src/pages/main-dashboard/bookings/bookings'));
// const BookingProfilePage = lazy(() => import('src/pages/main-dashboard/bookings/profile'));

const TransactionListPage = lazy(() => import('src/pages/main-dashboard/transactions/list'));
const TransactionProfilePage = lazy(() => import('src/pages/main-dashboard/transactions/profile'));

const BusinessPage = lazy(() => import('src/pages/main-dashboard/business/business-page'));
const SignPage = lazy(() => import('src/pages/main-dashboard/business/sign-up'));
const BusinessDetailPage = lazy(() => import('src/pages/main-dashboard/business/business-detail-page'));

const SalesPage = lazy(() => import('src/pages/main-dashboard/sales/sales-page'));
const TransactionsPage = lazy(() => import('src/pages/main-dashboard/transactions/list'));
const HistoryPage = lazy(() => import('src/pages/main-dashboard/history/history-page'));

// NEW MODULES
const AccountsListPage = lazy(() => import('src/pages/main-dashboard/accounts/list'));
const AccountsProfilePage = lazy(() => import('src/pages/main-dashboard/accounts/profile'));

const APIsListPage = lazy(() => import('src/pages/main-dashboard/apis/list'));
const APIsProfilePage = lazy(() => import('src/pages/main-dashboard/apis/profile'));

const ChargesListPage = lazy(() => import('src/pages/main-dashboard/charges/list'));
const ChargesProfilePage = lazy(() => import('src/pages/main-dashboard/charges/profile'));

const LocationListPage = lazy(() => import('src/pages/main-dashboard/locations/list'));
const LocationProfilePage = lazy(() => import('src/pages/main-dashboard/locations/profile'));

const MetricsListPage = lazy(() => import('src/pages/main-dashboard/metrics/list'));
const MetricsProfilePage = lazy(() => import('src/pages/main-dashboard/metrics/profile'));

const PlatformsListPage = lazy(() => import('src/pages/main-dashboard/platforms/list'));
const PlatformsProfilePage = lazy(() => import('src/pages/main-dashboard/platforms/profile'));

const ProductsListPage = lazy(() => import('src/pages/main-dashboard/products/list'));
const ProductsProfilePage = lazy(() => import('src/pages/main-dashboard/products/profile'));

const ScriptsListPage = lazy(() => import('src/pages/main-dashboard/scripts/list'));
const ScriptsProfilePage = lazy(() => import('src/pages/main-dashboard/scripts/profile'));

const DevicesListPage = lazy(() => import('src/pages/main-dashboard/signs/list'));
const DevicesProfilePage = lazy(() => import('src/pages/main-dashboard/signs/profile'));

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { element: <IndexPage />, index: true },
      { path: 'common-questions', element: <FaqPage /> },
      { path: 'about-us', element: <AboutUsPage /> },
      { path: 'privacy-policy', element: <PrivacyPolicyPage /> },
      { path: 'contact-support', element: <SupportPage /> },
      { path: 'terms-and-conditions', element: <TacPage /> },

      // BUSINESS
      {
        path: 'business',
        children: [
          { element: <BusinessPage />, index: true },
          { path: 'sign', element: <SignPage /> },
          { path: ':id', element: <BusinessDetailPage /> },
        ],
      },

      // USERS
      {
        path: 'users',
        children: [
          { element: <UserListPage />, index: true },
          { path: 'profile/:id', element: <UserProfilePage /> },
        ],
      },

      // SALES / TRANSACTIONS / HISTORY
      { path: 'sales', element: <SalesPage /> },
      { path: 'transactions', element: <TransactionsPage /> },
      { path: 'history', element: <HistoryPage /> },

      // DASHBOARD EXAMPLES
      { path: 'ecommerce', element: <OverviewEcommercePage /> },
      { path: 'analytics', element: <OverviewAnalyticsPage /> },
      { path: 'banking', element: <OverviewBankingPage /> },
      { path: 'booking', element: <OverviewBookingPage /> },
      { path: 'file', element: <OverviewFilePage /> },


      // ACCOUNTS
      {
        path: 'accounts',
        children: [
          { element: <AccountsListPage />, index: true },
          { path: 'profile/:id', element: <AccountsProfilePage /> },
          { path: 'list', element: <AccountsListPage /> },
          { path: ':id/edit', element: <AccountsProfilePage /> },
        ],
      },

      // APIs
      {
        path: 'apis',
        children: [
          { element: <APIsListPage />, index: true },
          { path: 'profile/:id', element: <APIsProfilePage /> },
          { path: 'list', element: <APIsListPage /> },
          { path: ':id/edit', element: <APIsProfilePage /> },
        ],
      },

      // LOCATIONS
      {
        path: 'locations',
        children: [
          { element: <LocationListPage />, index: true },
          { path: 'profile/:id', element: <LocationProfilePage /> },
          { path: 'list', element: <LocationListPage /> },
          { path: ':id/edit', element: <LocationProfilePage /> },
        ],
      },

      // CHARGES
      {
        path: 'charges',
        children: [
          { element: <ChargesListPage />, index: true },
          { path: 'profile/:id', element: <ChargesProfilePage /> },
          { path: 'list', element: <ChargesListPage /> },
          { path: ':id/edit', element: <ChargesProfilePage /> },
        ],
      },

      // METRICS
      {
        path: 'metrics',
        children: [
          { element: <MetricsListPage />, index: true },
          { path: 'profile/:id', element: <MetricsProfilePage /> },
          { path: 'list', element: <MetricsListPage /> },
          { path: ':id/edit', element: <MetricsProfilePage /> },
        ],
      },

      // PLATFORMS
      {
        path: 'platforms',
        children: [
          { element: <PlatformsListPage />, index: true },
          { path: 'profile/:id', element: <PlatformsProfilePage /> },
          { path: 'list', element: <PlatformsListPage /> },
          { path: ':id/edit', element: <PlatformsProfilePage /> },
        ],
      },

      // PRODUCTS
      {
        path: 'products',
        children: [
          { element: <ProductsListPage />, index: true },
          { path: 'profile/:id', element: <ProductsProfilePage /> },
          { path: 'list', element: <ProductsListPage /> },
          { path: ':id/edit', element: <ProductsProfilePage /> },
        ],
      },

      // SCRIPTS
      {
        path: 'scripts',
        children: [
          { element: <ScriptsListPage />, index: true },
          { path: 'profile/:id', element: <ScriptsProfilePage /> },
          { path: 'list', element: <ScriptsListPage /> },
          { path: ':id/edit', element: <ScriptsProfilePage /> },
        ],
      },

      // DEVICES
      {
        path: 'devices',
        children: [
          { element: <DevicesListPage />, index: true },
          { path: 'profile/:id', element: <DevicesProfilePage /> },
          { path: 'list', element: <DevicesListPage /> },
          { path: ':id/edit', element: <DevicesProfilePage /> },
        ],
      },


      // TRANSACTIONS
      {
        path: 'transactions-detail',
        children: [
          { element: <TransactionListPage />, index: true },
          { path: 'profile/:id', element: <TransactionProfilePage /> },
          { path: 'list', element: <TransactionListPage /> },
        ],
      },

      // APPS
      { path: 'file-manager', element: <FileManagerPage /> },
      { path: 'mail', element: <MailPage /> },
      { path: 'chat', element: <ChatPage /> },
      { path: 'calendar', element: <CalendarPage /> },
      { path: 'kanban', element: <KanbanPage /> },
      { path: 'blank', element: <BlankPage /> },
    ],
  },
];
