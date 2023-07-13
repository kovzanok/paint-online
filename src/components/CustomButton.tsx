import { PropsWithChildren } from "react";
import "../style/CustomButton.scss";

type CustomButtonProps = {
  className?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export default function CustomButton({
  children,
  className = "",
  onClick,
}: PropsWithChildren<CustomButtonProps>) {
  const classNames = ["button"];
  classNames.push(className);
  return (
    <button onClick={onClick} className={classNames.join(" ")}>
      {children}
    </button>
  );
}
