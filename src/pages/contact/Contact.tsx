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
    <div className={styles.wrapper}>
      <h1>Contact</h1>
      <form onSubmit={handleSubmit}>
        <h2>Fill out details</h2>

        <div className="input-row">
          <div className="input-wrapper">
            <input
              id="firstName"
              ref={newRef(
                dataRefs,
                useRef<HTMLInputElement>(null),
                "firstName"
              )}
              required
              maxLength={100}
            />
            <label htmlFor="firstName">First</label>
          </div>
          <div className="input-wrapper">
            <input
              id="lastName"
              ref={newRef(dataRefs, useRef<HTMLInputElement>(null), "lastName")}
              required
              maxLength={100}
            />
            <label htmlFor="lastName">Last</label>
          </div>
        </div>

        <div className="input-row">
          <div className="input-wrapper">
            <input
              ref={newRef(
                dataRefs,
                useRef<HTMLInputElement>(null),
                "companyName"
              )}
              maxLength={100}
            />
          </div>
        </div>

        <div className="input-row">
          <div className="input-wrapper">
            <input
              ref={newRef(dataRefs, useRef<HTMLInputElement>(null), "email")}
              required
              type="email"
              maxLength={320}
            />
          </div>
        </div>

        <div className="input-row">
          <div className="input-wrapper">
            <input
              ref={newRef(dataRefs, useRef<HTMLInputElement>(null), "phone")}
              type="tel"
              pattern="[0-9]+"
              maxLength={22}
            />
          </div>
        </div>

        <div className="input-row">
          <div className="input-wrapper">
            <input
              ref={newRef(dataRefs, useRef<HTMLInputElement>(null), "priority")}
              type="radio"
              id="low"
              name="fav_language"
              value="low"
            />
            <label htmlFor="low">Low</label>
          </div>
          <div className="input-wrapper">
            <input
              ref={newRef(dataRefs, useRef<HTMLInputElement>(null), "priority")}
              type="radio"
              id="med"
              name="fav_language"
              value="med"
            />
            <label htmlFor="med">Medium</label>
          </div>
          <div className="input-wrapper">
            <input
              ref={newRef(dataRefs, useRef<HTMLInputElement>(null), "priority")}
              type="radio"
              id="high"
              name="fav_language"
              value="high"
            />
            <label htmlFor="high">High</label>
          </div>
        </div>

        <div className="input-row">
          <div className="input-wrapper">
            <textarea
              ref={newRef(
                dataRefs,
                useRef<HTMLTextAreaElement>(null),
                "details"
              )}
              required
              maxLength={500}
              rows={5}
            />
          </div>
        </div>

        <div className="input-row">
          <div className="input-wrapper">
            <input
              ref={newRef(
                dataRefs,
                useRef<HTMLInputElement>(null),
                "agreeToTerms"
              )}
              type="checkbox"
              id="terms"
              required
            />
            <label htmlFor="terms">
              By clicking I agree Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Atque aut, a quos, eaque necessitatibus
              reprehenderit sit, sint incidunt laudantium facere non expedita!
              Odio est magni, accusamus laudantium autem sed sapiente
            </label>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
