//import { createBrowserRouter} from "react-router-dom";
import {RouterProvider, createBrowserRouter} from 'react-router-dom';


import {
  HomeLayout,
  Landing,
  Login,
  Register,
  DashboardLayout,
  Dashboard,
  Error,
  Admin,
  DeleteJob,
  EditJob,
  Profile,
  Stats,
  AddJob,
  AllJobs
} from './pages';


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Landing /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'addjob', element: <AddJob /> },
          { path: 'admin', element: <Admin /> },
          { path: 'alljobs', element: <AllJobs /> },
          { path: 'deletejob', element: <DeleteJob /> },
          { path: 'editjob', element: <EditJob /> },
          { path: 'profile', element: <Profile /> },
          { path: 'stats', element: <Stats /> },
        ],
      },
    ],
  },
]);


const App = () => {
  return <RouterProvider router={router} />;

}

export default App;

