import Wrapper from '../assets/wrappers/BigSidebar';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import links from '../utils/links'; // make sure this path is correct

const BigSidebar = () => {
  return (
    <Wrapper>
      <div className="sidebar-container">
        <div className="content">
          <header><Logo /></header>

          <div className="nav-links">
            {links.map(({ text, path, icon }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                end={path === '.'}
              >
                <span className="icon">{icon}</span>
                {text}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;








// // import Wrapper  from "../assets/wrappers/BigSidebar";

// // const BigSidebar = () => {
// //     return <div>BigSidebar</div>;
// // };

// // export default BigSidebar;

// import Wrapper from '../assets/wrappers/BigSidebar';
// import { NavLink } from 'react-router-dom';
// import Logo from './Logo';
// import links from '../utils/links'; // adjust path if different
// import { useDashboardContext } from '../pages/DashboardLayout';

// const BigSidebar = () => {
//   const { showSidebar } = useDashboardContext(); // optional if you animate/collapse

//   return (
//     <Wrapper>
//       <div className={`sidebar-container ${showSidebar ? 'show-sidebar' : ''}`}>
//         <div className="content">
//           <header>
//             <Logo />
//           </header>

//           <div className="nav-links">
//             {links.map(({ text, path, icon }) => (
//               <NavLink
//                 to={path}
//                 key={path}
//                 className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
//                 end={path === '.'}   // exact match for index route
//               >
//                 <span className="icon">{icon}</span>
//                 {text}
//               </NavLink>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Wrapper>
//   );
// };

// export default BigSidebar;