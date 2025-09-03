import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft } from "react-icons/fa";
import Logo from "./Logo";
import { useDashboardContext } from "../pages/DashboardLayout";  // <-- use it

const Navbar = () => {
    const { toggleSidebar } = useDashboardContext();              // <-- get it

    return (
        <Wrapper>
        <div className="nav-center">
            <button
            type="button"
            className="toggle-btn"
            onClick={toggleSidebar}                                // <-- wire it
            aria-label="Toggle sidebar"
            >
            <FaAlignLeft />
            </button>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, lineHeight: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Logo />
                <span className="brand-name">Jobify</span>
            </div>
            </div>

            <div className="btn-container">toggle/logout</div>
        </div>
        </Wrapper>
    );
};

export default Navbar;