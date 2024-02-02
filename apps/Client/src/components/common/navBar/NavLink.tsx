import {FC} from "react";
import { Link, useLocation } from "react-router-dom";

interface NavLinkProps {
    to: string;
    children: React.ReactNode;
}

const NavLink: FC<NavLinkProps> = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const activeClassName = isActive ? "text-orange-400" : "text-blue-900";

  return (
    <Link
      to={to}
      className={`text-sky-950 hover:text-orange-400 font-normal ${activeClassName}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
