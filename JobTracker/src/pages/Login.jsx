import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
//import { Logo } from '../components';
import { FormRow, Logo } from '../components';


const Login = () => {
  return (
    <Wrapper>
      <form className='form'>
        <Logo />
        <h4>Login</h4>
        <FormRow type='email' name='email' defaultValue='' />
        <FormRow type='password' name='password' defaultValue='' />

        <button type='submit' className='btn btn-block'>Submit</button>
        <button type='button' className='btn btn-block'>Explore the App</button>

        <p>
          Not a member yet?
          <Link to='/register' className='member-btn'>
            Register
          </Link>
        </p>
      </form>
      

    </Wrapper>

    // <div>
    //   <h1>Login Page</h1>
    //   <Link to="/register">Register Page</Link>
    // </div>
  );
}

export default Login




