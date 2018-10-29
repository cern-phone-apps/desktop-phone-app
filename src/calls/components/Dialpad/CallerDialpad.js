import PropTypes from "prop-types";
import { Grid, Icon, Segment } from "semantic-ui-react";
import React from "react";
import Dialpad from "calls/components/Dialpad/Dialpad";
import { DialButton } from "calls/components/Dialpad/DialButton";

/**
 * Represents the Call Button on the DialPad
 * @param props
 * @returns {*}
 * @constructor
 */
export function CallButton ({ clickHandler, text }) {
  return (
    <div className={"DialButton CallButton"} onClick={() => clickHandler()}>
      <div className={"DialButton__content"}>{text}</div>
    </div>
  );
}

CallButton.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  text: PropTypes.object.isRequired
};

export class CallerDialpad extends Dialpad {
  static propTypes = {
    makeCall: PropTypes.func.isRequired
  };

  makeCall = () => {
    this.props.makeCall({
      name: "Unknown",
      phoneNumber: this.props.dialpadValue,
      startTime: Date.now()
    });
  };

  render () {
    return (
      <Segment attached="bottom" className={"Dialpad"}>
        <Grid columns={3} centered className={"Dialpad__grid"}>
          {this.rows.map((row, index) => {
            return (
              <Grid.Row key={`row${index}`}>
                {row.map((button, index) => {
                  return (
                    <DialButton
                      key={`button${index}`}
                      clickHandler={() =>
                        this.handleDialPadButtonClick(button.symbol)
                      }
                      longPressHandler={() =>
                        this.handleDialPadButtonClick(button.alt)
                      }
                      symbol={button.symbol}
                      alt={button.alt}
                    />
                  );
                })}
              </Grid.Row>
            );
          })}

          <Grid.Row>
            <Grid.Column/>
            <Grid.Column textAlign={"center"}>
              <CallButton
                clickHandler={this.makeCall}
                text={<Icon name={"phone"}/>}
              />
            </Grid.Column>
            <Grid.Column/>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}