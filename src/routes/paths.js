// utils
import { paramCase } from 'src/utils/change-case';
import { _id, _postTitles } from 'src/_mock/assets';

// ----------------------------------------------------------------------

const MOCK_ID = _id[1];

const MOCK_TITLE = _postTitles[2];

const ROOTS = {
  AUTH: '/auth',
  AUTH_DEMO: '/auth-demo',
  DASHBOARD: '/dashboard',
  SUPER_ADMIN_DASHBOARD: '/super-admin-dashboard',
  ADMIN_DASHBOARD: '/admin-dashboard'

};

// ----------------------------------------------------------------------

export const paths = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
  docs: 'https://docs.minimals.cc',
  changelog: 'https://docs.minimals.cc/changelog',
  zoneUI: 'https://mui.com/store/items/zone-landing-page/',
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  freeUI: 'https://mui.com/store/items/minimal-dashboard-free/',

  figma:
    'https://www.figma.com/file/hjxMnGUJCjY7pX8lQbS7kn/%5BPreview%5D-Minimal-Web.v5.4.0?type=design&node-id=0-1&mode=design&t=2fxnS70DuiTLGzND-0',
  product: {
    root: `/product`,
    checkout: `/product/checkout`,
    details: (id) => `/product/${id}`,
    demo: {
      details: `/product/${MOCK_ID}`,
    },
  },
  post: {
    root: `/post`,
    details: (title) => `/post/${paramCase(title)}`,
    demo: {
      details: `/post/${paramCase(MOCK_TITLE)}`,
    },
  },
  // AUTH
  auth: {
    login: `/login`,
    register: `/register`,
    verify: `/verify`,
    newPassword: `/new-password`,
    forgotPassword: `/forgot-password`,
    amplify: {
      login: `${ROOTS.AUTH}/amplify/login`,
      register: `${ROOTS.AUTH}/amplify/register`,
      verify: `${ROOTS.AUTH}/amplify/verify`,
      newPassword: `${ROOTS.AUTH}/amplify/new-password`,
      forgotPassword: `${ROOTS.AUTH}/amplify/forgot-password`,
    },
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
      verify: `${ROOTS.AUTH}/jwt/verify`,
      newPassword: `${ROOTS.AUTH}/jwt/new-password`,
      forgotPassword: `${ROOTS.AUTH}/jwt/forgot-password`,
    },
    firebase: {
      login: `${ROOTS.AUTH}/firebase/login`,
      verify: `${ROOTS.AUTH}/firebase/verify`,
      register: `${ROOTS.AUTH}/firebase/register`,
      forgotPassword: `${ROOTS.AUTH}/firebase/forgot-password`,
    },
    auth0: {
      login: `${ROOTS.AUTH}/auth0/login`,
    },
  },
  authDemo: {
    classic: {
      login: `${ROOTS.AUTH_DEMO}/classic/login`,
      register: `${ROOTS.AUTH_DEMO}/classic/register`,
      forgotPassword: `${ROOTS.AUTH_DEMO}/classic/forgot-password`,
      newPassword: `${ROOTS.AUTH_DEMO}/classic/new-password`,
      verify: `${ROOTS.AUTH_DEMO}/classic/verify`,
    },
    modern: {
      login: `${ROOTS.AUTH_DEMO}/modern/login`,
      register: `${ROOTS.AUTH_DEMO}/modern/register`,
      forgotPassword: `${ROOTS.AUTH_DEMO}/modern/forgot-password`,
      newPassword: `${ROOTS.AUTH_DEMO}/modern/new-password`,
      verify: `${ROOTS.AUTH_DEMO}/modern/verify`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    users:{
      root: `${ROOTS.DASHBOARD}/users`,
      sign: `${ROOTS.DASHBOARD}/users/sign`,
      profile: `${ROOTS.DASHBOARD}/users/profile`,
      details: (id) => `${ROOTS.DASHBOARD}/users/${id}`,
    },
    business:{
      root: `${ROOTS.DASHBOARD}/business`,
      details: (id) => `${ROOTS.DASHBOARD}/business/${id}`,
    },
    sales:{
      root: `${ROOTS.DASHBOARD}/sales`,
      details: (id) => `${ROOTS.DASHBOARD}/sales/${id}`,
    },
    transactions:{
      root: `${ROOTS.DASHBOARD}/transactions`,
      details: (id) => `${ROOTS.DASHBOARD}/transactions/${id}`,
    },
    history:{
      root: `${ROOTS.DASHBOARD}/history`,
      details: (id) => `${ROOTS.DASHBOARD}/history/${id}`,
    },
    trainingModes: `${ROOTS.DASHBOARD}/training-modes`,
    specializations: `${ROOTS.DASHBOARD}/specializations`,
    languages: `${ROOTS.DASHBOARD}/languages`,
    faqs: `${ROOTS.DASHBOARD}/common-questions`,
    commonQuestions: `${ROOTS.DASHBOARD}/common-questions`,
    aboutUs: `${ROOTS.DASHBOARD}/about-us`,
    privacyPolicy: `${ROOTS.DASHBOARD}/privacy-policy`,
    contactSupport: `${ROOTS.DASHBOARD}/contact-support`,
    termsAndConditions: `${ROOTS.DASHBOARD}/terms-and-conditions`,


    // OTHER ROUTES
    mail: `${ROOTS.DASHBOARD}/mail`,
    chat: `${ROOTS.DASHBOARD}/chat`,
    blank: `${ROOTS.DASHBOARD}/blank`,
    kanban: `${ROOTS.DASHBOARD}/kanban`,
    calendar: `${ROOTS.DASHBOARD}/calendar`,
    fileManager: `${ROOTS.DASHBOARD}/file-manager`,
    permission: `${ROOTS.DASHBOARD}/permission`,
    general: {
      app: `${ROOTS.DASHBOARD}/app`,
      ecommerce: `${ROOTS.DASHBOARD}/ecommerce`,
      analytics: `${ROOTS.DASHBOARD}/analytics`,
      banking: `${ROOTS.DASHBOARD}/banking`,
      booking: `${ROOTS.DASHBOARD}/booking`,
      file: `${ROOTS.DASHBOARD}/file`,
    },
    user: {
      root: `${ROOTS.DASHBOARD}/user`,
      new: `${ROOTS.DASHBOARD}/user/new`,
      list: `${ROOTS.DASHBOARD}/user/list`,
      cards: `${ROOTS.DASHBOARD}/user/cards`,
      profile: `${ROOTS.DASHBOARD}/user/profile`,
      account: `${ROOTS.DASHBOARD}/user/account`,
      edit: (id) => `${ROOTS.DASHBOARD}/user/${id}/edit`,
      demo: {
        edit: `${ROOTS.DASHBOARD}/user/${MOCK_ID}/edit`,
      },
    },
    trainer:{
      root: `${ROOTS.DASHBOARD}/trainer`,
      list: `${ROOTS.DASHBOARD}/trainer/list`,
      profile: `${ROOTS.DASHBOARD}/trainer/profile`,
      edit: (id) => `${ROOTS.DASHBOARD}/trainer/${id}/edit`,
    },
    accounts:{
      root: `${ROOTS.DASHBOARD}/accounts`,
      list: `${ROOTS.DASHBOARD}/accounts/list`,
      profile: `${ROOTS.DASHBOARD}/accounts/profile`,
      edit: (id) => `${ROOTS.DASHBOARD}/accounts/${id}/edit`,
    },
    apis:{
      root: `${ROOTS.DASHBOARD}/apis`,
      list: `${ROOTS.DASHBOARD}/apis/list`,
      profile: `${ROOTS.DASHBOARD}/apis/profile`,
      edit: (id) => `${ROOTS.DASHBOARD}/apis/${id}/edit`,
    },
    locations:{
      root: `${ROOTS.DASHBOARD}/locations`,
      list: `${ROOTS.DASHBOARD}/locations/list`,
      profile: `${ROOTS.DASHBOARD}/locations/profile`,
      edit: (id) => `${ROOTS.DASHBOARD}/locations/${id}/edit`,
    },
    charges:{
      root: `${ROOTS.DASHBOARD}/charges`,
      list: `${ROOTS.DASHBOARD}/charges/list`,
      profile: `${ROOTS.DASHBOARD}/charges/profile`,
      edit: (id) => `${ROOTS.DASHBOARD}/charges/${id}/edit`,
    },
    metrics:{
      root: `${ROOTS.DASHBOARD}/metrics`,
      list: `${ROOTS.DASHBOARD}/metrics/list`,
      profile: `${ROOTS.DASHBOARD}/metrics/profile`,
      edit: (id) => `${ROOTS.DASHBOARD}/metrics/${id}/edit`,
    },

    platforms:{
      root: `${ROOTS.DASHBOARD}/platforms`,
      list: `${ROOTS.DASHBOARD}/platforms/list`,
      profile: `${ROOTS.DASHBOARD}/platforms/profile`,
      edit: (id) => `${ROOTS.DASHBOARD}/platforms/${id}/edit`,
    },
    trainers:{
      root: `${ROOTS.DASHBOARD}/trainers`,
      list: `${ROOTS.DASHBOARD}/trainers/list`,
      profile: `${ROOTS.DASHBOARD}/trainers/profile`,
      edit: (id) => `${ROOTS.DASHBOARD}/trainers/${id}/edit`,
    },
    products:{
      root: `${ROOTS.DASHBOARD}/products`,
      list: `${ROOTS.DASHBOARD}/products/list`,
      profile: `${ROOTS.DASHBOARD}/products/profile`,
      edit: (id) => `${ROOTS.DASHBOARD}/products/${id}/edit`,
    },
    scripts:{
      root: `${ROOTS.DASHBOARD}/scripts`,
      list: `${ROOTS.DASHBOARD}/scripts/list`,
      profile: `${ROOTS.DASHBOARD}/scripts/profile`,
      edit: (id) => `${ROOTS.DASHBOARD}/scripts/${id}/edit`,
    },
    signs:{
      root: `${ROOTS.DASHBOARD}/devices`,
      list: `${ROOTS.DASHBOARD}/devices/list`,
      profile: `${ROOTS.DASHBOARD}/devices/profile`,
      edit: (id) => `${ROOTS.DASHBOARD}/devices/${id}/edit`,
    },
    devices:{
      root: `${ROOTS.DASHBOARD}/devices`,
      list: `${ROOTS.DASHBOARD}/devices/list`,
      profile: `${ROOTS.DASHBOARD}/devices/profile`,
      edit: (id) => `${ROOTS.DASHBOARD}/devices/${id}/edit`,
    },
    
    customers:{
      root: `${ROOTS.DASHBOARD}/customers`,
      list: `${ROOTS.DASHBOARD}/customers/list`,
      profile: `${ROOTS.DASHBOARD}/customers/profile`,
      edit: (id) => `${ROOTS.DASHBOARD}/customers/${id}/edit`,
    },
    bookings :{
      root: `${ROOTS.DASHBOARD}/bookings`,
      list: `${ROOTS.DASHBOARD}/bookings/list`,
      profile: `${ROOTS.DASHBOARD}/bookings/profile`,
      edit: (id) => `${ROOTS.DASHBOARD}/bookings/${id}/edit`,
    },
    transactions :{
      root: `${ROOTS.DASHBOARD}/transactions`,  
      list: `${ROOTS.DASHBOARD}/transactions/list`,
      profile: `${ROOTS.DASHBOARD}/transactions/profile`,
      edit: (id) => `${ROOTS.DASHBOARD}/transactions/${id}/edit`,
    },
  },

  superAdminDashboard: {
    root: ROOTS.SUPER_ADMIN_DASHBOARD,
    mail: `${ROOTS.SUPER_ADMIN_DASHBOARD}/mail`,
    chat: `${ROOTS.SUPER_ADMIN_DASHBOARD}/chat`,
    blank: `${ROOTS.SUPER_ADMIN_DASHBOARD}/blank`,
    kanban: `${ROOTS.SUPER_ADMIN_DASHBOARD}/kanban`,
    calendar: `${ROOTS.SUPER_ADMIN_DASHBOARD}/calendar`,
    fileManager: `${ROOTS.SUPER_ADMIN_DASHBOARD}/file-manager`,
    permission: `${ROOTS.SUPER_ADMIN_DASHBOARD}/permission`,
    general: {
      app: `${ROOTS.SUPER_ADMIN_DASHBOARD}/app`,
      ecommerce: `${ROOTS.SUPER_ADMIN_DASHBOARD}/ecommerce`,
      analytics: `${ROOTS.SUPER_ADMIN_DASHBOARD}/analytics`,
      banking: `${ROOTS.SUPER_ADMIN_DASHBOARD}/banking`,
      booking: `${ROOTS.SUPER_ADMIN_DASHBOARD}/booking`,
      file: `${ROOTS.SUPER_ADMIN_DASHBOARD}/file`,
    },
    user: {
      root: `${ROOTS.SUPER_ADMIN_DASHBOARD}/user`,
      new: `${ROOTS.SUPER_ADMIN_DASHBOARD}/user/new`,
      list: `${ROOTS.SUPER_ADMIN_DASHBOARD}/user/list`,
      cards: `${ROOTS.SUPER_ADMIN_DASHBOARD}/user/cards`,
      profile: `${ROOTS.SUPER_ADMIN_DASHBOARD}/user/profile`,
      account: `${ROOTS.SUPER_ADMIN_DASHBOARD}/user/account`,
      edit: (id) => `${ROOTS.SUPER_ADMIN_DASHBOARD}/user/${id}/edit`,
      demo: {
        edit: `${ROOTS.SUPER_ADMIN_DASHBOARD}/user/${MOCK_ID}/edit`,
      },
    },
    business: {
      root: `${ROOTS.SUPER_ADMIN_DASHBOARD}/business`,
      new: `${ROOTS.SUPER_ADMIN_DASHBOARD}/business/new`,
      list: `${ROOTS.SUPER_ADMIN_DASHBOARD}/business/list`,
      edit: (id) => `${ROOTS.DASHBOARD}/business/${id}/edit`,
    },
    branch: {
      root: `${ROOTS.SUPER_ADMIN_DASHBOARD}/branch`,
      new: `${ROOTS.SUPER_ADMIN_DASHBOARD}/branch/new`,
      list: `${ROOTS.SUPER_ADMIN_DASHBOARD}/branch/list`,
      edit: (id) => `${ROOTS.DASHBOARD}/branch/${id}/edit`,
    },
    category: {
      root: `${ROOTS.SUPER_ADMIN_DASHBOARD}/category`,
      new: `${ROOTS.SUPER_ADMIN_DASHBOARD}/category/new`,
      edit: (id) => `${ROOTS.DASHBOARD}/category/${id}/edit`,
    },
    project: {
      root: `${ROOTS.SUPER_ADMIN_DASHBOARD}/project`,
      new: `${ROOTS.SUPER_ADMIN_DASHBOARD}/project/new`,
      edit: (id) => `${ROOTS.SUPER_ADMIN_DASHBOARD}/project/${id}/edit`,
    },
    payrol: {
      root: `${ROOTS.SUPER_ADMIN_DASHBOARD}/payrol`,
      new: `${ROOTS.SUPER_ADMIN_DASHBOARD}/payrol/new`,
      edit: (id) => `${ROOTS.SUPER_ADMIN_DASHBOARD}/payrol/${id}/edit`,
    },
    service: {
      root: `${ROOTS.SUPER_ADMIN_DASHBOARD}/service`,
      new: `${ROOTS.SUPER_ADMIN_DASHBOARD}/service/new`,
      details: (id) => `${ROOTS.SUPER_ADMIN_DASHBOARD}/service/${paramCase(id)}`,
      edit: (id) => `${ROOTS.SUPER_ADMIN_DASHBOARD}/service/${paramCase(id)}/edit`,
    },
    attendance: {
      root: `${ROOTS.SUPER_ADMIN_DASHBOARD}/attendance`,
      new: `${ROOTS.SUPER_ADMIN_DASHBOARD}/attendance/new`,
      list: `${ROOTS.SUPER_ADMIN_DASHBOARD}/attendance/list`,
      edit: (id) => `${ROOTS.SUPER_ADMIN_DASHBOARD}/attendance/${id}/edit`,
    },
    product: {
      root: `${ROOTS.SUPER_ADMIN_DASHBOARD}/product`,
      new: `${ROOTS.SUPER_ADMIN_DASHBOARD}/product/new`,
      details: (id) => `${ROOTS.SUPER_ADMIN_DASHBOARD}/product/${id}`,
      edit: (id) => `${ROOTS.SUPER_ADMIN_DASHBOARD}/product/${id}/edit`,
      demo: {
        details: `${ROOTS.SUPER_ADMIN_DASHBOARD}/product/${MOCK_ID}`,
        edit: `${ROOTS.SUPER_ADMIN_DASHBOARD}/product/${MOCK_ID}/edit`,
      },
    },
    invoice: {
      root: `${ROOTS.SUPER_ADMIN_DASHBOARD}/invoice`,
      new: `${ROOTS.SUPER_ADMIN_DASHBOARD}/invoice/new`,
      details: (id) => `${ROOTS.SUPER_ADMIN_DASHBOARD}/invoice/${id}`,
      edit: (id) => `${ROOTS.SUPER_ADMIN_DASHBOARD}/invoice/${id}/edit`,
      demo: {
        details: `${ROOTS.SUPER_ADMIN_DASHBOARD}/invoice/${MOCK_ID}`,
        edit: `${ROOTS.SUPER_ADMIN_DASHBOARD}/invoice/${MOCK_ID}/edit`,
      },
    },
    post: {
      root: `${ROOTS.SUPER_ADMIN_DASHBOARD}/post`,
      new: `${ROOTS.SUPER_ADMIN_DASHBOARD}/post/new`,
      details: (title) => `${ROOTS.SUPER_ADMIN_DASHBOARD}/post/${paramCase(title)}`,
      edit: (title) => `${ROOTS.SUPER_ADMIN_DASHBOARD}/post/${paramCase(title)}/edit`,
      demo: {
        details: `${ROOTS.SUPER_ADMIN_DASHBOARD}/post/${paramCase(MOCK_TITLE)}`,
        edit: `${ROOTS.SUPER_ADMIN_DASHBOARD}/post/${paramCase(MOCK_TITLE)}/edit`,
      },
    },
    order: {
      root: `${ROOTS.SUPER_ADMIN_DASHBOARD}/order`,
      details: (id) => `${ROOTS.SUPER_ADMIN_DASHBOARD}/order/${id}`,
      demo: {
        details: `${ROOTS.SUPER_ADMIN_DASHBOARD}/order/${MOCK_ID}`,
      },
    },
    job: {
      root: `${ROOTS.SUPER_ADMIN_DASHBOARD}/job`,
      new: `${ROOTS.SUPER_ADMIN_DASHBOARD}/job/new`,
      details: (id) => `${ROOTS.SUPER_ADMIN_DASHBOARD}/job/${id}`,
      edit: (id) => `${ROOTS.SUPER_ADMIN_DASHBOARD}/job/${id}/edit`,
      demo: {
        details: `${ROOTS.SUPER_ADMIN_DASHBOARD}/job/${MOCK_ID}`,
        edit: `${ROOTS.SUPER_ADMIN_DASHBOARD}/job/${MOCK_ID}/edit`,
      },
    },
    tour: {
      root: `${ROOTS.SUPER_ADMIN_DASHBOARD}/tour`,
      new: `${ROOTS.SUPER_ADMIN_DASHBOARD}/tour/new`,
      details: (id) => `${ROOTS.SUPER_ADMIN_DASHBOARD}/tour/${id}`,
      edit: (id) => `${ROOTS.SUPER_ADMIN_DASHBOARD}/tour/${id}/edit`,
      demo: {
        details: `${ROOTS.SUPER_ADMIN_DASHBOARD}/tour/${MOCK_ID}`,
        edit: `${ROOTS.SUPER_ADMIN_DASHBOARD}/tour/${MOCK_ID}/edit`,
      },
    },
  },

  adminDashboard: {
    root: ROOTS.ADMIN_DASHBOARD,
    mail: `${ROOTS.ADMIN_DASHBOARD}/mail`,
    chat: `${ROOTS.ADMIN_DASHBOARD}/chat`,
    blank: `${ROOTS.ADMIN_DASHBOARD}/blank`,
    kanban: `${ROOTS.ADMIN_DASHBOARD}/kanban`,
    calendar: `${ROOTS.ADMIN_DASHBOARD}/calendar`,
    fileManager: `${ROOTS.ADMIN_DASHBOARD}/file-manager`,
    permission: `${ROOTS.ADMIN_DASHBOARD}/permission`,
    general: {
      app: `${ROOTS.ADMIN_DASHBOARD}/app`,
      ecommerce: `${ROOTS.ADMIN_DASHBOARD}/ecommerce`,
      analytics: `${ROOTS.ADMIN_DASHBOARD}/analytics`,
      banking: `${ROOTS.ADMIN_DASHBOARD}/banking`,
      booking: `${ROOTS.ADMIN_DASHBOARD}/booking`,
      file: `${ROOTS.ADMIN_DASHBOARD}/file`,
    },
    user: {
      root: `${ROOTS.ADMIN_DASHBOARD}/user`,
      new: `${ROOTS.ADMIN_DASHBOARD}/user/new`,
      list: `${ROOTS.ADMIN_DASHBOARD}/user/list`,
      cards: `${ROOTS.ADMIN_DASHBOARD}/user/cards`,
      profile: `${ROOTS.ADMIN_DASHBOARD}/user/profile`,
      account: `${ROOTS.ADMIN_DASHBOARD}/user/account`,
      edit: (id) => `${ROOTS.ADMIN_DASHBOARD}/user/${id}/edit`,
      demo: {
        edit: `${ROOTS.ADMIN_DASHBOARD}/user/${MOCK_ID}/edit`,
      },
    },
    business: {
      root: `${ROOTS.ADMIN_DASHBOARD}/business`,
      new: `${ROOTS.ADMIN_DASHBOARD}/business/new`,
      list: `${ROOTS.ADMIN_DASHBOARD}/business/list`,
      edit: (id) => `${ROOTS.ADMIN_DASHBOARD}/business/${id}/edit`,
    },
    branch: {
      root: `${ROOTS.ADMIN_DASHBOARD}/branch`,
      new: `${ROOTS.ADMIN_DASHBOARD}/branch/new`,
      list: `${ROOTS.ADMIN_DASHBOARD}/branch/list`,
      edit: (id) => `${ROOTS.ADMIN_DASHBOARD}/branch/${id}/edit`,
    },
    category: {
      root: `${ROOTS.ADMIN_DASHBOARD}/category`,
      new: `${ROOTS.ADMIN_DASHBOARD}/category/new`,
      edit: (id) => `${ROOTS.ADMIN_DASHBOARD}/category/${id}/edit`,
    },
    project: {
      root: `${ROOTS.ADMIN_DASHBOARD}/project`,
      new: `${ROOTS.ADMIN_DASHBOARD}/project/new`,
      edit: (id) => `${ROOTS.ADMIN_DASHBOARD}/project/${id}/edit`,
    },
    payrol: {
      root: `${ROOTS.ADMIN_DASHBOARD}/payrol`,
      new: `${ROOTS.ADMIN_DASHBOARD}/payrol/new`,
      edit: (id) => `${ROOTS.ADMIN_DASHBOARD}/payrol/${id}/edit`,
    },
    service: {
      root: `${ROOTS.ADMIN_DASHBOARD}/service`,
      new: `${ROOTS.ADMIN_DASHBOARD}/service/new`,
      details: (id) => `${ROOTS.ADMIN_DASHBOARD}/service/${paramCase(id)}`,
      edit: (id) => `${ROOTS.ADMIN_DASHBOARD}/service/${paramCase(id)}/edit`,
    },
    attendance: {
      root: `${ROOTS.ADMIN_DASHBOARD}/attendance`,
      new: `${ROOTS.ADMIN_DASHBOARD}/attendance/new`,
      list: `${ROOTS.ADMIN_DASHBOARD}/attendance/list`,
      edit: (id) => `${ROOTS.ADMIN_DASHBOARD}/attendance/${id}/edit`,
    },
    product: {
      root: `${ROOTS.ADMIN_DASHBOARD}/product`,
      new: `${ROOTS.ADMIN_DASHBOARD}/product/new`,
      details: (id) => `${ROOTS.ADMIN_DASHBOARD}/product/${id}`,
      edit: (id) => `${ROOTS.ADMIN_DASHBOARD}/product/${id}/edit`,
      demo: {
        details: `${ROOTS.ADMIN_DASHBOARD}/product/${MOCK_ID}`,
        edit: `${ROOTS.ADMIN_DASHBOARD}/product/${MOCK_ID}/edit`,
      },
    },
    invoice: {
      root: `${ROOTS.ADMIN_DASHBOARD}/invoice`,
      new: `${ROOTS.ADMIN_DASHBOARD}/invoice/new`,
      details: (id) => `${ROOTS.ADMIN_DASHBOARD}/invoice/${id}`,
      edit: (id) => `${ROOTS.ADMIN_DASHBOARD}/invoice/${id}/edit`,
      demo: {
        details: `${ROOTS.ADMIN_DASHBOARD}/invoice/${MOCK_ID}`,
        edit: `${ROOTS.ADMIN_DASHBOARD}/invoice/${MOCK_ID}/edit`,
      },
    },
    post: {
      root: `${ROOTS.ADMIN_DASHBOARD}/post`,
      new: `${ROOTS.ADMIN_DASHBOARD}/post/new`,
      details: (title) => `${ROOTS.ADMIN_DASHBOARD}/post/${paramCase(title)}`,
      edit: (title) => `${ROOTS.ADMIN_DASHBOARD}/post/${paramCase(title)}/edit`,
      demo: {
        details: `${ROOTS.ADMIN_DASHBOARD}/post/${paramCase(MOCK_TITLE)}`,
        edit: `${ROOTS.ADMIN_DASHBOARD}/post/${paramCase(MOCK_TITLE)}/edit`,
      },
    },
    order: {
      root: `${ROOTS.ADMIN_DASHBOARD}/order`,
      details: (id) => `${ROOTS.ADMIN_DASHBOARD}/order/${id}`,
      demo: {
        details: `${ROOTS.ADMIN_DASHBOARD}/order/${MOCK_ID}`,
      },
    },
    job: {
      root: `${ROOTS.ADMIN_DASHBOARD}/job`,
      new: `${ROOTS.ADMIN_DASHBOARD}/job/new`,
      details: (id) => `${ROOTS.ADMIN_DASHBOARD}/job/${id}`,
      edit: (id) => `${ROOTS.ADMIN_DASHBOARD}/job/${id}/edit`,
      demo: {
        details: `${ROOTS.ADMIN_DASHBOARD}/job/${MOCK_ID}`,
        edit: `${ROOTS.ADMIN_DASHBOARD}/job/${MOCK_ID}/edit`,
      },
    },
    tour: {
      root: `${ROOTS.ADMIN_DASHBOARD}/tour`,
      new: `${ROOTS.ADMIN_DASHBOARD}/tour/new`,
      details: (id) => `${ROOTS.ADMIN_DASHBOARD}/tour/${id}`,
      edit: (id) => `${ROOTS.ADMIN_DASHBOARD}/tour/${id}/edit`,
      demo: {
        details: `${ROOTS.ADMIN_DASHBOARD}/tour/${MOCK_ID}`,
        edit: `${ROOTS.ADMIN_DASHBOARD}/tour/${MOCK_ID}/edit`,
      },
    },
  },

};
