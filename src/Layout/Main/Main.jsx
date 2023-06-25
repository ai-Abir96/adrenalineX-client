import { Outlet } from "react-router-dom";
import Navbar from "../../components/Shared/Navbar/Navbar";
import Footer from "../../components/Shared/Footer/Footer";
import { useContext } from "react";
import { ThemeContext } from "../../utils/providers/ThemeProvider";

const Main = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={theme}>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
