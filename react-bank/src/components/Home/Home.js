import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import TransactionList from "../TransactionList/TransactionList";
import NewTransactionModal from "../NewTransactionModal/NewTransactionModal";
import PieChart from "../PieChart/PieChart.js";
import "./home.css";

import axios from "axios";

import {
  TRANSACTIONS_API_URL,
  DEPOSITS_API_URL,
  WITHDRAWS_API_URL,
  TRANSFERS_OUT_API_URL,
  TRANSFERS_IN_API_URL,
} from "../../constants";

class Home extends Component {
  state = {
    transactions: [],
    total_deposits: 0,
    total_withdraws: 0,
    total_transfers_out: 0,
    total_transfers_in: 0,
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
    axios
      .get(WITHDRAWS_API_URL)
      .then((res) =>
        this.setState({ total_withdraws: res.data.total_withdraws })
      );
    axios
      .get(TRANSFERS_OUT_API_URL)
      .then((res) =>
        this.setState({ total_transfers_out: res.data.total_transfers_out })
      );
    axios
      .get(TRANSFERS_IN_API_URL)
      .then((res) =>
        this.setState({ total_transfers_in: res.data.total_transfers_in })
      );
  };

  resetState = () => {
    this.getTransactions();
  };

  render() {
    return (
      <>
        <Container style={{ marginTop: "20px", textAlign: "center" }}>
          <Row>
            <Col>
              <PieChart
                deposits={this.state.total_deposits}
                withdraws={this.state.total_withdraws}
                transfers_out={this.state.total_transfers_out}
                transfers_in={this.state.total_transfers_in}
              />
            </Col>
          </Row>
        </Container>
        <Container style={{ textAlign: "center" }}>
          <h1>
            Total Balance: $
            {(
              this.state.total_deposits +
              this.state.total_transfers_in -
              (this.state.total_withdraws + this.state.total_transfers_out)
            ).toFixed(2)}
          </h1>
        </Container>
        <Container style={{ textAlign: "center", padding: "20px" }}>
          <NewTransactionModal type={"deposit"} resetState={this.resetState} />

          <NewTransactionModal type={"withdraw"} resetState={this.resetState} />

          <NewTransactionModal type={"transfer"} resetState={this.resetState} />
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
