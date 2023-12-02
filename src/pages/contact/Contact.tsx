import { useContext, useEffect } from "react";
import { AppContext } from "../../AppContext";
import styles from "./Contact.module.css";
import { EmailData, isEmailData } from "../../data/shared-types/types";
import { Form, FormInput } from "../../components/cw-forms/cw-form";
import {
  Input,
  InputTypes,
} from "../../components/cw-inputs/GenericInputWrapper";

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
        <div className={styles.inputRow}>
          <FormInput
            form={form}
            name="firstName"
            className={styles.flexGrow}
            component={
              <Input
                inputType={InputTypes.INPUT}
                label="First"
                attributes={{
                  maxLength: 100,
                  required: true,
                }}
              />
            }
          />

          <FormInput
            form={form}
            name="lastName"
            className={styles.flexGrow}
            component={
              <Input
                inputType={InputTypes.INPUT}
                label="Last"
                attributes={{
                  maxLength: 100,
                  required: true,
                }}
              />
            }
          />
        </div>

        <div className="input-row">
          <FormInput
            form={form}
            name="companyName"
            className={styles.flexGrow}
            component={
              <Input
                inputType={InputTypes.INPUT}
                label="Company"
                attributes={{ maxLength: 100 }}
              />
            }
          />
        </div>

        <div className="input-row">
          <FormInput
            form={form}
            name="email"
            className={styles.flexGrow}
            component={
              <Input
                inputType={InputTypes.INPUT}
                label="Email"
                attributes={{ type: "email", maxLength: 100, required: true }}
              />
            }
          />
        </div>

        <div className="input-row">
          <FormInput
            form={form}
            name="phone"
            className={styles.flexGrow}
            component={
              <Input
                inputType={InputTypes.INPUT}
                label="Phone"
                attributes={{ type: "tel", maxLength: 22, pattern: "[0-9]+" }}
              />
            }
          />
        </div>

        <div className="input-row">
          <FormInput
            form={form}
            name="priority"
            className={styles.flexGrow}
            component={
              <Input
                inputType={InputTypes.INPUT}
                label="Low"
                attributes={{
                  name: "priority",
                  type: "radio",
                  required: true,
                  value: "low",
                }}
              />
            }
          />
          <FormInput
            form={form}
            name="priority"
            className={styles.flexGrow}
            component={
              <Input
                inputType={InputTypes.INPUT}
                label="Medium"
                attributes={{
                  name: "priority",
                  type: "radio",
                  required: true,
                  value: "med",
                }}
              />
            }
          />
          <FormInput
            form={form}
            name="priority"
            className={styles.flexGrow}
            component={
              <Input
                inputType={InputTypes.INPUT}
                label="High"
                attributes={{
                  name: "priority",
                  type: "radio",
                  required: true,
                  value: "high",
                }}
              />
            }
          />
        </div>

        <div className="input-row">
          <FormInput
            form={form}
            name="details"
            className={styles.flexGrow}
            component={
              <Input
                inputType={InputTypes.TEXTAREA}
                label="Details"
                attributes={{ maxLength: 1000, rows: 5 }}
              />
            }
          />
        </div>

        {/* <div className="input-row">
          <InputWrapper
            inputType={InputTypes.CHECKBOX}
            inputRef={form.ref("priority")}
            label="Terms & Conditions"
            attributes={{
              required: true,
            }}
          />
        </div> */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
