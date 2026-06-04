import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/auth/guard';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import { LoadingScreen } from 'src/components/loading-screen';
// import CustomersPage from 'src/pages/main-dashboard/customers/customers-page';
import AboutUsPage from 'src/pages/main-dashboard/about-us/about-us-page';
import FaqPage from 'src/pages/main-dashboard/faq/faq-page';
import LanguagesPage from 'src/pages/main-dashboard/languages/languages';
import PrivacyPolicyPage from 'src/pages/main-dashboard/privacy-policy/privacy-policy-page';
import SpecializationsPage from 'src/pages/main-dashboard/specializations/specializations-page';
import SupportPage from 'src/pages/main-dashboard/support/support-page';
import TrainingModesPage from 'src/pages/main-dashboard/training-modes/training-modes';
// import TacPage from 'src/pages/main-dashboard/terms-and-conditions/tac-page';

// ----------------------------------------------------------------------

// OVERVIEW
const IndexPage = lazy(() => import('src/pages/dashboard/app'));
const OverviewEcommercePage = lazy(() => import('src/pages/dashboard/ecommerce'));
const OverviewAnalyticsPage = lazy(() => import('src/pages/dashboard/analytics'));
const OverviewBankingPage = lazy(() => import('src/pages/dashboard/banking'));
const OverviewBookingPage = lazy(() => import('src/pages/dashboard/booking'));
const OverviewFilePage = lazy(() => import('src/pages/dashboard/file'));
// // PRODUCT
// const ProductDetailsPage = lazy(() => import('src/pages/dashboard/product/details'));
// const ProductListPage = lazy(() => import('src/pages/dashboard/product/list'));
// const ProductCreatePage = lazy(() => import('src/pages/dashboard/product/new'));
// const ProductEditPage = lazy(() => import('src/pages/dashboard/product/edit'));
// // ORDER
// const OrderListPage = lazy(() => import('src/pages/dashboard/order/list'));
// const OrderDetailsPage = lazy(() => import('src/pages/dashboard/order/details'));
// // INVOICE
// const InvoiceListPage = lazy(() => import('src/pages/dashboard/invoice/list'));
// const InvoiceDetailsPage = lazy(() => import('src/pages/dashboard/invoice/details'));
// const InvoiceCreatePage = lazy(() => import('src/pages/dashboard/invoice/new'));
// const InvoiceEditPage = lazy(() => import('src/pages/dashboard/invoice/edit'));
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
const TrainersListPage = lazy(() => import('src/pages/main-dashboard/trainers/list'));
const TrainerProfilePage = lazy(() => import('src/pages/main-dashboard/trainers/profile'));
const CustomerProfilePage = lazy(() => import('src/pages/main-dashboard/customers/profile'));
const CustomerListPage = lazy(() => import('src/pages/main-dashboard/customers/customers-page'));
const BookingListPage = lazy(() => import('src/pages/main-dashboard/bookings/bookings'));
const BookingProfilePage = lazy(() => import('src/pages/main-dashboard/bookings/profile'));
const TransactionListPage = lazy(() => import('src/pages/main-dashboard/transactions/list'));
const TransactionProfilePage = lazy(() => import('src/pages/main-dashboard/transactions/profile'));
const TacPage = lazy(() => import('src/pages/main-dashboard/terms-and-conditions/tac-page'));
const BusinessPage = lazy(() => import('src/pages/main-dashboard/business/business-page'));
const SignPage = lazy(() => import('src/pages/main-dashboard/business/sign-up'));

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

      { path: 'specializations', element: <SpecializationsPage /> },
      { path: 'training-modes', element: <TrainingModesPage /> },
      { path: 'languages', element: <LanguagesPage /> },
      {
        path: 'users', children: [
          { element: <UserListPage />, index: true },
          { path: ':id', element: <UserProfilePage /> },
        ]
      },
      {
        path: 'business', children: [
          { element: <BusinessPage />, index: true },
          {path:'sign', element: <SignPage />},
          { path: ':id', element: <UserProfilePage /> }
        ]
      },
      { path: 'faqs', element: <FaqPage /> },
      { path: 'about-us', element: <AboutUsPage /> },
      { path: 'privacy-policy', element: <PrivacyPolicyPage /> },
      { path: 'contact-support', element: <SupportPage /> },
      { path: 'terms-and-conditions', element: <TacPage /> },

      // OTHER PAGES
      { path: 'ecommerce', element: <OverviewEcommercePage /> },
      { path: 'analytics', element: <OverviewAnalyticsPage /> },
      { path: 'banking', element: <OverviewBankingPage /> },
      { path: 'booking', element: <OverviewBookingPage /> },
      { path: 'file', element: <OverviewFilePage /> },
      {
        path: 'trainer',
        children: [
          { element: <TrainersListPage />, index: true },
          { path: 'profile/:id', element: <TrainerProfilePage /> },
          { path: 'list', element: <TrainersListPage /> },
          { path: ':id/edit', element: <TrainerProfilePage /> }
        ],
      },
      {
        path: 'customers',
        children: [
          { element: <CustomerListPage />, index: true },
          { path: 'profile/:id', element: <CustomerProfilePage /> },
          { path: 'list', element: <CustomerListPage /> },
        ],
      },
      {
        path: 'Bookings',
        children: [
          { element: <BookingListPage />, index: true },
          { path: 'profile/:id', element: <BookingProfilePage /> },
          { path: 'list', element: <BookingListPage /> },
        ],
      },
      {
        path: 'Transactions',
        children: [
          { element: <TransactionListPage />, index: true },
          { path: 'profile', element: <TransactionProfilePage /> },
          { path: 'list', element: <TransactionListPage /> },
        ],
      },
      { path: 'file-manager', element: <FileManagerPage /> },
      { path: 'mail', element: <MailPage /> },
      { path: 'chat', element: <ChatPage /> },
      { path: 'calendar', element: <CalendarPage /> },
      { path: 'kanban', element: <KanbanPage /> },
      { path: 'blank', element: <BlankPage /> },
    ],
  },
];
