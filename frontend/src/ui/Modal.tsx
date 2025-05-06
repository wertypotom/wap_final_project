import React from 'react'
import { Modal, type ModalProps } from 'react-bootstrap'

export const UIModal: React.FC<ModalProps> = (props) => {
  return <Modal {...props}>{props.children}</Modal>
}
