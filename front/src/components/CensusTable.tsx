import { Table, TableBody,  TableCell, TableHead, TableRow  } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTableData } from "../actions/tableActions";
import "../App.css";

class CensusTable extends Component<{
  variable: string,
  fetchTableData: (variable: string) => object[],
  rows: Array<{
    value: string,
    count: number,
    averageAge: string}>,
}, {} > {

  private static propTypes = {
    fetchTableData: PropTypes.func.isRequired,
    rows: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.props.fetchTableData(this.props.variable);
  }

  public getSnapshotBeforeUpdate = async (prevProps) => {
    if (this.props.variable !== "Select variable" && prevProps.variable !== this.props.variable) {
      await this.props.fetchTableData(this.props.variable);
    }
  }

  public render() {
    let rowNumber: number = 0;
    const nonDisplayed: number = this.props.rows.length - 100;
    const textNonDisplayed  = nonDisplayed > 0 ? <p>Number of lines not displayed: {nonDisplayed}</p> : <br/>;
    return(
      <div className="CensusTable">
        {textNonDisplayed}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="headRow">#</TableCell>
              <TableCell className="headRow">{
                this.props.variable.charAt(0).toUpperCase() + this.props.variable.slice(1)
              }</TableCell>
              <TableCell className="headRow">Count</TableCell>
              <TableCell className="headRow">Average Age</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              this.props.rows.slice(0, 100).map((row) => {
                rowNumber++;
                return(
                <TableRow key={rowNumber} className="TableRow">
                  <TableCell component="th" scope="row">{rowNumber}</TableCell>
                  <TableCell>{row.value}</TableCell>
                  <TableCell>{row.count}</TableCell>
                  <TableCell>{row.averageAge}</TableCell>
                </TableRow>
                );
              })
            }
          </TableBody>
         </Table>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  rows: state.tableData.rows,
});

export default connect (mapStateToProps, { fetchTableData })(CensusTable);
