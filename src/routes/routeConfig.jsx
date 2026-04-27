import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Members from "../pages/Members";
import Jobs from "../pages/Jobs";
import AddMemberView from "../views/members/AddMemberView";
import MemberProfileView from "../views/members/MemberProfileView";
import PSPIndividuals from "../pages/PSPIndividuals";
import PSPBusinesses from "../pages/PSPBusinesses";
import AddPSPView from "../views/psp-individuals/AddPSPView";
import PSPIndividualProfileView from "../views/psp-individuals/PSPIndividualProfileView";
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
      { path: "psp-individuals", element: <PSPIndividuals /> },
      { path: "psp-businesses", element: <PSPBusinesses /> },
      { path: "psp-individuals/new", element: <AddPSPView /> },
      { path: "jobs", element: <Jobs /> },
      { path: "job/:id", element: <div className="p-6">Job Details View Placeholder</div> },
      { path: "psp-individuals/:id", element: <PSPIndividualProfileView /> },
    ],
  },
];

export default routeConfig;
