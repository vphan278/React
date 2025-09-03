import styled from 'styled-components';

const Wrapper = styled.aside`
  /* default is hidden… */
  display: none;

  /* SHOW on phones/tablets too */
  @media (max-width: 991px) {
    display: block;

    .sidebar-container {
      position: sticky;
      top: 0;
      height: 100vh;
      width: 220px;                  /* narrower for small screens */
      background: var(--white);
      box-shadow: var(--shadow-2);
      margin-left: 0;
      overflow-y: auto;
    }

    .content { padding: 1.5rem 1rem; }
    header {
      height: 5rem;
      display: flex;
      align-items: center;
      padding-left: 1rem;
      margin-bottom: 1rem;
    }
    .nav-links { padding-top: 1rem; display: grid; gap: .75rem; }
    .nav-link  { display:flex; align-items:center; gap:.75rem; padding: .75rem 0 .75rem 1rem; }
    .nav-link.active { color: var(--primary-500); }
    .icon { font-size: 1.25rem; margin-right: .75rem; display:grid; place-items:center; }
  }

  /* your existing desktop styles unchanged */
  @media (min-width: 992px) {
    display: block;

    .sidebar-container {
      position: sticky;
      top: 0;
      height: 100vh;
      width: 250px;
      background: var(--white);
      box-shadow: var(--shadow-2);
      margin-left: 0;
      overflow-y: auto;
    }

    .content { padding: 2rem 1rem; }
    .show-sidebar { margin-left: 0; }
    header {
      height: 6rem;
      display: flex;
      align-items: center;
      padding-left: 2.5rem;
      margin-bottom: 2rem;
    }
    .nav-links { 
      padding-top: 2rem; display: grid; gap:1rem; }
    .nav-link  { 
      display:flex; align-items:center; gap:.75rem; color: var(--text-secondary-color);
      padding: 1rem 0 1rem 2.5rem; transition: padding-left .3s ease-in-out; }
    .nav-link.active { color: var(--primary-500); }
    .nav-link:hover { padding-left: 3rem; color: var(--primary-500); transition: var(--transition); }
    .icon { font-size: 1.5rem; margin-right: 1rem; display:grid; place-items:center; }
    .active { color: var(--primary-500); }
    .pending { background: var(--background-color); }
  }
`;

export default Wrapper;