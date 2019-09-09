import React from 'react';
import { Icon, Rating } from 'semantic-ui-react';

const onRate = (value) => {
  alert("only "+value+'??');
        // Send rate value to backend
};

const RateCallQuality = ({ lastCall }) => {
  if (lastCall[0].endTime > new Date().getTime() - 1000)
    return (
      <div
        style={{
          backgroundColor: 'white',
          padding: 20
        }}
        id="rateCallQuality"
      >
        <h2>Call quality feedback</h2>
        <Rating maxRating={5} icon='star' size='massive' onRate={onRate}/>
      </div>
    );
  return null;
};

export default RateCallQuality;
