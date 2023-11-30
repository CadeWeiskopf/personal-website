import { useEffect, useRef } from "react";
import { Form } from "../../data/shared-types/data-refs";
import styles from "./InputWrapper.module.css";
import { v4 as uuidV4 } from "uuid";

type InputAttributeProps = {
  type?: "input" | "checkbox" | "radio" | "tel" | "email";
  pattern?: string;
  maxLength?: number;
  rows?: number;
  value?: string | number;
  required?: boolean;
  name?: string;
  placeholder?: string;
};
type InputProps = {
  label: string;
  id: string;
  attributes?: InputAttributeProps;
};

const TextInput: React.FC<InputProps> = ({ id, label, attributes }) => {
  return (
    <>
      <input
        id={id}
        {...attributes}
      />
      <label htmlFor={id}>
        <div className={styles.labelTextWrapper}>{label}</div>
      </label>
    </>
  );
};

const TextArea: React.FC<InputProps> = ({ id, label, attributes }) => {
  return (
    <>
      <textarea
        id={id}
        {...attributes}
      />
      <label htmlFor={id}>{label}</label>
    </>
  );
};

/**
 * Object that maps to all the input types
 */
const Inputs: {
  [key: string]: (props: InputProps) => React.JSX.Element;
} = {
  input: (props: InputProps) => <TextInput {...props} />,
  textarea: (props: InputProps) => <TextArea {...props} />,
} as const;

/**
 * enum to access Inputs obj, must matched keys of Inputs obj
 * until a better method is determined this must be maintained
 * (runtime error thrown if a valid InputTypes is used)
 */
export enum InputTypes {
  INPUT = "input",
  TEXTAREA = "textarea",
  CHECKBOX = "checkbox",
}
type GenericInputWrapperProps = {
  inputType: InputTypes;
  label: string;
  attributes?: InputAttributeProps;
};
export const Input: React.FC<GenericInputWrapperProps> = ({
  inputType,
  label,
  attributes,
}) => {
  const id = `${inputType}-${new Date().getTime()}-${uuidV4()}`;
  return (
    <div className={styles.wrapper}>
      {Inputs[inputType]({
        id,
        label,
        attributes,
      })}
    </div>
  );
};

type FormInputProps = {
  className?: string;
  form: Form;
  name: string;
  component: React.JSX.Element;
};
export const FormInput: React.FC<FormInputProps> = ({
  className,
  form,
  name,
  component,
}) => {
  const id = uuidV4();
  const inputWrapper = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const selectors = `input,select,textarea`;
    const inputs = inputWrapper.current?.querySelectorAll(selectors);
    if (!inputs) {
      throw Error(`could not detect any inputs (${selectors}`);
    }
    if (inputs.length <= 0) {
      throw Error("no inputs");
    }
    if (inputs.length > 1) {
      throw Error("more than one inputs for one FormInput");
    }
    const domElement = inputs[0] as HTMLInputElement;
    form.ref(id, domElement, name);
  });
  return (
    <div
      className={className}
      id={`${id}-wrapper`}
      ref={inputWrapper}
    >
      {component}
    </div>
  );
};
