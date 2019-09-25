import React, { Component } from "react";

import "./CallerTabsSelector.css";
import CallerDialpadFormContainer from "calls/components/dialpads/CallerDialpadForm/CallerDialpadFormContainer";
import { Grid, Icon, Menu } from "semantic-ui-react";
import UserSearchFormContainer from "calls/components/search/UserSearchForm/UserSearchFormContainer";

export class CallerTabsSelector extends Component {
  state = {
    activeItem: "search"
  };

  gridStyle = {
    flexDirection: "column"
  };


  handleTabClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state;
    return (
      <Grid padded style={this.gridStyle}>
        <Grid.Row>
          <Grid.Column width={16}>
            <Menu widths={2} size={"mini"}>
              <Menu.Item
                name="search"
                active={activeItem === "search"}
                onClick={this.handleTabClick}
                className={"DisplaySearchButton"}
                role="tabpanel"
                tabIndex="0"
                onKeyPress={(e) => { if (e.charCode === 13) this.handleTabClick(e, { name: "search" }); }}
              >
                <Icon name="search" /> Search
              </Menu.Item>
              <Menu.Item
                name="dialpad"
                active={activeItem === "dialpad"}
                onClick={this.handleTabClick}
                className={"DisplayDialpadButton"}
                role="tabpanel"
                tabIndex="0"
                onKeyPress={(e) => { if (e.charCode === 13) this.handleTabClick(e, { name: "dialpad" }); }}
              >
                <Icon name="text telephone" /> Dialpad
              </Menu.Item>
            </Menu>
          </Grid.Column>
        </Grid.Row>
        {activeItem === "search" && <UserSearchFormContainer />}
        {activeItem === "dialpad" && <CallerDialpadFormContainer />}
      </Grid>
    );
  }
}

export default CallerTabsSelector;
