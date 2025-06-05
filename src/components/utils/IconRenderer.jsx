import * as FaIcons from "react-icons/fa";

export function IconRenderer({ iconName,size,color }) {
// grabs the right icon by name
  const IconComponent = FaIcons[iconName];
  if (!IconComponent) return <span>Invalid icon</span>;
//   returns the icon for display
  return <IconComponent style={{color:color,fontSize:size}}  />;
}