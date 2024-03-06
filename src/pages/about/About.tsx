import { ReactElement, useContext, useEffect } from "react";
import { AppContext } from "../../AppContext";
import styles from "./About.module.css";
import { Link } from "react-router-dom";

type ServicesData = {
  id: string;
  label: string;
  info: ReactElement;
};
const data: ServicesData[] = [
  {
    id: "apps",
    label: "Applications",
    info: (
      <>
        Applications are tailored tools that help turn processes into their most
        efficient form. Applications can be customized to meet specific
        requirements and are designed for user interaction. These include
        desktop apps, mobile apps, websites, webservers, or even command line
        apps.
      </>
    ),
  },
  {
    id: "automations",
    label: "Automations",
    info: (
      <>
        <div>
          Automation involves programming software to do repeatable tasks in an
          efficient manner. By automating operational procedures you are able to
          reduce errors, increase insight, and streamline processes. Some
          implementations include webscrapers, webcrawlers, or background
          services.
        </div>

        {/* <br /> <div>
          <h3>Automation Checklist</h3>
          <div
            style={{
              border: "1px solid",
              justifyContent: "space-between",
              display: "flex",
              padding: "0 3em",
              flexWrap: "wrap",
            }}
          >
            <div className={styles.acCard}>
              <div>Accuracy</div>
              <div>check</div>
              <div>check</div>
              <div>check</div>
              <div>check</div>
            </div>
            <div className={styles.acCard}>
              <div>Stability</div>
              <div>check</div>
              <div>check</div>
              <div>check</div>
              <div>check</div>
            </div>
            <div className={styles.acCard}>
              <div>Security</div>
              <div>check</div>
              <div>check</div>
              <div>check</div>
              <div>check</div>
            </div>
          </div>
        </div> */}
      </>
    ),
  },
  {
    id: "integrations",
    label: "Integrations",
    info: (
      <>
        Integrations connect systems used by a company to increase data
        consistency and availability. Integrating platforms is key in quick
        synchronization, universal data access, and real-time response. Creating
        an integration involves working with platform APIs and developing the
        services that communicate between the APIs.
      </>
    ),
  },
  // {
  //   id: "devops",
  //   label: "DevOps",
  //   info: (
  //     <>
  //       DevOps has the goal of making development and deployment of software
  //       within organizations easier.
  //     </>
  //   ),
  // },
];

const About: React.FC = () => {
  const { setShowHeader } = useContext(AppContext);
  useEffect(() => {
    setShowHeader(true);
  }, [setShowHeader]);

  return (
    <div className={styles.wrapper}>
      <h1>Services</h1>
      <div className={styles.linksWrapper}>
        {data.map((d) => (
          <a href={`#${d.id}`}>{d.label}</a>
        ))}
      </div>
      <br />
      <div>
        At the core of all software implementations is a strong understanding of
        business goals. These services cater to unique requirements and
        accommodate specific problems. I am well-equipped to work with various
        types of technology and can determine the optimal stack for a solution
        when building from the ground up. All solutions are crafted with the
        goal of ensuring long-term stability, scalability, and security.
        Additionally, I prioritize providing comprehensive documentation for all
        aspects and ensure a smooth transition through User Acceptance Testing
        (UAT).
        <br />
        <br />
        Please reach out if you would like to know more at{" "}
        <Link
          to="/contact"
          style={{ color: "var(--text-primary)" }}
        >
          my contact page
        </Link>
        .
      </div>
      {data.map((d) => (
        <>
          <h2 id={`${d.id}`}>{d.label}</h2>
          <p className={styles.infoWrapper}>{d.info}</p>
        </>
      ))}
    </div>
  );
};
export default About;
