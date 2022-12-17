import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

class NewTransactionForm extends React.Component {
  state = {
    id: 1,
    user_name: 1,
    transaction_type: "deposit",
    amount: "",
    sender_user_name: 1,
    receiver_user_name: 1,
  };

  componentDidMount() {
    if (this.props.transaction) {
      const { id, user_name, amount } = this.props.transaction;
      this.setState({ id, user_name, amount });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createTransaction = (e) => {
    e.preventDefault();
    axios.post(API_URL, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editTransaction = (e) => {
    e.preventDefault();
    axios.put(API_URL + this.state.id, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  defaultIfEmpty = (value) => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form
        onSubmit={
          this.props.transaction ? this.editTransaction : this.createTransaction
        }
      >
        <FormGroup>
          <Label for="amount">Amount:</Label>
          <Input
            type="text"
            name="amount"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.amount)}
          />
        </FormGroup>
        <Button>Transact</Button>
      </Form>
    );
  }
}

export default NewTransactionForm;