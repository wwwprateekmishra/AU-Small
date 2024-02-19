import { useContext } from "react";
import DasboardContext from "../context/DashboardContext";

const useDashboard = () => useContext(DasboardContext)
export default useDashboard;