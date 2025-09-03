import styled from 'styled-components';

const Wrapper = styled.aside`
  /* Show this component on mobile only */
  @media (min-width: 992px) {
    display: none;
  }

  .sidebar-container {
    position: fixed;
    inset: 0;                           /* top/right/bottom/left: 0 */
    background: rgba(0,0,0,0.5);        /* dark overlay */
    opacity: 0;
    visibility: hidden;
    transition: opacity .25s ease, visibility .25s ease;
    z-index: 2000;                      /* ensure above navbar/content */
    display: grid;
    align-items: stretch;
  }

  .show-sidebar {
    opacity: 1;
    visibility: visible;
  }

  .content {
    width: 250px;
    max-width: 90vw;
    height: 100%;
    background: var(--white);
    padding: 2rem 1rem;
    transform: translateX(-100%);       /* start off-canvas */
    transition: transform .3s ease;
  }

  .show-sidebar .content {
    transform: translateX(0);           /* slide in */
  }

  .close-btn { margin-bottom: 1rem; }
  .nav-links { display: grid; gap: 1rem; }
  .nav-link { display:flex; align-items:center; gap:.75rem; }
  .nav-link.active { color: var(--primary-500); }
`;

export default Wrapper;