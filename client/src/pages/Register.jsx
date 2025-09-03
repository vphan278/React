import { FormRow, Logo } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <Wrapper>
      <form className='form'>
        <Logo />
        <h4>Register</h4>
        <FormRow type='text' name='name'  defaultValue='John' />
        <FormRow type='text' name='last Name' labelText='last name' defaultValue='Smith' />
        <FormRow type='text' name='Location'  defaultValue='' />
        <FormRow type='email' name='email' defaultValue='' />
        <FormRow type='password' name='password'  defaultValue='' />

        <button type='submit' className='btn btn-block'>
          submit
        </button>
        <p>
          Already a member?
          <Link to='/login' className='member-btn'>
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;


