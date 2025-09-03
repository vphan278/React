// import logo from '../assets/images/logo.svg';

// const Logo = () => {
//     return <img src={logo} alt="jobify" className='logo' />;
// };

// export default Logo;


// import logoUrl from '../assets/react.svg';        // change if you have another svg
// import { FaReact } from 'react-icons/fa';

// export default function Logo() {
//   return (
//     <span style={{ display: 'inline-flex', alignItems: 'center' }}>
//       <img
//         src={logoUrl}
//         alt="App logo"
//         className="logo"
//         onError={(e) => { e.currentTarget.style.display = 'none'; }}
//         style={{ height: 28, display: 'inline-block', marginRight: 8 }}
//       />
//       {/* Fallback icon if the image is hidden or fails */}
//       <FaReact size={22} />
//     </span>
//   );
// }

export default function Logo() {
  return (
    <span
      style={{
        display: 'inline-grid',
        placeItems: 'center',
        width: 28,
        height: 28,
        borderRadius: 8,
        background: '#2cb1bc',
        color: '#fff',
        fontWeight: 700,
        fontFamily: 'system-ui, Arial, sans-serif',
      }}
    >
      J
    </span>
  );
}