import React, { useState } from 'react';
import { Button, Header, Modal, Icon, Rating } from 'semantic-ui-react';

const RateCallQuality = ({ lastCall }) => {
  const lastCallTime = (lastCall && lastCall[0] && lastCall[0].endTime) ? lastCall[0].endTime : 0;
  const [displayModal, setDisplayModal] = useState(
    lastCallTime > new Date().getTime() - 10000
  );
  const [rate, setRate] = useState(0);
  const onRate = value => {
    // Send rating to backend here
    setDisplayModal(false);
  };
  return (
    <Modal open={displayModal} size="small">
      <Header icon="star" content="Call quality feedback" />
      <Modal.Content>
        <Rating
          maxRating={5}
          icon="star"
          size="massive"
          onRate={(e, { rating }) => {
            setRate(rating);
          }}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => setDisplayModal(false)}>
          Close
        </Button>
        <Button color="green" onClick={() => onRate(rate)}>
          Send
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default RateCallQuality;
