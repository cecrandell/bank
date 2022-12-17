import React, { Component } from "react";
import { Table } from "reactstrap";
import NewDepositModal from "./NewDepositModal";

import ConfirmRemovalModal from "./ConfirmRemovalModal";

class DepositList extends Component {
  render() {
    const deposits = this.props.deposits;
    return (
      <Table dark>
        <thead>
          <tr>
            <th>Username</th>
            <th>Amount</th>
            <th>Deposit Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!deposits || deposits.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>Ops, no one here yet</b>
              </td>
            </tr>
          ) : (
            deposits.map((deposit) => (
              <tr key={deposit.id}>
                <td>{deposit.user_name}</td>
                <td>{deposit.amount}</td>
                <td>{deposit.created_date}</td>
                <td align="center">
                  <NewDepositModal
                    create={false}
                    deposit={deposit}
                    resetState={this.props.resetState}
                  />
                  &nbsp;&nbsp;
                  <ConfirmRemovalModal
                    id={deposit.id}
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

export default DepositList;
