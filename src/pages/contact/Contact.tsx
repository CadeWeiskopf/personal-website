import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import styles from "./Contact.module.css";
import { EmailData, isEmailData } from "../../data/shared-types/types";
import { Form, FormInput } from "../../components/cw-forms/cw-form";
import {
  Input,
  InputTypes,
} from "../../components/cw-inputs/GenericInputWrapper";
import emailIcon from "../../components/icons/email-icon";

const Contact: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
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

    try {
      setIsLoading(true);
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
        setIsLoading(false);
        throw Error("bad response");
      }
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.topHeaderWrapper}>
        <div className={styles.topHeaderWrapperImgWrapper}>
          <img
            className={styles.topHeaderWrapperImg}
            src="https://i.ibb.co/yBYYwf3/1677798156440.jpg"
            alt="Cade Weiskopf"
            loading="lazy"
          />
        </div>
        <div className={styles.contactDetailsWrapper}>
          <h1>Contact Me</h1>
          <div className={styles.topHeaderText}>
            Hello, my name is Cade Weiskopf. I provide an array of software
            services from consultation to implementation. Feel free to use this
            form or email me directly and I will respond promptly.
            <br />
            <br />I look forward to hearing from you and hope to work together
            soon!
            <br />
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
      </div>
      {/* <h2>Fill out details</h2> */}
      <div style={{ padding: "0 0.5em" }}>
        <small>* fields are required</small>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.formShadowWrapper}>
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
                        {
                          key: "priority-low",
                          label: "Low",
                          attributes: { value: "low" },
                        },
                        {
                          key: "priority-medium",
                          label: "Medium",
                          attributes: { value: "medium" },
                        },
                        {
                          key: "priority-high",
                          label: "High",
                          attributes: { value: "high" },
                        },
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
          {isLoading ? "LOADING" : <button type="submit">SUBMIT</button>}
        </div>
      </form>
      <br />
      <br />
    </div>
  );
};

export default Contact;
