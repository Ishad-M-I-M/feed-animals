import { Outlet } from "react-router-dom";

import '../styles/Layout.css';

export const Layout = () => {
  return (
    <div className="layout">
      <Outlet />
    </div>
  );
};
