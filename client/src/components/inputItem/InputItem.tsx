import classNames from "classnames/bind";
import styles from "./InputItem.module.scss";
import { UseFormRegister } from "react-hook-form";

const cx = classNames.bind(styles);

export type FormValues = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

interface InputProps {
  label?: string;
  type: React.HTMLInputTypeAttribute | undefined;
  name: string;
  placeholder?: string;
  register: UseFormRegister<FormValues>;
}
const InputItem = (props: InputProps) => {
  const { label, type, name, placeholder, register } = props;
  return (
    <div className={cx("form-group")}>
      <label htmlFor={name}>{label}</label>
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        id={name}
      />
    </div>
  );
};

export default InputItem;
