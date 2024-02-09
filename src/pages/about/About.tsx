import { useContext, useEffect } from "react";
import { AppContext } from "../../AppContext";
import styles from "./About.module.css";

type ServicesData = {
  id: number;
  label: string;
  info: string;
};
const data: ServicesData[] = [
  {
    id: 0,
    label: "Automations",
    info: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam eos alias iste, pariatur id quaerat. Necessitatibus ipsam mollitia vero modi, earum inventore magni, minus aperiam culpa doloribus iure qui dolorem.",
  },
  {
    id: 1,
    label: "Integrations",
    info: "",
  },
  {
    id: 2,
    label: "Applications",
    info: "",
  },
];

const About: React.FC = () => {
  const { setShowHeader } = useContext(AppContext);
  useEffect(() => {
    setShowHeader(true);
  }, [setShowHeader]);

  return (
    <div className={styles.wrapper}>
      <div>
        {data.map((d) => (
          <a href={`#${d.id}`}>{d.label}</a>
        ))}
      </div>
      {data.map((d) => (
        <>
          <h1 id={`${d.id}`}>{d.label}</h1>
          <p>{d.info}</p>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </>
      ))}
    </div>
  );
};
export default About;
