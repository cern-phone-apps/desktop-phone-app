import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Segment } from "semantic-ui-react";

import "./Dialpad.css";
import { logMessage } from "common/utils";
import { DialButton } from "calls/components/Dialpad/DialButton";

/**
 * Represents the phone Dialpad
 */
export default class Dialpad extends Component {
  static propTypes = {
    dialpadValue: PropTypes.string.isRequired,
    updateDialpadValue: PropTypes.func.isRequired
  };

  buttonsRow1 = [{ symbol: "1" }, { symbol: "2" }, { symbol: "3" }];
  buttonsRow2 = [{ symbol: "4" }, { symbol: "5" }, { symbol: "6" }];
  buttonsRow3 = [{ symbol: "7" }, { symbol: "8" }, { symbol: "9" }];
  buttonsRow4 = [{ symbol: "*" }, { symbol: "0", alt: "+" }, { symbol: "#" }];

  rows = [
    this.buttonsRow1,
    this.buttonsRow2,
    this.buttonsRow3,
    this.buttonsRow4
  ];

  handleDialPadButtonClick = value => {
    logMessage("handleDialPadButtonClick: ", value);
    logMessage("handleDialPadButtonClick: ", this.props.dialpadValue);
    this.props.updateDialpadValue(this.props.dialpadValue + value);
  };

  render() {
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
        </Grid>
      </Segment>
    );
  }
}

