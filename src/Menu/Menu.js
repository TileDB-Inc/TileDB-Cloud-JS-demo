import React from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import routePaths from "../constants/routePaths/routePaths";

const MenuComponent = () => {
  let location = useLocation();
  const selectedItem = Object.values(routePaths).findIndex(
    (p) => p === location.pathname
  );

  return (
    <Menu
      mode="inline"
      style={{ width: 256 }}
      defaultSelectedKeys={[String(selectedItem)]}
    >
      <Menu.Item key="0">
        <Link to={routePaths.root}>Introduction</Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to={routePaths.gtex}>Gtex</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to={routePaths.lidar}>Lidar</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to={routePaths.boulder}>Boulder</Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to={routePaths.writes}>Writes</Link>
      </Menu.Item>
    </Menu>
  );
};

export default MenuComponent;
