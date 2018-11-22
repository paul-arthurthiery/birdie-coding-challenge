import { MenuItem, Select } from "@material-ui/core";
import React, { Component } from "react";
import "./App.css";
import {getVariableInfo, getVariables} from "./services/app.service";

class App extends Component {

  public readonly state: {currentVariable: string, variables: string[]} = {
    currentVariable: "Select variable",
    variables: [],
  };

  public componentDidMount = async () => {
    const variables = await getVariables();
    this.setState({
      variables,
    });
  }

  public handleChange = (event) => {
    this.setState({
      currentVariable: event.target.value,
    });
  }

  public render() {
    let counter = 0;
    const listItems = this.state.variables.map((x: string) => {
      counter++;
      return <MenuItem key={counter} value={x}> {x} </MenuItem>;
    });
    if (this.state.currentVariable === "Select variable") {
      listItems.unshift(
        <MenuItem key={0} value={"Select variable"}>
          Select variable
          </MenuItem>,
        );
    }
    return (
      <>
        <div className="App">
          <Select value={this.state.currentVariable} onChange={this.handleChange}>
            {listItems}
          </Select>
        </div>
      </>
    );
  }
}

export default App;