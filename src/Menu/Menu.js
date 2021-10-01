import React from "react";
import { Menu } from "antd";

const MenuComponent = ({ onClick }) => {
  return (
    <Menu mode="inline" style={{ width: 256 }}>
      <Menu.Item onClick={() => onClick("intro")} key="1">
        Introduction
      </Menu.Item>
      <Menu.Item
        onClick={() => onClick("gtex")}
        key="2"
      >
        Gtex
      </Menu.Item>
      <Menu.Item
        onClick={() => onClick("lidar")}
        key="3"
      >
        Lidar
      </Menu.Item>
      <Menu.Item
        onClick={() => onClick("boulder")}
        key="4"
      >
        Boulder
      </Menu.Item>
      <Menu.Item
        onClick={() => onClick("writeInteractive")}
        key="5"
      >
        Writes (interactive example)
      </Menu.Item>
    </Menu>
  );
};

export default MenuComponent;
