import React from "react";

interface BottomNavIconProps {
  icon: React.ReactNode;
  label: string;
  isSelected: boolean;
}

const BottomNavIcon: React.FC<BottomNavIconProps> = ({
  icon,
  label,
  isSelected,
}) => (
  <div
    style={{
      textAlign: "center",
      cursor: "pointer",
      color: isSelected ? "#000" : "#888",
    }}
  >
    <div>{icon}</div>
    <div style={{ fontSize: "12px", marginTop: "4px" }}>{label}</div>
  </div>
);

export default BottomNavIcon;
