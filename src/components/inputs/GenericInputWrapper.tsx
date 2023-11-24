import { RefObject } from "react";
import { DataRef, Form } from "../../data/shared-types/data-refs";
import styles from "./InputWrapper.module.css";
import { v4 as uuidV4 } from "uuid";

type InputAttributeProps = {
  type?: "input" | "checkbox" | "radio" | "tel" | "email";
  pattern?: string;
  maxLength?: number;
  rows?: number;
  value?: string | number;
  required?: boolean;
};
type InputProps<T extends HTMLElement = HTMLElement> = {
  inputRef: React.RefObject<T>;
  label: string;
  id: string;
  name: string;
  callback: Function;
  attributes?: InputAttributeProps;
};

const TextInput: React.FC<InputProps<HTMLInputElement>> = ({
  inputRef,
  id,
  label,
  name,
  attributes,
  callback,
}) => {
  return (
    <>
      <input
        id={id}
        name={name}
        ref={inputRef}
        {...attributes}
      />
      <label htmlFor={id}>{label}</label>
      {callback()}
    </>
  );
};

const TextArea: React.FC<InputProps<HTMLTextAreaElement>> = ({
  inputRef,
  id,
  label,
  name,
  attributes,
  callback,
}) => {
  return (
    <>
      <textarea
        id={id}
        name={name}
        ref={inputRef}
        {...attributes}
      />
      <label htmlFor={id}>{label}</label>
      {callback()}
    </>
  );
};

/**
 * Object that maps to all the input types
 */
const Inputs: {
  [key: string]: (
    props: InputProps<HTMLInputElement & HTMLTextAreaElement>
  ) => React.JSX.Element;
} = {
  input: (props: InputProps<HTMLInputElement>) => <TextInput {...props} />,
  textarea: (props: InputProps<HTMLTextAreaElement>) => <TextArea {...props} />,
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
  form: Form;
  name: string;
  attributes?: InputAttributeProps;
};
export const Input: React.FC<GenericInputWrapperProps> = ({
  inputType,
  form,
  label,
  name,
  attributes,
}) => {
  const id = `${inputType}-${new Date().getTime()}-${uuidV4()}`;
  const inputRef = form.ref<HTMLInputElement & HTMLTextAreaElement>(name);
  return (
    <div className={styles.wrapper}>
      {Inputs[inputType]({
        id,
        inputRef,
        label,
        name,
        attributes,
        callback: () => {
          console.log("called back");
          const nullRefs: DataRef[] = [];
          form.getDataRefs().forEach((dataRef) => {
            if (!dataRef.ref.current) {
              nullRefs.push(dataRef);
            }
          });
        },
      })}
    </div>
  );
};
