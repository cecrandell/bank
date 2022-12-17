import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import DepositList from "./DepositList";
import NewDepositModal from "./NewDepositModal";

import axios from "axios";

import { API_URL } from "../constants";

class Home extends Component {
  state = {
    deposits: [],
  };

  componentDidMount() {
    this.resetState();
  }

  getDeposits = () => {
    axios.get(API_URL).then((res) => this.setState({ deposits: res.data }));
  };

  resetState = () => {
    this.getDeposits();
  };

  render() {
    return (
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <DepositList
              deposits={this.state.deposits}
              resetState={this.resetState}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewDepositModal create={true} resetState={this.resetState} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
