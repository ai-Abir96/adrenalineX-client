import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import NavbarContent from "./NavbarContent";

const Navbar = () => {
  const [showSlateNavbar, setShowSlateNavbar] = useState(true);
  const [showWhiteNavbar, setShowWhiteNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (currentScrollPos === 0) {
        setShowSlateNavbar(true);
        setShowWhiteNavbar(false);
      } else if (!showWhiteNavbar && currentScrollPos > 0) {
        setShowSlateNavbar(false);
        setShowWhiteNavbar(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showWhiteNavbar]);

  const options = {
    hidden: { y: "-100%" },
    visible: { y: 0 },
  };

  return (
    <>
      {showSlateNavbar && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={options}
          transition={{ duration: 0.5 }}
          className="navbar  2xl:px-[300px] xl:px-[100px] lg:px-[50px] md:px-[30px] px-[10px] fixed z-20 bg-slate-900 bg-opacity-30 text-white flex"
        >
          <NavbarContent />
        </motion.div>
      )}
      {showWhiteNavbar && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={options}
          transition={{ duration: 0.5 }}
          className="navbar 2xl:px-[300px] xl:px-[100px] lg:px-[50px]  md:px-[30px] px-[10px] fixed z-10 bg-slate-100 text-[#151414] flex"
        >
          <NavbarContent />
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
