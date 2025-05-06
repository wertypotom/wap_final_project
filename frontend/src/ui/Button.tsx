import React from 'react'
import Button, { type ButtonProps } from 'react-bootstrap/Button'

export const UIButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props}>{props.children}</Button>
}
