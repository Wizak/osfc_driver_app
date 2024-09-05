const OSFC_API_URL = process.env.EXPO_PUBLIC_OSFC_API_URL;
const USER_STORE_KEY = process.env.EXPO_PUBLIC_USER_STORE_KEY;

const AllowedRolesToUseApp = [
    'customer_and_transporter_driver',
    'transporter_driver',
];

export { OSFC_API_URL, USER_STORE_KEY, AllowedRolesToUseApp };
