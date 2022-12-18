import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewTransactionForm from "../NewTransactionForm/NewTransactionForm";

class NewTransactionModal extends Component {
  state = {
    modal: false,
  };

  toggle = () => {
    this.setState((previous) => ({
      modal: !previous.modal,
    }));
  };

  render() {
    const transaction_type = this.props.type;
    return (
      <Fragment>
        <Button
          className="float-right"
          onClick={this.toggle}
          style={{
            minWidth: "200px",
            backgroundColor: "#002a4d",
            border: "none",
            fontWeight: "bold",
          }}
        >
          New {transaction_type}
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Creating new {transaction_type}
          </ModalHeader>

          <ModalBody>
            <NewTransactionForm
              resetState={this.props.resetState}
              toggle={this.toggle}
              transaction_type={this.props.type}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default NewTransactionModal;
