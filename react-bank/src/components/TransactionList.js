import React, { Component } from "react";
import { Table } from "reactstrap";
import NewTransactionModal from "./NewTransactionModal";

import ConfirmRemovalModal from "./ConfirmRemovalModal";

class TransactionList extends Component {
  render() {
    const transactions = this.props.transactions;
    return (
      <Table>
        <thead>
          <tr>
            <th>Username</th>
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
              <tr key={transaction.id}>
                <td>{transaction.user_name}</td>
                <td>{transaction.transaction_type}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.sender_user_name}</td>
                <td>{transaction.receiver_user_name}</td>
                <td>{transaction.created_date}</td>
                <td align="center">
                  <NewTransactionModal
                    create={false}
                    transaction={transaction}
                    resetState={this.props.resetState}
                  />
                  &nbsp;&nbsp;
                  <ConfirmRemovalModal
                    id={transaction.id}
                    resetState={this.props.resetState}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    );
  }
}

export default TransactionList;
