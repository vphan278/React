import { createContext, useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BigSidebar from '../components/BigSidebar';
import SmallSidebar from '../components/SmallSidebar';

const DashboardContext = createContext(null);
// eslint-disable-next-line react-refresh/only-export-components
export const useDashboardContext = () => useContext(DashboardContext);

export default function DashboardLayout() {
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => setShowSidebar(s => !s);
  const closeSidebar = () => setShowSidebar(false);

  return (
    <DashboardContext.Provider value={{ showSidebar, toggleSidebar, closeSidebar }}>
      <main className="dashboard">
        {/* <SmallSidebar /> */}
        <BigSidebar />       {/* <-- must be here */}
      <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
      </div>
</main>
    </DashboardContext.Provider>
  );
}













// import { Outlet } from 'react-router-dom';
// import Wrapper from '../assets/wrappers/Dashboard';
// import { BigSidebar, SmallSidebar, Navbar } from '../components';
// import { useState, createContext, useContext } from 'react';

// const DashboardContext = createContext(null);

// const DashboardLayout = () => {
//   // temp
//   const _user = { name: 'John' };
//   const [_showSidebar, setShowSidebar] = useState(false);
//   const [_isDarkTheme] = useState(false);

//   const _toggleDarkTheme = () => {
//     console.log('toggle dark theme');
//   };

//   const _toggleSidebar = () => {
//     setShowSidebar(s => !s);
//   };

//   const _logoutUser = async () => {
//     console.log('logout user');
//   };

//   return (
//     <DashboardContext.Provider
//       value={{
//         user: _user,
//         showSidebar: _showSidebar,
//         isDarkTheme: _isDarkTheme,
//         toggleDarkTheme: _toggleDarkTheme,
//         toggleSidebar: _toggleSidebar,
//         logoutUser: _logoutUser,
//       }}
//     >
//       <Wrapper>
//         {/* <h1>DashboardLayout: Client App</h1> */}
//         <main className="dashboard">
//           <SmallSidebar />
//           <BigSidebar />
//           <div>
//             <Navbar />
//             <div className="dashboard-page">
//               <Outlet />
//             </div>
//           </div>
//         </main>
//       </Wrapper>
//     </DashboardContext.Provider>
//   );
// };

// // eslint-disable-next-line react-refresh/only-export-components
// export const useDashboardContext = () => useContext(DashboardContext);

// export default DashboardLayout;


