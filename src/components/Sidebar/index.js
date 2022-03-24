import React, { useState } from "react";
import styles from "./Sidebar.module.sass";
import { Link, NavLink } from "react-router-dom";
import cn from "classnames";
import Icon from "../Icon";
import Theme from "../Theme";
import Image from "../Image";
import Dropdown from "../SidebarDropdown";

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
    title: "Card Grading",
    icon: "filter",
    // url: "/dashboard/web-analysis",
    url: "/dashboard/web-analysis",
  },
];

const Sidebar = ({ className, onClose, signOut }) => {
  const [visible, setVisible] = useState(false);
  const [visibleHelp, setVisibleHelp] = useState(false);

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
            x.url ? (
              <NavLink
                className={styles.item}
                activeClassName={styles.active}
                to={x.url}
                key={index}
                exact
                onClick={onClose}
              >
                <Icon name={x.icon} size="24" />
                {x.title}
              </NavLink>
            ) : (
              <Dropdown
                className={styles.dropdown}
                visibleSidebar={visible}
                setValue={setVisible}
                key={index}
                item={x}
                onClose={onClose}
              />
            )
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
