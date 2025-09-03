import { Link, useRouteError } from 'react-router-dom';
import Wrapper from '../assets/wrappers/LandingPage';
import img from '../assets/images/error.svg';


const Error = () => {
  const error = useRouteError();
  console.error(error);

  if (error.status === 404) {
    return (
      <Wrapper>
        <img src={img} alt="Not Found" />
        <h1>Too bad So Sad, can't find page</h1>
        <Link to="/dashboard">Dashboard</Link>
      </Wrapper>
    );
  }

  // return (
  //   <Wrapper>
  //     <h1>Error Page: 404-Page Not Found</h1>
  //     <Link to="/">Home </Link>
  //   </Wrapper>
  // );
}


export default Error