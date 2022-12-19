import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import TransactionList from "../TransactionList/TransactionList";
import NewTransactionModal from "../NewTransactionModal/NewTransactionModal";

import axios from "axios";

import { TRANSACTIONS_API_URL, DEPOSITS_API_URL } from "../../constants";

class Home extends Component {
  state = {
    transactions: [],
    total_deposits: 0,
  };

  componentDidMount() {
    this.resetState();
  }

  getTransactions = () => {
    axios
      .get(TRANSACTIONS_API_URL)
      .then((res) => this.setState({ transactions: res.data }));
    axios
      .get(DEPOSITS_API_URL)
      .then((res) =>
        this.setState({ total_deposits: res.data.total_deposits })
      );
  };

  resetState = () => {
    this.getTransactions();
  };

  render() {
    return (
      <>
        <Container style={{ marginTop: "20px", textAlign: "center" }}>
          {this.state.total_deposits}
          <Row>
            <Col>
              <NewTransactionModal
                type={"deposit"}
                resetState={this.resetState}
              />
            </Col>
            <Col>
              <NewTransactionModal
                type={"withdraw"}
                resetState={this.resetState}
              />
            </Col>
            <Col>
              <NewTransactionModal
                type={"transfer"}
                resetState={this.resetState}
              />
            </Col>
          </Row>
        </Container>
        <Container style={{ marginTop: "20px" }}>
          <Row>
            <Col>
              <TransactionList
                transactions={this.state.transactions}
                resetState={this.resetState}
              />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Home;
