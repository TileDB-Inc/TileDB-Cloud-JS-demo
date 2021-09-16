import React from "react";
import { Menu } from "antd";
import {
  DotChartOutlined,
  RadarChartOutlined
} from "@ant-design/icons";

const MenuComponent = ({ onClick }) => {
  return (
    <Menu mode="inline" style={{ width: 256 }}>
      <Menu.Item onClick={() => onClick('intro')} key="1">
        Introduction
      </Menu.Item>
      <Menu.Item onClick={() => onClick('gtex')} key="2" icon={<DotChartOutlined />}>
        Gtex
      </Menu.Item>
      <Menu.Item onClick={() => onClick('lidar')} key="3" icon={<RadarChartOutlined />}>
        Lidar
      </Menu.Item>
    </Menu>
  );
};

export default MenuComponent;
