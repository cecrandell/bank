import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { TRANSACTIONS_API_URL } from "../../constants";

class NewTransactionForm extends React.Component {
  state = {
    id: 2,
    user_name: "cecrandell",
    transaction_type: this.props.transaction_type,
    amount: "",
    sender_user_name: "cecrandell",
    receiver_user_name: "carolinecrandell",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createTransaction = (e) => {
    e.preventDefault();
    axios.post(TRANSACTIONS_API_URL, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editTransaction = (e) => {
    e.preventDefault();
    axios.put(TRANSACTIONS_API_URL + this.state.id, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  defaultIfEmpty = (value) => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form onSubmit={this.createTransaction}>
        <FormGroup>
          <Label for="amount">Amount:</Label>
          <Input
            type="text"
            name="amount"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.amount)}
          />
        </FormGroup>
        {this.state.transaction_type === "transfer" && (
          <FormGroup>
            <Label for="receiver_user_name">To:</Label>
            <Input
              type="text"
              name="receiver_user_name"
              onChange={this.onChange}
              value={this.defaultIfEmpty(this.state.receiver_user_name)}
            />
          </FormGroup>
        )}
        <Button>Make {this.props.transaction_type}</Button>
      </Form>
    );
  }
}

export default NewTransactionForm;
