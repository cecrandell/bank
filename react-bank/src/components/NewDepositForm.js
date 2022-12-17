import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

class NewDepositForm extends React.Component {
  state = {
    id: 1,
    user_name: 1,
    amount: "",
  };

  componentDidMount() {
    if (this.props.deposit) {
      const { id, user_name, amount } = this.props.deposit;
      this.setState({ id, user_name, amount });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createDeposit = (e) => {
    e.preventDefault();
    axios.post(API_URL, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editDeposit = (e) => {
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
        onSubmit={this.props.deposit ? this.editDeposit : this.createDeposit}
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
        <Button>Deposit</Button>
      </Form>
    );
  }
}

export default NewDepositForm;
