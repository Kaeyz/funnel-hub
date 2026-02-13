import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/website/home-view.vue";
import AboutView from "../views/website/about-view.vue";

import AdminLogin from "../views/admin/login-view.vue";
import AdminLayout from "../components/layouts/admin-layout.vue";
import AdminAuthLayout from "../components/layouts/admin-auth-layout.vue";
import AdminDashboard from "../views/admin/dashboard-view.vue";
import AdminUsers from "../views/admin/users-view.vue";
import { AuthService } from "@/services/auth";

const routes = [
  // Public routes
  { path: "/", name: "Home", component: HomeView },
  { path: "/about", name: "About", component: AboutView },

  {
    path: "/admin/login",
    component: AdminAuthLayout,
    children: [{ path: "", name: "AdminLogin", component: AdminLogin }],
  },

  // Admin routes with layout
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      { path: "", name: "AdminDashboard", component: AdminDashboard },
      { path: "form", name: "AdminForms", component: AdminUsers },
      { path: "overview", name: "AdminUsers", component: AdminUsers },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, _from, next) => {
  const isAuthenticated = AuthService.isLoggedIn();

  if (to.path.startsWith("/admin") && !to.path.startsWith("/admin/login") && !isAuthenticated) {
    return next("/admin/login");
  }

  if (to.path.startsWith("/admin/login") && isAuthenticated) {
    return next("/admin");
  }

  next();
});

export default router;
