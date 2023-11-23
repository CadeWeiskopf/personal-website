import styles from "./InputWrapper.module.css";
import { v4 as uuidV4 } from "uuid";

type InputProps = {
  inputRef: React.RefObject<HTMLInputElement>;
  label: string;
  id: string;
  required: boolean;
};
type InputValidationProps = {
  type?: "input" | "checkbox" | "radio" | "tel" | "email";
  pattern?: string;
  maxLength?: number;
};

const Input: React.FC<InputProps & InputValidationProps> = (props) => {
  return (
    <>
      <input
        id={props.id}
        ref={props.inputRef}
        required={props.required}
        maxLength={props.maxLength}
        pattern={props.pattern}
        type={props.type}
      />
      <label htmlFor={props.id}>{props.label}</label>
    </>
  );
};

/**
 * Object that maps to all the input types
 */
const Inputs: {
  [key: string]: (
    props: InputProps & { validations?: InputValidationProps }
  ) => JSX.Element;
} = {
  input: (props: InputProps & { validations?: InputValidationProps }) => (
    <Input
      inputRef={props.inputRef}
      label={props.label}
      id={props.id}
      required={props.required}
      type={props.validations?.type}
      maxLength={props.validations?.maxLength}
      pattern={props.validations?.pattern}
    />
  ),
} as const;

/**
 * enum to access Inputs obj, must matched keys of Inputs obj
 * until a better method is determined this must be maintained
 */
export enum InputTypes {
  INPUT = "input",
}

type InputWrapperProps = {
  inputType: InputTypes;
  inputRef: React.RefObject<any>;
  label: string;
  required: boolean;
};

/**
 * This wraps all input types, and returns it dynamically
 * by the Inputs object
 */
const InputWrapper: React.FC<
  InputWrapperProps & { validations?: InputValidationProps }
> = ({ inputType, inputRef, label, required, validations }) => {
  const id = `${new Date().getTime()}-${uuidV4()}`;
  return (
    <div className={styles.wrapper}>
      {Inputs[inputType]({ inputRef, label, id, required, validations })}
    </div>
  );
};
export default InputWrapper;
