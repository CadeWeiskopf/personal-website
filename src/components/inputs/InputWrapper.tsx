import styles from "./InputWrapper.module.css";
import { v4 as uuidV4 } from "uuid";

type InputValidationProps = {
  type?: "input" | "checkbox" | "radio" | "tel" | "email";
  pattern?: string;
  maxLength?: number;
};
type InputProps<T extends HTMLElement = HTMLElement> = {
  inputRef: React.RefObject<T>;
  label: string;
  id: string;
  required: boolean;
  validations?: InputValidationProps;
};

const Input: React.FC<InputProps<HTMLInputElement> & InputValidationProps> = ({
  inputRef,
  validations,
  label,
  ...props
}) => {
  return (
    <>
      <input
        ref={inputRef}
        {...props}
      />
      <label htmlFor={props.id}>{label}</label>
    </>
  );
};

const TextArea: React.FC<
  InputProps<HTMLTextAreaElement> & InputValidationProps
> = ({ inputRef, validations, label, ...props }) => {
  return (
    <>
      <textarea
        ref={inputRef}
        {...props}
      />
      <label htmlFor={props.id}>{label}</label>
    </>
  );
};

/**
 * Object that maps to all the input types
 */
const Inputs: {
  [key: string]: (props: InputProps<HTMLInputElement>) => JSX.Element;
} = {
  input: (props: InputProps<HTMLInputElement>) => (
    <Input
      {...props}
      {...props.validations}
    />
  ),
  textarea: (props: InputProps<HTMLTextAreaElement>) => (
    <TextArea
      {...props}
      {...props.validations}
    />
  ),
} as const;

/**
 * enum to access Inputs obj, must matched keys of Inputs obj
 * until a better method is determined this must be maintained
 * (runtime error thrown if a valid InputTypes is used)
 */
export enum InputTypes {
  INPUT = "input",
  TEXTAREA = "textarea",
}

type InputWrapperProps = {
  inputType: InputTypes;
  inputRef: React.RefObject<any>;
  label: string;
  required: boolean;
  validations?: InputValidationProps;
};

/**
 * This wraps all input types, and returns it dynamically
 * by the Inputs object
 */
const InputWrapper: React.FC<InputWrapperProps> = ({ inputType, ...props }) => {
  const id = `${new Date().getTime()}-${uuidV4()}`;
  return (
    <div className={styles.wrapper}>{Inputs[inputType]({ id, ...props })}</div>
  );
};
export default InputWrapper;
