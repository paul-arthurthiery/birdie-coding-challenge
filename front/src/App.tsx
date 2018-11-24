import { MenuItem, Select } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect  } from "react-redux";
import { fetchVariables, updateCurrentVariable } from "./actions/tableActions";
import "./App.css";
import CensusTable from "./components/CensusTable";

class App extends Component<{
  currentVariable: string,
  variables: string[],
  fetchVariables: () => string[],
  updateCurrentVariable: (variable: string) => void,
  store,
}, {}> {

  private static propTypes = {
    currentVariable: PropTypes.string.isRequired,
    fetchVariables: PropTypes.func.isRequired,
    updateCurrentVariable: PropTypes.func.isRequired,
    variables: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.props.updateCurrentVariable("Select variable");
  }

  public handleChange = (event) => {
    this.props.updateCurrentVariable(event.target.value);
  }

  public componentDidMount = async () => {
    await this.props.fetchVariables();
  }

  public render() {
    let counter = 0;
    let tableArea = <CensusTable variable={this.props.currentVariable}/>;
    const listItems: JSX.Element[] = this.props.variables.map((x: string) => {
      counter++;
      return <MenuItem key={counter} value={x}> {x} </MenuItem>;
    });
    if (this.props.currentVariable === "Select variable") {
      listItems.unshift(
        <MenuItem key={0} value={"Select variable"}>
          Select variable
        </MenuItem>,
      );
      tableArea = <p> Select a variable to show it's contents </p>;
    } else {
      tableArea = <CensusTable variable={this.props.currentVariable}/>;
    }
    return (
        <div className="App">
          <div className="Select">
            <Select value={this.props.currentVariable} onChange={this.handleChange}>
              {listItems}
            </Select>
          </div>
          {tableArea}
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentVariable: state.tableData.currentVariable,
  variables: state.tableData.variables,
});
export default connect (mapStateToProps, { fetchVariables, updateCurrentVariable })(App);
