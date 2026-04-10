import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Members from "../pages/Members";
import AddMemberView from "../views/members/AddMemberView";
import MemberProfileView from "../views/members/MemberProfileView";
import MainLayout from "../layouts/MainLayout";
import AuthGuard from "../guards/AuthGuard";

const routeConfig = [
  {
    path: "/login",
    element: (
      <AuthGuard requireAuth={false}>
        <Login />
      </AuthGuard>
    ),
  },
  {
    path: "/",
    element: (
      <AuthGuard requireAuth>
        <MainLayout />
      </AuthGuard>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "members", element: <Members /> },
      { path: "members/new", element: <AddMemberView /> },
      { path: "member/:id", element: <MemberProfileView /> },
    ],
  },
];

export default routeConfig;
