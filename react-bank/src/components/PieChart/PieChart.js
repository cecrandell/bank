import React from "react";
import { Chart } from "react-google-charts";

import axios from "axios";

import {
  DEPOSITS_API_URL,
  WITHDRAWS_API_URL,
  TRANSFERS_OUT_API_URL,
  TRANSFERS_IN_API_URL,
} from "../../constants";

class PieChart extends React.Component {
  state = {
    total_deposits: 0,
    total_withdraws: 0,
    total_transfers_out: 0,
    total_transfers_in: 0,
    options: {
      title: "Total Transactions",
      slices: [
        {
          color: "#004176",
        },
        {
          color: "#c3b5c1",
        },
        {
          color: "#84516d",
        },
        {
          color: "#7998a3",
        },
      ],
      annotations: {
        textStyle: {
          fontName: "Arial",
          fontSize: 18,
          bold: true,
        },
      },
    },
  };

  componentDidMount() {
    this.resetState();
  }

  getTotals = () => {
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
    this.getTotals();
  };
  render() {
    return (
      <Chart
        chartType="PieChart"
        data={[
          ["Task", "Hours per Day"],
          ["Deposits", this.state.total_deposits],
          ["Withdraws", this.state.total_withdraws],
          ["Transfers Out", this.state.total_transfers_out],
          ["Transfers In", this.state.total_transfers_in],
        ]}
        options={this.state.options}
        width={"100%"}
        height={"400px"}
      />
    );
  }
}

export default PieChart;
