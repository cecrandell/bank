import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import TransactionList from "../TransactionList/TransactionList";
import NewTransactionModal from "../NewTransactionModal/NewTransactionModal";

import axios from "axios";

import { API_URL } from "../../constants";

class Home extends Component {
  state = {
    transactions: [],
  };

  componentDidMount() {
    this.resetState();
  }

  getTransactions = () => {
    axios.get(API_URL).then((res) => this.setState({ transactions: res.data }));
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
