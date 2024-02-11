import { ReactElement, useContext, useEffect } from "react";
import { AppContext } from "../../AppContext";
import styles from "./About.module.css";

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
        requirements and are designed for user interaction.
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
          reduce errors, increase insight, and streamline processes.
        </div>
        <br />
        <div>
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
        </div>
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
        synchronization, universal data access, and real-time response.
      </>
    ),
  },
  {
    id: "consultation-and-implemntation",
    label: "Consultation & Implementation",
    info: (
      <>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
        itaque magni nam possimus recusandae reiciendis deleniti minima debitis
        cupiditate? Numquam inventore libero itaque quibusdam sint, commodi esse
        corrupti ipsum eum!
      </>
    ),
  },
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
      {data.map((d) => (
        <>
          <h2 id={`${d.id}`}>{d.label}</h2>
          <p>{d.info}</p>
          <br />
        </>
      ))}
    </div>
  );
};
export default About;
