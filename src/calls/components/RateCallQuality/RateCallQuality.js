import React, { useState } from 'react';
import { Button, Header, Modal, Icon, Rating } from "semantic-ui-react";

const onRate = (value) => {
  alert("only "+value+'??');
        // Send rate value to backend
};

const RateCallQuality = ({ lastCall }) => {
  const [ rate, setRate ] = useState(true);
  if (lastCall[0].endTime > new Date().getTime() - 10000000000)
    return (
      <Modal
        open={rate}
        size="small"
        //className={"OutgoingCallModal"}
      >
        <Header icon="star" content="Call quality feedback" />
        <Modal.Content>
          <Rating maxRating={5} defaultRating={3} icon='star' size='massive' onRate={(e) => setRate(false)}/>
        </Modal.Content>
      </Modal>
    );
  return null;
};

export default RateCallQuality;
