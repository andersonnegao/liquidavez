import React from "react";

import { topNavLinks } from "@/data/content";

import Language from "../Language";
import NavigationItem from "../NavItem";
import DarkModeToggle from "../DarkModeToggle";

const TopNav = () => {
  return (
    <div className="hidden bg-primary py-3 lg:block">
      <div className="container flex items-center justify-between text-sm text-white">
        <div className="flex items-center divide-x divide-neutral-100">
          {topNavLinks.map((item) => (
            <NavigationItem menuItem={item} key={item.id} />
          ))}
        </div>
        <div className="flex items-center gap-3 pl-5">
        <DarkModeToggle />
        <Language />
      </div>
      </div>
    </div>
  );
};

export default TopNav;
