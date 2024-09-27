/*!

=========================================================
* Argon Dashboard PRO React Nodejs - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react-nodejs
* Copyright 2021 Creative Tim (http://www.creative-tim.com)

* Coded by Creative Tim
* Coded by ProjectData

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import Alternative from "views/pages/dashboards/Alternative.js";
import Buttons from "views/pages/components/Buttons.js";
import Calendar from "views/pages/Calendar.js";
import Cards from "views/pages/components/Cards.js";
import Charts from "views/pages/Charts.js";
import Components from "views/pages/forms/Components.js";
import Dashboard from "views/pages/dashboards/Dashboard.js";
import Elements from "views/pages/forms/Elements.js";
import Google from "views/pages/maps/Google.js";
import Grid from "views/pages/components/Grid.js";
import Icons from "views/pages/components/Icons.js";
import Lock from "views/pages/examples/Lock.js";
import Login from "views/pages/examples/Login.js";
import Notifications from "views/pages/components/Notifications.js";
import Pricing from "views/pages/examples/Pricing.js";
import Profile from "views/pages/examples/Profile.js";
import ReactBSTables from "views/pages/tables/ReactBSTables.js";
import Register from "views/pages/examples/Register.js";
import RTLSupport from "views/pages/examples/RTLSupport.js";
import Sortable from "views/pages/tables/Sortable.js";
import Tables from "views/pages/tables/Tables.js";
import Timeline from "views/pages/examples/Timeline.js";
import Typography from "views/pages/components/Typography.js";
import Validation from "views/pages/forms/Validation.js";
import Vector from "views/pages/maps/Vector.js";
import Widgets from "views/pages/Widgets.js";
import ConfirmEmail from "views/pages/examples/ConfirmEmail";
import AddUser from "views/pages/examples/AddUser";
import ResetPassword from "views/pages/examples/ResetPassword";
import ConfirmPassword from "views/pages/examples/ConfirmPassword";
import ResetPasswordSuccess from "views/pages/examples/ResetPasswordSuccess";
import Categories from "views/pages/examples/Categories";
import Users from "views/pages/examples/Users";

const routes = [
  {
    collapse: true,
    name: "Dashboards",
    icon: "ni ni-shop text-primary",
    state: "dashboardsCollapse",
    views: [
      {
        path: "/dashboard",
        name: "Dashboard",
        miniName: "D",
        component: Dashboard,
        layout: "/admin",
      },
      {
        path: "/alternative-dashboard",
        name: "Alternative",
        miniName: "A",
        component: Alternative,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "Examples",
    icon: "ni ni-ungroup text-orange",
    state: "examplesCollapse",
    views: [
      {
        path: "/confirm-email/:id",
        name: "Confirm Email",
        miniName: "C",
        component: ConfirmEmail,
        layout: "/auth",
        redirect: true
      },
      {
        path: "/reset-password",
        name: "Reset Password",
        miniName: "RP",
        component: ResetPassword,
        layout: "/auth",
        redirect: true
      },
      {
        path: "/reset-password-success",
        name: "Reset Password Success",
        miniName: "RPS",
        component: ResetPasswordSuccess,
        layout: "/auth",
        redirect: true
      },
      {
        path: "/confirm-password/:id",
        name: "Confirm Password",
        miniName: "CP",
        component: ConfirmPassword,
        layout: "/auth",
        redirect: true
      },
      {
        path: "/pricing",
        name: "Pricing",
        miniName: "P",
        component: Pricing,
        layout: "/auth",
      },
      {
        path: "/login",
        name: "Login",
        miniName: "L",
        component: Login,
        layout: "/auth",
      },
      {
        path: "/register",
        name: "Register",
        miniName: "R",
        component: Register,
        layout: "/auth",
      },
      {
        path: "/lock",
        name: "Lock",
        miniName: "L",
        component: Lock,
        layout: "/auth",
      },
      {
        path: "/rtl-support",
        name: "RTL Support",
        miniName: "RS",
        component: RTLSupport,
        layout: "/rtl",
      },
    ],
  },
  {
    collapse: true,
    name: "Components",
    icon: "ni ni-ui-04 text-info",
    state: "componentsCollapse",
    views: [
      {
        path: "/buttons",
        name: "Buttons",
        miniName: "B",
        component: Buttons,
        layout: "/admin",
      },
      {
        path: "/cards",
        name: "Cards",
        miniName: "C",
        component: Cards,
        layout: "/admin",
      },
      {
        path: "/grid",
        name: "Grid",
        miniName: "G",
        component: Grid,
        layout: "/admin",
      },
      {
        path: "/notifications",
        name: "Notifications",
        miniName: "N",
        component: Notifications,
        layout: "/admin",
      },
      {
        path: "/icons",
        name: "Icons",
        miniName: "I",
        component: Icons,
        layout: "/admin",
      },
      {
        path: "/typography",
        name: "Typography",
        miniName: "T",
        component: Typography,
        layout: "/admin",
      },
      {
        collapse: true,
        name: "Multi Level",
        miniName: "M",
        state: "multiCollapse",
        views: [
          {
            path: "#pablo",
            name: "Third level menu",
            component: () => {},
            layout: "/",
          },
          {
            path: "#pablo",
            name: "Just another link",
            component: () => {},
            layout: "/",
          },
          {
            path: "#pablo",
            name: "One last link",
            component: () => {},
            layout: "/",
          },
        ],
      },
    ],
  },
  {
    collapse: true,
    name: "Forms",
    icon: "ni ni-single-copy-04 text-pink",
    state: "formsCollapse",
    views: [
      {
        path: "/elements",
        name: "Elements",
        miniName: "E",
        component: Elements,
        layout: "/admin",
      },
      {
        path: "/components",
        name: "Components",
        miniName: "C",
        component: Components,
        layout: "/admin",
      },
      {
        path: "/validation",
        name: "Validation",
        miniName: "V",
        component: Validation,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "Tables",
    icon: "ni ni-align-left-2 text-default",
    state: "tablesCollapse",
    views: [
      {
        path: "/tables",
        name: "Tables",
        miniName: "T",
        component: Tables,
        layout: "/admin",
      },
      {
        path: "/sortable",
        name: "Sortable",
        miniName: "S",
        component: Sortable,
        layout: "/admin",
      },
      {
        path: "/react-bs-table",
        name: "React BS Tables",
        miniName: "RBT",
        component: ReactBSTables,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "Maps",
    icon: "ni ni-map-big text-primary",
    state: "mapsCollapse",
    views: [
      {
        path: "/google",
        name: "Google",
        miniName: "G",
        component: Google,
        layout: "/admin",
      },
      {
        path: "/vector",
        name: "Vector",
        miniName: "V",
        component: Vector,
        layout: "/admin",
      },
    ],
  },
  {
    path: "/widgets",
    name: "Widgets",
    icon: "ni ni-archive-2 text-green",
    component: Widgets,
    layout: "/admin",
  },
  {
    path: "/charts",
    name: "Charts",
    icon: "ni ni-chart-pie-35 text-info",
    component: Charts,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "Profile",
    icon: "ni ni-circle-08 text-green",
    component: Profile,
    layout: "/admin",
    api: true,
    access: ["member", "admin", "creator"]
  },
  {
    path: "/timeline",
    name: "Timeline",
    icon: "ni ni-bullet-list-67 text-dafault",
    component: Timeline,
    layout: "/admin",
    api: true,
    access: ["member", "admin", "creator"]
  },
  {
    path: "/calendar",
    name: "Calendar",
    icon: "ni ni-calendar-grid-58 text-red",
    component: Calendar,
    layout: "/admin",
    api: true,
    access: ["member", "admin", "creator"]
  },
  {
    path: "/add-user",
    name: "Add User",
    icon: "ni ni-fat-add text-orange",
    component: AddUser,
    layout: "/admin",
    api: true,
    access: ["admin"]
  },
  {
    path: "/categories",
    name: "Categories",
    icon: "ni ni-tag text-primary",
    component: Categories,
    layout: "/admin",
    api: true,
    access: ["admin", "creator"]
  },
  {
    path: "/users",
    name: "Users",
    icon: "ni ni-badge text-info",
    component: Users,
    layout: "/admin",
    api: true,
    access: ["admin"]
  },
];

export default routes;
