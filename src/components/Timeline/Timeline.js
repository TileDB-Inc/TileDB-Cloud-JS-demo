import React from "react";
import { Timeline } from "antd";
import { ClockCircleOutlined, CheckOutlined } from "@ant-design/icons";

const TimelineComp = ({ loading, items = [] }) => {
  return (
    <Timeline className="timeline-list" pending={loading}>
      {items.map((item, i) => {
        const { text, type = "" } = item;
        const color = type === "success" ? "blue" : "red";
        if (type === "completed") {
          return (
            <Timeline.Item key={i} dot={<CheckOutlined />} color="green">
              {text}
            </Timeline.Item>
          );
        } else if (type === "stopping") {
          return (
            <Timeline.Item key={i} dot={<ClockCircleOutlined />} color="red">
              {text}
            </Timeline.Item>
          );
        }
        return (
          <Timeline.Item key={i} color={color}>
            {text}
          </Timeline.Item>
        );
      })}
    </Timeline>
  );
};

export default TimelineComp;
