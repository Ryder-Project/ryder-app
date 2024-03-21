import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

interface NavProps {
  to: string;
  children: ReactNode;
}

const Nav: FC<NavProps> = ({ to, children }) => (
  <Link to={to} className="text-white hover:text-orange-400 font-normal">
    {children}
  </Link>
);

export const SocialsNav: FC<NavProps> = ({ to, children }) => (
  <Nav to={to} children={children} />
);

export const FooterNav: FC<NavProps> = ({ to, children }) => (
  <Nav to={to} children={children} />
);
