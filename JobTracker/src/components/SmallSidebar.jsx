import Wrapper from '../assets/wrappers/SmallSidebar';
import { FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useDashboardContext } from '../pages/DashboardLayout';
import Logo from './Logo';
import links from '../utils/links';

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div className={`sidebar-container ${showSidebar ? 'show-sidebar' : ''}`}>
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSidebar} aria-label="Close sidebar">
            <FaTimes />
          </button>

          <header><Logo /></header>

          <div className="nav-links">
            {links.map(({ text, path, icon }) => (
              <NavLink
                to={path}
                key={path}
                onClick={toggleSidebar}                 // close after click
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
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

export default SmallSidebar;