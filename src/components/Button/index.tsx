import React, { ButtonHTMLAttributes } from "react";
import "./styles.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "submit";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ type, className, ...rest }) => {
  return (
    <div className="button">
      <button className={className} type={type} {...rest} />
    </div>
  );
};

export default Button;
