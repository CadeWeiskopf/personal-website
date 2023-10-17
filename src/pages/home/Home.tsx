import { createRef, useContext, useEffect, useState } from "react";
import styles from "./Home.module.css";
import { AppContext } from "../../AppContext";
import reactIcon from "../../components/icons/react-icon";
import dockerIcon from "../../components/icons/docker-icon";
import angularIcon from "../../components/icons/angular-icon";
import azureIcon from "../../components/icons/azure-icon";
import awsIcon from "../../components/icons/aws-icon";
import netsuiteIcon from "../../components/icons/netsuite-icon";
import postgresIcon from "../../components/icons/postgres-icon";
import nodeIcon from "../../components/icons/node-icon";
import pyIcon from "../../components/icons/py-icon";

export enum AlignItems {
  FlexStart = "flex-start",
  Center = "center",
  FlexEnd = "flex-end",
}

export const NameAndTitle: React.FC<{
  alignItems: AlignItems;
  initAnim: boolean;
}> = ({ alignItems, initAnim }) => {
  return (
    <>
      <div
        className={styles.nameAndTitleWrapper}
        style={{ alignItems }}
      >
        <div
          className={`${styles.nameWrapper} ${
            initAnim ? styles.nameWrapperInit : ""
          }`}
        >
          <div className={styles.name}>Cade</div>
          <div className={styles.name}>Weiskopf</div>
        </div>
        <div className={styles.subtitleWrapper}>
          <div className={styles.subtitle}>&lt;Software Engineer&gt;</div>
        </div>
      </div>
    </>
  );
};

export const TechStackIcons: React.FC<{ justifyContent: AlignItems }> = ({
  justifyContent,
}) => {
  return (
    <div
      className={styles.iconsWrapper}
      style={{ justifyContent }}
    >
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
  );
};

const Home: React.FC = () => {
  const { setShowHeader } = useContext(AppContext);
  const [initAnimNameAndTitle, setInitAnimNameAndTitle] = useState(false);

  useEffect(() => {
    setInitAnimNameAndTitle(true);
    const disableInitAnimNameAndTitle = setTimeout(() => {
      setInitAnimNameAndTitle(false);
    }, 1500);
    return () => {
      clearTimeout(disableInitAnimNameAndTitle);
    };
  }, []);

  useEffect(() => {
    setShowHeader(false);
  }, [setShowHeader]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.infoWrapper}>
        <NameAndTitle
          alignItems={AlignItems.Center}
          initAnim={initAnimNameAndTitle}
        />
        <br />
        <TechStackIcons justifyContent={AlignItems.Center} />
        <br />
        <div className={styles.quoteAndAuthorWrapper}>
          <div className={styles.quoteWrapper}>
            <div className={styles.quote}>
              The only way to do great work is to love what you do.
            </div>
          </div>
          <div className={styles.quoteAuthor}>Steve Jobs</div>
        </div>
      </div>
    </div>
  );
};
export default Home;
