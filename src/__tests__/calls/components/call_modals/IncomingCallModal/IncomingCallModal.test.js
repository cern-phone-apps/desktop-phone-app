import { shallow } from "enzyme/build";
import { IncomingCallModal } from "calls/components/call_modals/IncomingCallModal/IncomingCallModal";
import React from "react";

describe("Incoming Call Modal Tests", () => {
  it("renders IncomingCallModal without crashing", () => {
    const isReceivingCall = jest.fn();
    const wrapper = shallow(
      <IncomingCallModal
        connected={true}
        isReceivingCall={isReceivingCall}
        phoneService={{}}
        receivingCall
        t={key => key}
      />
    );

    expect(wrapper.text()).toEqual("<Modal />");
  });

  it("contains CallingModalContent", () => {
    const isReceivingCall = jest.fn();
    const wrapper = shallow(
      <IncomingCallModal
        connected={true}
        isReceivingCall={isReceivingCall}
        phoneService={{}}
        receivingCall
        t={key => key}
      />
    );

    expect(wrapper.debug()).toContain("CallingModalContent");
  });

  it("is empty when not connected", () => {
    const isReceivingCall = jest.fn();
    const wrapper = shallow(
      <IncomingCallModal
        connected={false}
        isReceivingCall={isReceivingCall}
        phoneService={{}}
        receivingCall
        t={key => key}
      />
    );

    expect(wrapper.debug()).toBe("");
  });

  // it("can accept incoming call", () => {
  //   const isReceivingCall = jest.fn();
  //   const acceptIncomingCall = jest.fn();
  //
  //   const phoneService = {
  //     acceptIncomingCall: acceptIncomingCall
  //   };
  //
  //   const wrapper = shallow(
  //     <IncomingCallModal
  //       connected={false}
  //       isReceivingCall={isReceivingCall}
  //       phoneService={phoneService}
  //       receivingCall
  //       t={key => key}
  //     />
  //   );
  //
  // });

  it("contains CallingModalContent", () => {
    const isReceivingCall = jest.fn();
    const wrapper = shallow(
      <IncomingCallModal
        connected={true}
        isReceivingCall={isReceivingCall}
        phoneService={{}}
        receivingCall
        t={key => key}
      />
    );


    wrapper.setProps({ callerName: 'test', callerNumber: '123' },  () => {

      wrapper.setState({ modalHidden: true }, () => {
        wrapper.update();
        // console.log('wrapper ddebug: ' + wrapper.debug());
        const div = wrapper.find('ModalTrigger').first();
        // TODO: not done yet, need to continue
        // div.simulate('click');
        expect(wrapper.state().modalHidden).toBe(true);
      });

    }  );

  });


});
