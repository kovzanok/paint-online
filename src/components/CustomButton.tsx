import { PropsWithChildren } from "react";
import "../style/CustomButton.scss";

type CustomButtonProps = {
  className?: string;
};

export default function CustomButton({
  children,
  className = "",
}: PropsWithChildren<CustomButtonProps>) {
  const classNames = ["button"];
  classNames.push(className);
  return <button className={classNames.join(" ")}>{children}</button>;
}
