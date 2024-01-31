import styles from "./header.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export enum AlignItems {
  FlexStart = "flex-start",
  Center = "center",
  FlexEnd = "flex-end",
}

const NameAndTitle: React.FC<{
  alignItems: AlignItems;
  initAnim: boolean;
}> = ({ alignItems, initAnim }) => {
  const [initAnimNameAndTitle, setInitAnimNameAndTitle] = useState(initAnim);

  useEffect(() => {
    if (!initAnim) {
      return;
    }

    setInitAnimNameAndTitle(true);
    const disableInitAnimNameAndTitle = setTimeout(() => {
      setInitAnimNameAndTitle(false);
    }, 1500);
    return () => {
      clearTimeout(disableInitAnimNameAndTitle);
    };
  }, [initAnim]);

  return (
    <div
      className={styles.nameAndTitleWrapper}
      style={{ alignItems }}
    >
      <Link
        to={"/contact"}
        style={{ all: "unset" }}
      >
        <div
          className={`${styles.nameWrapper} ${
            initAnimNameAndTitle ? styles.nameWrapperInit : ""
          }`}
        >
          <div className={styles.name}>Cade</div>
          <div className={styles.name}>Weiskopf</div>
        </div>
      </Link>
      <Link
        to={"/about"}
        style={{ all: "unset" }}
      >
        <div className={styles.subtitleWrapper}>
          <div className={styles.subtitle}>Software Engineer</div>
        </div>
      </Link>
    </div>
  );
};

export const Header: React.FC<{
  alignItems: AlignItems;
  initAnim: boolean;
  smallText: boolean;
}> = ({ alignItems, initAnim, smallText }) => {
  if (smallText) {
    document.documentElement.style.setProperty("--name-letters-size", "1rem");
    document.documentElement.style.setProperty(
      "--name-first-letter-size",
      "2rem"
    );
  } else {
    document.documentElement.style.setProperty("--name-letters-size", "2rem");
    document.documentElement.style.setProperty(
      "--name-first-letter-size",
      "4rem"
    );
  }
  return (
    <header className={styles.wrapper}>
      <NameAndTitle
        alignItems={alignItems}
        initAnim={initAnim}
      />
    </header>
  );
};
