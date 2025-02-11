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
}

export const CategoryIcon = ({ category, size = 24 }: CategoryIconProps) => {
  const iconProps = {
    size,
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
