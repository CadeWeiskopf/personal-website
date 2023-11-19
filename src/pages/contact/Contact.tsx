import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../../AppContext";
import styles from "./Contact.module.css";
import { EmailData, isEmailData } from "../../data/shared-types/types";
import {
  DataRef,
  generateObject,
  newRef,
} from "../../data/shared-types/data-refs";

const Contact: React.FC = () => {
  const { setShowHeader } = useContext(AppContext);
  useEffect(() => {
    setShowHeader(true);
  }, [setShowHeader]);

  const dataRefs: DataRef[] = [];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!process.env.REACT_APP_EMAIL_SERVICE_URL) {
      throw Error("missing env var REACT_APP_EMAIL_SERVICE_URL");
    }

    const body: EmailData = generateObject(isEmailData, dataRefs);

    const response = await fetch(
      `${process.env.REACT_APP_EMAIL_SERVICE_URL}/email`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
    if (!response.ok || response.status !== 200) {
      throw Error("bad response");
    }

    const responseData = await response.json();
    console.log(responseData);
  };

  return (
    <div className={`main-wrapper-with-header ${styles.wrapper}`}>
      <h1>Contact</h1>
      <form onSubmit={handleSubmit}>
        <h2>Fill out details</h2>
        <input
          ref={newRef(dataRefs, useRef<HTMLInputElement>(null), "firstName")}
          required
          maxLength={100}
        />
        <input
          ref={newRef(dataRefs, useRef<HTMLInputElement>(null), "lastName")}
          required
          maxLength={100}
        />
        <input
          ref={newRef(dataRefs, useRef<HTMLInputElement>(null), "companyName")}
          maxLength={100}
        />
        <input
          ref={newRef(dataRefs, useRef<HTMLInputElement>(null), "email")}
          required
          type="email"
          maxLength={320}
        />
        <input
          ref={newRef(dataRefs, useRef<HTMLInputElement>(null), "phone")}
          type="tel"
          pattern="[0-9]+"
          maxLength={22}
        />

        <input
          ref={newRef(dataRefs, useRef<HTMLInputElement>(null), "priority")}
          type="radio"
          id="low"
          name="fav_language"
          value="low"
        />
        <label htmlFor="low">Low</label>
        <input
          ref={newRef(dataRefs, useRef<HTMLInputElement>(null), "priority")}
          type="radio"
          id="med"
          name="fav_language"
          value="med"
        />
        <label htmlFor="med">Medium</label>
        <input
          ref={newRef(dataRefs, useRef<HTMLInputElement>(null), "priority")}
          type="radio"
          id="high"
          name="fav_language"
          value="high"
        />
        <label htmlFor="high">High</label>

        <textarea
          ref={newRef(dataRefs, useRef<HTMLTextAreaElement>(null), "details")}
          required
          maxLength={500}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
