import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "车辆信息",
        component: Dashboard,
      },
      {
        path: "user",
        name: "用户偏好",
        component: UserProfile,
      },
      {
        path: "table",
        name: "信息查询",
        component: TableList,
      },
      {
        path: "typography",
        name: "效益分析",
        component: Typography,
      },
      {
        path: "icons",
        name: "销售趋势",
        component: Icons,
      },
      {
        path: "maps",
        name: "Maps",
        meta: {
          hideFooter: true,
        },
        component: Maps,
      },
      {
        path: "notifications",
        name: "对比分析",
        component: Notifications,
      },
    ],
  },
];

export default routes;
