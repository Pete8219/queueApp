import { CategoryPage } from "../pages/admin/CategoryPage";

import { UserPage } from "../pages/admin/UserPage";

const adminRoutes = [
  {
    path: "/category",
    component: CategoryPage,
  },
  {
    path: "/users",
    component: UserPage,
  },
];

export default adminRoutes;
