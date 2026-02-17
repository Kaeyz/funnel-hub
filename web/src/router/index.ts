import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalizedGeneric } from "vue-router";

import HomeView from "../views/website/home-view.vue";
import AboutView from "../views/website/about-view.vue";
import ServicesView from "../views/website/services-view.vue";
import ServiceView from "../views/website/service-view.vue";

import AdminLogin from "../views/admin/login-view.vue";
import UserLogin from "../views/website/login-view.vue";
import AdminLayout from "../components/layouts/admin-layout.vue";
import AuthLayout from "../components/layouts/auth-layout.vue";
import AdminDashboard from "../views/admin/dashboard-view.vue";
import AdminForms from "../views/admin/forms-view.vue";
import AdminFormSections from "../views/admin/form-sections-view.vue";
import AdminFormQuestions from "../views/admin/form-questions-view.vue";
import AdminLeads from "../views/admin/leads-view.vue";
import AdminLead from "../views/admin/lead-view.vue";
import { AuthService } from "@/services/auth";
import WebsiteLayout from "@/components/layouts/website-layout.vue";
import { routes as appRoutes } from "./routes";

const routes = [
  // Public routes

  {
    path: "/",
    component: WebsiteLayout,
    children: [
      { path: "/", name: "Home", component: HomeView },
      { path: "/about", name: "About", component: AboutView },
      { path: "/services", name: "Services", component: ServicesView },
      { path: "/services/:serviceId", name: "Service", component: ServiceView },
    ],
  },
  {
    path: "/login",
    component: AuthLayout,
    children: [{ path: "", name: "UserLogin", component: UserLogin }],
  },

  {
    path: "/admin/login",
    component: AuthLayout,
    children: [{ path: "", name: "AdminLogin", component: AdminLogin }],
  },

  // Admin routes with layout
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      { path: "", name: "AdminDashboard", component: AdminDashboard },
      { path: "overview", name: "AdminDashboard", component: AdminDashboard },
      { path: "forms", name: "AdminForms", component: AdminForms },
      { path: "forms/:formId/sections", name: "AdminFormSections", component: AdminFormSections },
      { path: "forms/:formId/sections/:sectionId", name: "AdminFormQuestions", component: AdminFormQuestions },
      { path: "leads", name: "AdminLeads", component: AdminLeads },
      { path: "leads/:leadId", name: "AdminLead", component: AdminLead },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

const validateIsLoggedIn = (
  config: { to: RouteLocationNormalizedGeneric; next: NavigationGuardNext },
  paths: { isAuthPath: string; isNotAuthPath: string },
  isAuthenticated: boolean
) => {
  const { to, next } = config;
  const { isAuthPath, isNotAuthPath } = paths;
  if (to.path.startsWith(isAuthPath) && !to.path.startsWith(isNotAuthPath) && !isAuthenticated) {
    return next(isNotAuthPath);
  }

  if (to.path.startsWith(isNotAuthPath) && isAuthenticated) {
    return next(isAuthPath);
  }
};

router.beforeEach((to, _from, next) => {
  const adminIsAuthenticated = AuthService.isLoggedIn("admin");
  const userIsAuthenticated = AuthService.isLoggedIn("user");

  validateIsLoggedIn(
    { to, next },
    { isAuthPath: appRoutes.adminOverview(), isNotAuthPath: appRoutes.adminLogin() },
    adminIsAuthenticated
  );

  validateIsLoggedIn({ to, next }, { isAuthPath: appRoutes.services(), isNotAuthPath: appRoutes.login() }, userIsAuthenticated);

  next();
});

export default router;
