import React, { Component } from "react";
import { Grid, Segment } from "semantic-ui-react";
import OnCallDetailsContainer from "calls/components/OnCallDetails/index";
import RightColumn from "common/components/RightColumn/RightColumn";
import ErrorBoundary from "common/components/ErrorBoundary/ErrorBoundary";
import MainHeader from "calls/components/MainHeader";
import DtmfDialpadForm from "calls/components/dialpads/DtmfDialpadForm/DtmfDialpadForm";

export class OncallScreen extends Component {
  styles = { height: "100%" };
  dividedStyles = { paddingTop: "0", paddingBottom: 0 };

  render() {

    return (
      <Grid.Column
        computer={12}
        mobile={16}
        tablet={16}
        className={"CallsScreen__RightColumn"}
      >
        <RightColumn>
          <MainHeader />
          <ErrorBoundary>
            <Grid padded style={this.styles} className={"CallPage"}>
              <Grid.Row columns={2} divided style={this.dividedStyles}>
                <Grid.Column>
                  <OnCallDetailsContainer />
                </Grid.Column>
                <Grid.Column>
                  <Segment basic>
                    <Grid.Column>
                      <DtmfDialpadForm/>
                    </Grid.Column>
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </ErrorBoundary>
        </RightColumn>
      </Grid.Column>
    );
  }
}
