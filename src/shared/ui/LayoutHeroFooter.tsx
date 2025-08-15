import type { ReactNode } from "react";
import { Footer } from "./Footer";
import HeroHeader from "./HeroHeader";
import BreadCrumb, { type BreadcrumbProps } from "./BreadCrumb";

const LayoutHeroFooter = ({
  children,
  breadcrumb,
}: {
  children: ReactNode;
  breadcrumb: BreadcrumbProps["items"];
}) => {
  return (
    <>
      <HeroHeader />
      <BreadCrumb items={breadcrumb} />
      <div className="px-25 mx-auto">{children}</div>
      <Footer />
    </>
  );
};

export default LayoutHeroFooter;
