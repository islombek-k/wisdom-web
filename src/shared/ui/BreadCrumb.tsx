import React from "react";
import { ChevronRight } from "../assets/icons";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  containerClassName?: string;
  itemClassName?: string;
  activeItemClassName?: string;
  separatorClassName?: string;
  maxWidth?: string;
  showBackground?: boolean;
}

const BreadCrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = <ChevronRight />,
  containerClassName = "bg-white font-bold",
  itemClassName = "text-sm font-medium text-breadcrumb-label-secondary hover:backdrop-opacity-90 transition-opacity",
  activeItemClassName = "text-sm text-breadcrumb-label cursor-default",
  separatorClassName = "",
  showBackground = true,
}) => {
  const handleItemClick = (item: BreadcrumbItem, event: React.MouseEvent) => {
    if (item.onClick) {
      event.preventDefault();
      item.onClick();
    }
  };

  const renderItem = (item: BreadcrumbItem, index: number) => {
    const isLast = index === items.length - 1;
    const isActive = item.isActive ?? isLast;
    const className = isActive ? activeItemClassName : itemClassName;

    if (item.href && !isActive) {
      return (
        <a
          key={index}
          href={item.href}
          onClick={(e) => handleItemClick(item, e)}
          className={className}
        >
          {item.label}
        </a>
      );
    }

    return (
      <span
        key={index}
        onClick={item.onClick ? () => item.onClick!() : undefined}
        className={className}
        role={item.onClick ? "button" : undefined}
        tabIndex={item.onClick ? 0 : undefined}
        onKeyDown={
          item.onClick
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  item.onClick!();
                }
              }
            : undefined
        }
      >
        {item.label}
      </span>
    );
  };

  return (
    <div className={showBackground ? containerClassName : ""}>
      <nav
        className={`flex items-center gap-3 py-4 mx-auto px-25`}
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center gap-3">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-3">
              {renderItem(item, index)}
              {index < items.length - 1 && (
                <span className={separatorClassName} aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default BreadCrumb;
