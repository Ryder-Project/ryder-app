import { FC } from "react";
import { FooterNav, SocialsNav } from "./Nav";
import {
  FacebookLogo,
  LinkedInLogo,
  TwitterLogo,
  GoogleLogo,
  RyderWhiteLogo,
} from "../../../../assets/svg";
import MaxContainer from "../MaxContainer";

const Footer: FC = () => {
  return (
    <>
      <nav className="bg-gray-800 flex-column">
        <MaxContainer className="py-10 mt-10">
          <div className="container  flex justify-between items-center mb-3">
            {/* Ryder Logo and Text */}
            <div className="flex items-center">
              <RyderWhiteLogo />
              <span className="font-bold text-2xl text-white pl-2">Ryder </span>
              {/* <span className="font-bold text-lg text-white pl-2">Dispatch <br/> Buddy</span> */}
            </div>

            {/* Navigation Links */}
            <div className="flex gap-6 items-center text-bold">
              <FooterNav to="/">Home</FooterNav>
              <FooterNav to="/about">About Us</FooterNav>
              <FooterNav to="/services">FAQ</FooterNav>
              <FooterNav to="/contact">Contact Us</FooterNav>
            </div>

            {/* Socials Navigation Links */}
            <div className="flex gap-4">
              <SocialsNav to="/">
                <FacebookLogo />
              </SocialsNav>
              <SocialsNav to="/about">
                <TwitterLogo />
              </SocialsNav>
              <SocialsNav to="/services">
                <LinkedInLogo />
              </SocialsNav>
              <SocialsNav to="/contact">
                <GoogleLogo />
              </SocialsNav>
            </div>
          </div>

          <div className="container  flex justify-between items-center text-sm">
            {/* Text */}
            <div className="flex  text-white">© 2022 All rights reserved</div>

            {/* Navigation Links */}
            <div className="flex gap-10">
              <FooterNav to="/privacy-policy">Privacy Policy</FooterNav>
              <FooterNav to="/TOC">Terms of Conditions</FooterNav>
              <FooterNav to="/legal">Legal</FooterNav>
              <FooterNav to="/help">Help</FooterNav>
            </div>

            {/*  Version */}
            <div className="text-white font-normal">English Version</div>
          </div>
        </MaxContainer>
      </nav>
    </>
  );
};

export default Footer;
