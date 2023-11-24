import styles from "./InputWrapper.module.css";
import { v4 as uuidV4 } from "uuid";

type InputAttributeProps = {
  type?: "input" | "checkbox" | "radio" | "tel" | "email";
  pattern?: string;
  maxLength?: number;
  rows?: number;
  value?: string | number;
  name?: string;
  required?: boolean;
};
type InputProps<T extends HTMLElement = HTMLElement> = {
  inputRef: React.RefObject<T>;
  label: string;
  id: string;
  attributes?: InputAttributeProps;
};

const Input: React.FC<InputProps<HTMLInputElement> & InputAttributeProps> = ({
  inputRef,
  attributes,
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
  InputProps<HTMLTextAreaElement> & InputAttributeProps
> = ({ inputRef, attributes, label, ...props }) => {
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
  [key: string]: unknown;
  input: (props: InputProps<HTMLInputElement>) => React.JSX.Element;
  textarea: (props: InputProps<HTMLTextAreaElement>) => React.JSX.Element;
} = {
  input: (props: InputProps<HTMLInputElement>) => (
    <Input
      {...props}
      {...props.attributes}
    />
  ),
  textarea: (props: InputProps<HTMLTextAreaElement>) => (
    <TextArea
      {...props}
      {...props.attributes}
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
  attributes?: InputAttributeProps;
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
