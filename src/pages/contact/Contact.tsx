import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../../AppContext";
import styles from "./Contact.module.css";

type IDataRef = {
  ref: React.RefObject<any>;
  refName: string;
};

const Contact: React.FC = () => {
  const { setShowHeader } = useContext(AppContext);
  useEffect(() => {
    setShowHeader(true);
  }, [setShowHeader]);

  const dataRefs: IDataRef[] = [
    {
      ref: useRef<HTMLInputElement>(null),
      refName: "firstName",
    },
    {
      ref: useRef<HTMLInputElement>(null),
      refName: "lastName",
    },
    {
      ref: useRef<HTMLInputElement>(null),
      refName: "companyName",
    },
    {
      ref: useRef<HTMLInputElement>(null),
      refName: "email",
    },
    {
      ref: useRef<HTMLInputElement>(null),
      refName: "phone",
    },
  ];
  const getDataRef = (refName: string): IDataRef => {
    const dataRef = dataRefs.find((e) => e.refName === refName);
    if (!dataRef) {
      throw Error(`No dataRef in dataRefs with refName=${refName}`);
    }
    return dataRef;
  };
  const checkRefCurrent = (dataRef: IDataRef) => {
    if (!!dataRef.ref.current) {
      return true;
    }
    throw Error(`Missing ref: ${dataRef.refName}`);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!process.env.REACT_APP_EMAIL_SERVICE_URL) {
      throw Error("missing env var REACT_APP_EMAIL_SERVICE_URL");
    }
    dataRefs.forEach((e) => checkRefCurrent(e));

    console.log("submit");
    const response = await fetch(
      `${process.env.REACT_APP_EMAIL_SERVICE_URL}/email`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{}",
      }
    );
    console.log(response);
  };

  return (
    <div className={`main-wrapper-with-header ${styles.wrapper}`}>
      <h1>Contact</h1>
      <form onSubmit={handleSubmit}>
        <h2>Fill out details</h2>

        <input
          ref={getDataRef("firstName").ref}
          required
        />
        <input
          ref={getDataRef("lastName").ref}
          required
        />
        <input ref={getDataRef("companyName").ref} />
        <input
          ref={getDataRef("email").ref}
          required
          type="email"
        />
        <input ref={getDataRef("phone").ref} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
