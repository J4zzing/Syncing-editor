import React, { useState } from "react";
import { Button, Modal, InputGroup } from "react-bootstrap";

interface Props {
  //
}
interface State {
  show: boolean;
}

export class NormalModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  render() {
    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Hello!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            关闭
          </Button>
          <Button variant="info" onClick={this.handleClose}>
            新建
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
