import { useContext, useEffect } from "react";
import { AppContext } from "../../AppContext";
import styles from "./Contact.module.css";
import { EmailData, isEmailData } from "../../data/shared-types/types";
import { Form } from "../../data/shared-types/data-refs";
import InputWrapper, { InputTypes } from "../../components/inputs/InputWrapper";

const Contact: React.FC = () => {
  const { setShowHeader } = useContext(AppContext);
  useEffect(() => {
    setShowHeader(true);
  }, [setShowHeader]);

  const form = new Form();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!process.env.REACT_APP_EMAIL_SERVICE_URL) {
      throw Error("missing env var REACT_APP_EMAIL_SERVICE_URL");
    }

    const body: EmailData = form.data(isEmailData);
    console.log(body);

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
          <InputWrapper
            inputType={InputTypes.INPUT}
            inputRef={form.ref<HTMLInputElement>("firstName")}
            label="First"
            attributes={{ required: true }}
          />
          <InputWrapper
            inputType={InputTypes.INPUT}
            inputRef={form.ref<HTMLInputElement>("lastName")}
            label="Last"
            attributes={{ required: true }}
          />
        </div>

        <div className="input-row">
          <InputWrapper
            inputType={InputTypes.INPUT}
            inputRef={form.ref<HTMLInputElement>("companyName")}
            label="Company"
            attributes={{ maxLength: 1 }}
          />
        </div>

        <div className="input-row">
          <div className="input-wrapper">
            <InputWrapper
              inputType={InputTypes.INPUT}
              inputRef={form.ref<HTMLInputElement>("email")}
              label="Email"
              attributes={{ type: "email", required: true }}
            />
          </div>
        </div>

        <div className="input-row">
          <InputWrapper
            inputType={InputTypes.INPUT}
            inputRef={form.ref<HTMLInputElement>("phone")}
            label="Phone"
            attributes={{ type: "tel", maxLength: 22, pattern: "[0-9]+" }}
          />
        </div>

        <div className="input-row">
          <InputWrapper
            inputType={InputTypes.INPUT}
            inputRef={form.ref<HTMLInputElement>("priority")}
            label="Low"
            attributes={{
              type: "radio",
              name: "priority",
              value: "low",
              required: true,
            }}
          />
          <InputWrapper
            inputType={InputTypes.INPUT}
            inputRef={form.ref<HTMLInputElement>("priority")}
            label="Medium"
            attributes={{
              type: "radio",
              name: "priority",
              value: "medium",
              required: true,
            }}
          />
          <InputWrapper
            inputType={InputTypes.INPUT}
            inputRef={form.ref<HTMLInputElement>("priority")}
            label="High"
            attributes={{
              type: "radio",
              name: "priority",
              value: "high",
              required: true,
            }}
          />
        </div>

        <div className="input-row">
          <InputWrapper
            inputType={InputTypes.TEXTAREA}
            inputRef={form.ref("details")}
            label="Notes"
            attributes={{ maxLength: 500, rows: 5 }}
          />
        </div>

        <div className="input-row">
          <InputWrapper
            inputType={InputTypes.INPUT}
            inputRef={form.ref("priority")}
            label="Terms & Conditions"
            attributes={{
              type: "checkbox",
              required: true,
            }}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
