import React, { Component } from "react";
import { Button, Grid, Header } from "semantic-ui-react";

import "./RightColumnHeader.css";
import ColumnHeader from "common/components/ColumnHeader/ColumnHeader";
import ErrorButtonContainer from "common/components/ErrorButton/ErrorButtonContainer";

class RightColumnHeader extends Component {
  centerColumnStyles = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center"
  };

  headerStyles = {
    minHeight: '53px'
  };

  render() {
    const { title } = this.props;

    return (
      <ColumnHeader style={this.headerStyles}>
        <Grid.Row>
          <Grid.Column textAlign={"left"} width={3}>
          </Grid.Column>
          <Grid.Column
            style={this.centerColumnStyles}
            textAlign={"center"}
            width={10}
          >
            <Header as={"h4"}>
              {title} <ErrorButtonContainer />
            </Header>
          </Grid.Column>
          <Grid.Column textAlign={"right"} width={3}>
            <Button as={"a"} className={"flat"} icon={"info"} />
          </Grid.Column>
        </Grid.Row>
      </ColumnHeader>
    );
  }
}

export default RightColumnHeader;
