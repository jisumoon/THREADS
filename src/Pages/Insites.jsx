import { useMediaQuery } from "react-responsive";
import Sidebar from "../Components/Sidebar";
import Insiteitem_de from "../Components/Login/Insiteitem_de";

const Insites = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 769px) and (max-width: 1024px)",
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Sidebar />
      <Insiteitem_de isSmallScreen={isSmallScreen} isTablet={isTablet} />
    </div>
  );
};

export default Insites;
