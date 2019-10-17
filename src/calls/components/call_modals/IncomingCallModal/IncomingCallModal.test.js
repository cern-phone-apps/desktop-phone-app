import React from 'react';
import { render, waitForElement, fireEvent } from '@testing-library/react';
import { IncomingCallModal } from './IncomingCallModal';
import DetectRTC from 'detectrtc';

describe('IncomingCallModal tests', () => {
  it('renders the component', async () => {
    const setisReceivingCall = jest.fn();
    let alert = 0;

    const { getByText, getByTestId } = render(
      <IncomingCallModal
        t={key => key}
        connected
        receivingCall
        callerName={'Bill Gates'}
        callerNumber={'************************************'}
        onCall={false}
        setIsReceivingCall={setisReceivingCall}
        phoneService={{
          acceptIncomingCall: () => true,
          hangUpCurrentCallAction: () => true,
          acceptIncomingCall: () => true,
          rejectIncomingCall: () => true,
          stopRingTone: () => true,
          playRingTone: () => true
        }}
      />
    );

    await waitForElement(() => getByText('Receiving an incoming call'));
  });
  it('Answer when no devices found', async () => {
    const setisReceivingCall = jest.fn();
    let alert = 0;

    const { getByText, getByTestId } = render(
      <IncomingCallModal
        t={key => key}
        connected
        receivingCall
        callerName={'Bill Gates'}
        callerNumber={'************************************'}
        onCall={false}
        setIsReceivingCall={setisReceivingCall}
        phoneService={{
          acceptIncomingCall: () => true,
          hangUpCurrentCallAction: () => true,
          acceptIncomingCall: () => true,
          rejectIncomingCall: () => true,
          stopRingTone: () => true,
          playRingTone: () => true
        }}
      />
    );

    jest.spyOn(window, 'alert').mockImplementation(() => {
      alert = 1;
    });

    fireEvent(
      getByText('Answer'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      })
    );
    expect(alert).toBe(1);
  });

  it('Answer when devices found', async () => {
    const setisReceivingCall = jest.fn();
    let alert = 0;

    const { getByText, getByTestId } = render(
      <IncomingCallModal
        t={key => key}
        connected
        receivingCall
        callerName={'Bill Gates'}
        callerNumber={'************************************'}
        onCall={false}
        setIsReceivingCall={setisReceivingCall}
        phoneService={{
          acceptIncomingCall: () => true,
          hangUpCurrentCallAction: () => true,
          acceptIncomingCall: () => true,
          rejectIncomingCall: () => true,
          stopRingTone: () => true,
          playRingTone: () => true
        }}
      />
    );

    jest.spyOn(window, 'alert').mockImplementation(() => {
      alert = 1;
    });

    fireEvent(
      getByText('Answer'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      })
    );
  });

  it('Renders when there are no calls', async () => {
    const setisReceivingCall = jest.fn();

    const { getByText, getByTestId } = render(
      <IncomingCallModal
        t={key => key}
        connected
        receivingCall={false}
        callerName={undefined}
        callerNumber={undefined}
        onCall={false}
        setIsReceivingCall={setisReceivingCall}
        phoneService={{
          acceptIncomingCall: () => true,
          hangUpCurrentCallAction: () => true,
          acceptIncomingCall: () => true,
          rejectIncomingCall: () => true,
          stopRingTone: () => true,
          playRingTone: () => true
        }}
      />
    );
  });

  it('Renders when there are an incoming call during a call', async () => {
    const setisReceivingCall = jest.fn();

    const { getByText, getByTestId } = render(
      <IncomingCallModal
        t={key => key}
        connected
        receivingCall={true}
        callerName={'Jhon Doe'}
        callerNumber={'987654321654987'}
        onCall={true}
        setIsReceivingCall={setisReceivingCall}
        phoneService={{
          acceptIncomingCall: () => true,
          hangUpCurrentCallAction: () => true,
          acceptIncomingCall: () => true,
          rejectIncomingCall: () => true,
          stopRingTone: () => true,
          playRingTone: () => true
        }}
      />
    );
  });

  it('Click on "Hang up and answer" button', async () => {
    const setisReceivingCall = jest.fn();

    const { getByText, getByTestId } = render(
      <IncomingCallModal
        t={key => key}
        connected
        receivingCall={true}
        callerName={'Jhon Doe'}
        callerNumber={'987654321654987'}
        onCall={true}
        setIsReceivingCall={setisReceivingCall}
        phoneService={{
          acceptIncomingCall: () => true,
          hangUpCurrentCallAction: () => true,
          acceptIncomingCall: () => true,
          rejectIncomingCall: () => true,
          stopRingTone: () => true,
          playRingTone: () => true
        }}
      />
    );

    fireEvent(
      getByText('Hangup and Answer'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      })
    );
  });

  it('Click on "Reject" button', async () => {
    const setisReceivingCall = jest.fn();

    const { getByText, getByTestId } = render(
      <IncomingCallModal
        t={key => key}
        connected
        receivingCall={true}
        callerName={'Jhon Doe'}
        callerNumber={'987654321654987'}
        onCall={true}
        setIsReceivingCall={setisReceivingCall}
        phoneService={{
          acceptIncomingCall: () => true,
          hangUpCurrentCallAction: () => true,
          acceptIncomingCall: () => true,
          rejectIncomingCall: () => true,
          stopRingTone: () => true,
          playRingTone: () => true
        }}
      />
    );

    fireEvent(
      getByText('Reject'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      })
    );
  });

  it('Click on "Answer" button', async () => {
    global.alert = jest.fn();
    const setisReceivingCall = jest.fn();

    const { getByText, getByTestId } = render(
      <IncomingCallModal
        t={key => key}
        connected
        receivingCall={true}
        callerName={'Jhon Doe'}
        callerNumber={'987654321654987'}
        onCall={false}
        setIsReceivingCall={setisReceivingCall}
        phoneService={{
          acceptIncomingCall: () => true,
          hangUpCurrentCallAction: () => true,
          acceptIncomingCall: () => true,
          rejectIncomingCall: () => true,
          stopRingTone: () => true,
          playRingTone: () => true
        }}
      />
    );
    DetectRTC.hasMicrophone = true;
    DetectRTC.hasSpeakers = true;
    fireEvent(
      getByText('Answer'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      })
    );
  });

  it('Close modal', async () => {
    const setisReceivingCall = jest.fn();

    const { getByText, getByTestId, getByLabelText } = render(
      <IncomingCallModal
        t={key => key}
        connected
        receivingCall={true}
        callerName={'Jhon Doe'}
        callerNumber={'987654321654987'}
        onCall={false}
        setIsReceivingCall={setisReceivingCall}
        phoneService={{
          acceptIncomingCall: () => true,
          hangUpCurrentCallAction: () => true,
          acceptIncomingCall: () => true,
          rejectIncomingCall: () => true,
          stopRingTone: () => true,
          playRingTone: () => true
        }}
      />
    );

    fireEvent(
      getByLabelText('Close incoming call modal'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      })
    );
  });

  it('Close modal then click on banner', async () => {
    const setisReceivingCall = jest.fn();

    const { getByText, getByTestId, getByLabelText } = render(
      <IncomingCallModal
        t={key => key}
        connected
        receivingCall={true}
        callerName={'Jhon Doe'}
        callerNumber={'987654321654987'}
        onCall={false}
        setIsReceivingCall={setisReceivingCall}
        phoneService={{
          acceptIncomingCall: () => true,
          hangUpCurrentCallAction: () => true,
          acceptIncomingCall: () => true,
          rejectIncomingCall: () => true,
          stopRingTone: () => true,
          playRingTone: () => true
        }}
      />
    );

    fireEvent(
      getByLabelText('Close incoming call modal'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      })
    );

    fireEvent(
      getByLabelText('incoming call banner'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      })
    );
  });
});
