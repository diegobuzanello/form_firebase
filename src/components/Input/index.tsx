import React, { InputHTMLAttributes } from 'react';
import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  type?: string;
}

const Input = ({ name, type, ...rest }: InputProps) => {
  <div className='input'>
    <input type={type} id={name} {...rest} />
  </div>;
};

Input.defaultProps = {
  name: undefined,
  type: undefined,
};

export default Input;
