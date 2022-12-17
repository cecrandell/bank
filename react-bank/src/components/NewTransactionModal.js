import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewTransactionForm from "./NewTransactionForm";

class NewTransactionModal extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  render() {
    const create = this.props.create;

    var title = "Editing transaction";
    var button = <Button onClick={this.toggle}>Edit</Button>;
    if (create) {
      title = "Creating new transaction";

      button = (
        <Button
          color="primary"
          className="float-right"
          onClick={this.toggle}
          style={{ minWidth: "200px" }}
        >
          Create new
        </Button>
      );
    }

    return (
      <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>

          <ModalBody>
            <NewTransactionForm
              resetState={this.props.resetState}
              toggle={this.toggle}
              transaction={this.props.transaction}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default NewTransactionModal;