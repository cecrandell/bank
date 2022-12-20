import React, { Component } from "react";
import { Table } from "reactstrap";
import "./transactionList.css";

class TransactionList extends Component {
  formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  rowColor = (type, sender_user_name) => {
    switch (type) {
      case "deposit":
        return "#004176";
      case "withdraw":
        return "#c3b5c1";
      case "transfer":
        if (sender_user_name === "carolinecrandell") {
          return "#84516d";
        } else {
          return "#7998a3";
        }

      default:
        return "";
    }
  };

  render() {
    const transactions = this.props.transactions;
    return (
      <Table>
        <thead>
          <tr
            style={{
              backgroundColor: "#002a4d",
              color: "white",
              textAlign: "center",
            }}
          >
            <th>Transaction Type</th>
            <th>Transaction Amount</th>
            <th>Transaction Sender</th>
            <th>Transaction Receiver</th>
            <th>Transaction Date</th>
          </tr>
        </thead>
        <tbody>
          {!transactions || transactions.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>No transactions</b>
              </td>
            </tr>
          ) : (
            transactions.map((transaction) => (
              <tr
                key={transaction.id}
                style={{
                  backgroundColor: this.rowColor(
                    transaction.transaction_type,
                    transaction.sender_user_name
                  ),
                  color: "white",
                }}
              >
                <td>{transaction.transaction_type.toUpperCase()}</td>
                <td>
                  {transaction.transaction_type === "withdraw" ? "-" : ""}
                  {transaction.sender_user_name === "carolinecrandell"
                    ? "-"
                    : ""}
                  ${transaction.amount.toFixed(2)}
                </td>
                <td>{transaction.sender_user_name}</td>
                <td>{transaction.receiver_user_name}</td>
                <td>{this.formatDate(transaction.created_date)}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    );
  }
}

export default TransactionList;
