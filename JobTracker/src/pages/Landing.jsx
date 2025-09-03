import styled from 'styled-components';
import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/main.svg';
import logo from '../assets/images/logo.svg';
import { Link } from 'react-router-dom';

// const StyledBtn = styled.button`
// margin: 20px;
// font-size: 16px;
// padding: 10px 20px;
// background: green;
// color:black;
// border: none;
// border-radius: 5px;
// cursor: pointer;

// &:hover {
//   background-color: blue;
// }
// `;

const Landing = () => {
  return (
    <Wrapper>
    
      <nav>
        <img src={logo} alt="Jobify" className="logo" />
      </nav>

      <div className='container page'>
        <div className='info'>
          <h1>job <span>tracking</span> App</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus fuga natus obcaecati quo expedita praesentium non. Quidem placeat tenetur iste nemo atque et, perferendis cupiditate aliquid veniam quod saepe dicta.
          </p>
          <Link to='/register' className='btn register-link'>
            Register
          </Link>
          <Link to='/login' className='btn '>
            Login
          </Link>
        </div>
        <img src={main} alt="job hunt" className='img main-img' />

      </div>


  

    </Wrapper>
  )
}

// const Wrapper = styled.div`
// background: lightblue;
// h1 {
//   color: white;
// }
// .content {
//   background: blue;
//   color: red;
//   height: 30px;
//   padding: 5px;
// }
// `;

      // <h1>Landing Page</h1>
      // <StyledBtn>Click Me</StyledBtn>

      // <div className="content">
      //   <p>This is the landing page content.</p>
      // </div> 

export default Landing;