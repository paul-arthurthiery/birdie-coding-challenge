import { Table, TableBody,  TableCell, TableHead, TableRow  } from "@material-ui/core";
import React, { Component } from "react";
import "./App.css";
import {getVariableInfo} from "./services/app.service";

class CensusTable extends Component<{variable: string}> {
  public readonly state: {rows: Array<{value: string, count: number, averageAge: string}>} = {
      rows: [],
    };

  public componentDidMount = async () => {
    this.setState({
      rows: await getVariableInfo(this.props.variable),
    });
  }

  public getSnapshotBeforeUpdate = async (prevProps) => {
    if (this.props.variable !== "Select variable" && prevProps.variable !== this.props.variable) {
      await this.updateTable();
    }
  }

  public render() {
    let rowNumber: number = 0;
    const nonDisplayed: number = this.state.rows.length - 100;
    const textNonDisplayed  = nonDisplayed > 0 ? <p>Number of lines not displyed: {nonDisplayed}</p> : <br/>;
    return(
      <div className="CensusTable">
        {textNonDisplayed}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell numeric={true}>#</TableCell>
              <TableCell >{this.props.variable.charAt(0).toUpperCase() + this.props.variable.slice(1)}</TableCell>
              <TableCell>Count</TableCell>
              <TableCell>Average Age</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              this.state.rows.slice(0, 100).map((row) => {
                rowNumber++;
                return(
                <TableRow key={rowNumber}>
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

  private updateTable = async () => {
    try {
      this.setState({
        rows: [],
      });
      const newRows: Array<{
        value: string,
        count: number,
        averageAge: string}> = await getVariableInfo(this.props.variable);
      if (!(newRows.length > 0)) { throw new Error("Invalid variable"); }
      this.setState({
        rows:  newRows,
      });
    } catch (err) {
      console.log(err);
    }
  }
}

export default CensusTable;
