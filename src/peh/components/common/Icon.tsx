import React from "react";
import * as LucideIcons from "lucide-react";

export interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 16, className = "" }) => {
  const iconsMap = LucideIcons as unknown as Record<
    string,
    React.ComponentType<{ size?: number; className?: string }>
  >;
  const Component = iconsMap[name] || LucideIcons.Layers;
  return <Component size={size} className={className} />;
};
