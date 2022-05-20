import React, { useState } from "react";
import styles from "./Sidebar.module.sass";
import { Link, NavLink } from "react-router-dom";
import cn from "classnames";
import Icon from "../Icon";
import Theme from "../Theme";
import Image from "../Image";
import Dropdown from "../SidebarDropdown";
import { compareArrays } from "../../utils";

const navigation = [
  {
    title: "Website Metrics",
    icon: "activity",
    url: "/",
  },
  {
    title: "Social Media Metrics",
    icon: "message",
    url: "/dashboard/social-media-analysis",
  },
  {
    title: "Operations",
    icon: "filter",
    url: "/dashboard/ops-performance",
  },
  {
    title: "Market Analysis",
    icon: "pie-chart",
    slug: "dashboard",
    dropdown: [
      {
        title: "Card Market",
        url: "/dashboard/market-analysis",
      },
      {
        title: "Comic Market",
        icon: "grid",
        url: "/dashboard/comic-market-analysis",
      },
    ],
  },

  {
    title: "Financial Performance",
    icon: "lock",
    slug: "financial",
    permission: ["dev", "admin", "financial"],
    dropdown: [
      {
        title: "Financials",
        url: "/financial/financial-performance",
      },
      {
        title: "ROI",
        url: "/financial/roi-performance",
      },
    ],
  },
  {
    title: "Card Grading",
    icon: "ticket",
    slug: "grading",
    permission: ["dev", "admin", "grading"],
    dropdown: [
      {
        title: "Update data",
        url: "/grading/grading-update-data",
      },
      {
        title: "Grading settings",
        url: "/grading/grading-settings",
      },
    ],
  },
  // {
  //   title: "Card Grading",
  //   icon: "filter",
  //   // url: "/dashboard/web-analysis",
  //   url: "/private",
  //   permission: ["admin", "grading"],
  //   dropdown: [
  //     {
  //       title: "Operations",
  //       url: "/private/ops-performance",
  //     },
  //     {
  //       title: "Update data",
  //       url: "/private/grading-update-data",
  //     },
  //   ],
  // },
  {
    title: "Settings",
    icon: "setting",
    url: "/settings",
  },
];

const Sidebar = ({ className, onClose, signOut, user, allUsers }) => {
  const [visible, setVisible] = useState(false);

  // console.log({ currentsename: user, allUserPool: allUsers });

  //Update
  const userPermissions =
    user.signInUserSession.idToken.payload?.["cognito:groups"];

  //Function to map out the nav items

  const mapNav = (item, num) => {
    return item.url ? (
      <NavLink
        className={styles.item}
        activeClassName={styles.active}
        style={({ isActive }) => {
          return {
            color: isActive ? "white" : "",
            boxShadow: isActive
              ? "inset 0px -2px 1px rgba(0, 0, 0, 0.4), inset 0px 1px 1px rgba(255, 255, 255, 0.11)"
              : "",
            backgroundColor: isActive ? "#272B30" : "",
          };
        }}
        to={item.url}
        key={num}
        exact
        onClick={onClose}
      >
        <Icon name={item.icon} size="24" />
        {item.title}
      </NavLink>
    ) : (
      <Dropdown
        className={styles.dropdown}
        visibleSidebar={visible}
        setValue={setVisible}
        key={num}
        item={item}
        onClose={onClose}
      />
    );
  };

  return (
    <>
      <div
        className={cn(styles.sidebar, className, { [styles.active]: visible })}
      >
        <button className={styles.close} onClick={onClose}>
          <Icon name="close" size="24" />
        </button>
        <Link className={styles.logo} to="/" onClick={onClose}>
          <Image
            className={styles.pic}
            src="/images/Beckett-Logo-Full-Wordmark-White-LG.png"
            srcDark="/images/Beckett-Logo-Full-Wordmark-White-LG.png"
            alt="beckett-logo"
          />
        </Link>
        <div className={styles.menu}>
          {navigation.map((x, index) =>
            x.permission
              ? compareArrays(x.permission, userPermissions) && mapNav(x, index)
              : mapNav(x, index)
          )}
        </div>

        <div className={styles.foot}>
          <button className={styles.link} onClick={signOut}>
            <Icon name="lock" size="24" />
            Logout
          </button>
          <Theme className={styles.theme} visibleSidebar={visible} />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
