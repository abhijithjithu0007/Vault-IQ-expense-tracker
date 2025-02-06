import {
  Car,
  Bus,
  ShoppingCart,
  Utensils,
  Fuel,
  Home,
  Stethoscope,
  User,
} from "lucide-react";

interface CategoryIconProps {
  category: string;
  size?: number;
  className?: string;
  useCustomColors?: boolean;
}

const categoryColors = {
  Car: "text-blue-500",
  Bus: "text-purple-400",
  Groceries: "text-green-400",
  Food: "text-orange-500",
  Gas: "text-red-500",
  Housing: "text-indigo-500",
  Medical: "text-rose-500",
  Personal: "text-gray-500",
};

export const CategoryIcon = ({
  category,
  size = 24,
  className,
  useCustomColors = true,
}: CategoryIconProps) => {
  const iconColor = useCustomColors
    ? categoryColors[category as keyof typeof categoryColors] || "text-gray-600"
    : className || "text-gray-600";

  const iconProps = {
    size,
    className: iconColor,
  };

  switch (category) {
    case "Car":
      return <Car {...iconProps} />;
    case "Bus":
      return <Bus {...iconProps} />;
    case "Groceries":
      return <ShoppingCart {...iconProps} />;
    case "Food":
      return <Utensils {...iconProps} />;
    case "Gas":
      return <Fuel {...iconProps} />;
    case "Housing":
      return <Home {...iconProps} />;
    case "Medical":
      return <Stethoscope {...iconProps} />;
    case "Personal":
      return <User {...iconProps} />;
    default:
      return <User {...iconProps} />;
  }
};

export default CategoryIcon;
