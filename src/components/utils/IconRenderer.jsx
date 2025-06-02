import * as FaIcons from "react-icons/fa";

export function IconRenderer({ iconName }) {
// grabs the right icon by name
  const IconComponent = FaIcons[iconName];
  if (!IconComponent) return <span>Invalid icon</span>;
//   returns the icon for display
  return <IconComponent className="text-[#FAF3E0] text-[36px] sm:text-[50px]" />;
}