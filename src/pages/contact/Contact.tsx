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
import Spinner from "./spinner";
import headshot from "./cwhead.png";

type SubmitResponse = {
  isError: boolean;
  message: string;
};

const SubmitResponseMessage: React.FC<
  SubmitResponse & {
    setSubmitResponse: React.Dispatch<
      React.SetStateAction<SubmitResponse | undefined>
    >;
  }
> = ({ isError, message, setSubmitResponse }) => {
  return (
    <div className={styles.responseWrapper}>
      <div className={styles.responseMessageWrapper}>
        <div>
          {isError ? (
            <>
              ☹️Unfortunately we've encountered an error:
              <div>{message}</div>
            </>
          ) : (
            <>
              <span style={{ fontSize: "3rem" }}>🙂</span>Thank you for reaching
              out!
              <div style={{ padding: "0 0.8em" }}>
                You should expect a response to the provided email shortly.
              </div>
            </>
          )}
        </div>
        {isError && (
          <div>
            If possible, fix errors, wait a minute to try again, or contact
            directly via email.
          </div>
        )}
        <br />
        <button
          onClick={() => {
            setSubmitResponse(undefined);
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
};

const Contact: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitResponse, setSubmitResponse] = useState<SubmitResponse>();

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

    let responseStatusCode = 0;
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
      console.log(response, "<-");
      if (!response.ok || response.status !== 200) {
        setIsLoading(false);
        throw Error("bad response");
      }
      const responseData = await response.json();
      console.log(responseData);
      setSubmitResponse({
        isError: false,
        message: "",
      });
    } catch (error) {
      console.error(error);
      const message = !responseStatusCode
        ? "Unable to contact server right now."
        : `HTTP Error Code ${responseStatusCode}, see console for more detailed error`;
      setSubmitResponse({
        isError: true,
        message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // clears data if success
  if (!isLoading && submitResponse && !submitResponse.isError) {
    return (
      <SubmitResponseMessage
        isError={submitResponse.isError}
        message={submitResponse.message}
        setSubmitResponse={setSubmitResponse}
      />
    );
  }
  return (
    <>
      {/** retains data if error on submit */}
      {!isLoading && submitResponse && (
        <SubmitResponseMessage
          isError={submitResponse.isError}
          message={submitResponse.message}
          setSubmitResponse={setSubmitResponse}
        />
      )}

      <div
        style={submitResponse?.isError ? { display: "none" } : {}}
        className={styles.wrapper}
      >
        <div className={styles.topHeaderWrapper}>
          <div className={styles.topHeaderWrapperImgWrapper}>
            <img
              className={styles.topHeaderWrapperImg}
              src={headshot}
              alt="Cade Weiskopf"
              loading="lazy"
            />
          </div>
          <div className={styles.contactDetailsWrapper}>
            <h1>Contact Me</h1>
            <div className={styles.topHeaderText}>
              Hello, my name is Cade Weiskopf. I provide an array of software
              services from consultation to implementation. Feel free to use
              this form or email me directly and I will respond promptly.
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
                    attributes={{
                      type: "email",
                      maxLength: 100,
                      required: true,
                      pattern: `[a-z0-9._%+\\-]+@[a-z0-9.\\-]+.[a-z]{2,}$`,
                    }}
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
                    attributes={{
                      type: "tel",
                      maxLength: 22,
                      pattern: "[0-9]+",
                    }}
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
            <button
              type="submit"
              disabled={isLoading}
              style={isLoading ? { cursor: "progress" } : {}}
            >
              {isLoading && Spinner}
              {!isLoading && "SUBMIT"}
            </button>
          </div>
        </form>
        <br />
        <br />
      </div>
    </>
  );
};

export default Contact;
