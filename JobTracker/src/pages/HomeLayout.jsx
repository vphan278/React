import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <div>
      {/* <h1>HomeLayout: Client App/Navbar</h1> */}
      
      <Outlet />  
    </div>
  );
};

export default HomeLayout;

