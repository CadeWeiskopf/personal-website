import styles from "./header.module.css";
import reactIcon from "../../components/icons/react-icon";
import dockerIcon from "../../components/icons/docker-icon";
import angularIcon from "../../components/icons/angular-icon";
import azureIcon from "../../components/icons/azure-icon";
import awsIcon from "../../components/icons/aws-icon";
import netsuiteIcon from "../../components/icons/netsuite-icon";
import postgresIcon from "../../components/icons/postgres-icon";
import nodeIcon from "../../components/icons/node-icon";
import pyIcon from "../../components/icons/py-icon";
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
    <Link
      to={"/contact"}
      style={{ all: "unset" }}
    >
      <div
        className={styles.nameAndTitleWrapper}
        style={{ alignItems }}
      >
        <div
          className={`${styles.nameWrapper} ${
            initAnimNameAndTitle ? styles.nameWrapperInit : ""
          }`}
        >
          <div className={styles.name}>Cade</div>
          <div className={styles.name}>Weiskopf</div>
        </div>
        <div className={styles.subtitleWrapper}>
          <div className={styles.subtitle}>Software Engineer</div>
        </div>
      </div>
    </Link>
  );
};

const TechStackIcons: React.FC<{ justifyContent: AlignItems }> = ({
  justifyContent,
}) => {
  return (
    <Link
      to={"/contact"}
      style={{ all: "unset" }}
    >
      <div
        className={styles.iconsHeaderWrapper}
        style={{ justifyContent }}
      >
        <div className={styles.iconsWrapper}>
          {pyIcon}
          {nodeIcon}
          {reactIcon}
          {angularIcon}
          {dockerIcon}
          {azureIcon}
          {awsIcon}
          {netsuiteIcon}
          {postgresIcon}
        </div>
      </div>
    </Link>
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
      <TechStackIcons justifyContent={alignItems} />
    </header>
  );
};
