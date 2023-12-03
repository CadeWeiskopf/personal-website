import { useContext, useEffect } from "react";
import { AppContext } from "../../AppContext";
import styles from "./Contact.module.css";
import { EmailData, isEmailData } from "../../data/shared-types/types";
import { Form, FormInput } from "../../components/cw-forms/cw-form";
import {
  Input,
  InputTypes,
} from "../../components/cw-inputs/GenericInputWrapper";
import emailIcon from "../../components/icons/email-icon";
import phoneIcon from "../../components/icons/phone-icon";

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
      <div className={styles.topHeaderWrapper}>
        <div className={styles.contactDetailsWrapper}>
          <h1>Contact</h1>
          <div>
            Please fill out the form for a prompt response or contact via email.
          </div>
          <div className={styles.contactDetailLine}>
            <a
              href="mailto:me@cadew.dev"
              className={styles.contactDetailLine}
            >
              {emailIcon}me@cadew.dev
            </a>
          </div>
        </div>
        <div className={styles.topHeaderWrapperImgWrapper}>
          <img
            className={styles.topHeaderWrapperImg}
            src="https://i.ibb.co/M5vZxBt/Untitled.png"
            alt="Untitled"
          />
        </div>
      </div>
      {/* <h2>Fill out details</h2> */}
      <form onSubmit={handleSubmit}>
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

        <div className={styles.inputRow}>
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

        <div className={styles.inputRow}>
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

        <div className={styles.inputRow}>
          <FormInput
            form={form}
            name="priority"
            className={styles.flexGrow}
            component={
              <>
                <Input
                  inputType={InputTypes.RADIO}
                  label="Priority"
                  radioInputs={{
                    required: true,
                    radios: [
                      { label: "Low", attributes: { value: "low" } },
                      { label: "Medium", attributes: { value: "medium" } },
                      { label: "High", attributes: { value: "high" } },
                    ],
                  }}
                />
              </>
            }
          />
        </div>

        <div className={styles.inputRow}>
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

        {/* <div className={styles.inputRow}>
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
