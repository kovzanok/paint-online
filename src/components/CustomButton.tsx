import { PropsWithChildren } from "react";
import "../style/CustomButton.scss";

type CustomButtonProps = {
  className?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

export default function CustomButton({
  children,
  className = "",
  disabled,
  onClick,
}: PropsWithChildren<CustomButtonProps>) {
  const classNames = ["button"];
  classNames.push(className);
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={classNames.join(" ")}
    >
      {children}
    </button>
  );
}
