import React, { PropsWithChildren, forwardRef } from "react";
import "../style/CustomRadio.scss";
type CustomRadioButtonProps = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  id: string;
  className?: string;
};

const CustomRadioButton = forwardRef<
  HTMLInputElement,
  PropsWithChildren<CustomRadioButtonProps>
>(({ onChange, children, id, className }, ref) => {
  const classNames = ["label"];
  if (className) classNames.push(className);
  return (
    <>
      <input
        ref={ref}
        name='tool'
        id={id}
        className='radio-input'
        onChange={onChange}
        type='radio'
      />
      <label htmlFor={id} className={classNames.join(" ")}>
        {children}
      </label>
    </>
  );
});

export default CustomRadioButton;
