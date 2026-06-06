export const ROUTES = {
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
  },
  DASHBOARD: {
    HOME: "/dashboard",
    LEADS: "/dashboard/leads",
    ANALYTICS: "/dashboard/analytics",
    SETTINGS: "/dashboard/settings",
  },
};

export const PUBLIC_ROUTES = [ROUTES.AUTH.LOGIN, ROUTES.AUTH.REGISTER];