import configureMockStore from "redux-mock-store";
import { apiMiddleware } from "redux-api-middleware";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";

import * as actions from "calls/actions/contacts";
import {
  ADD_CONTACTS_REQUEST,
  ADD_CONTACTS_SUCCESS, GET_CONTACTS_PROFILE_REQUEST, GET_CONTACTS_PROFILE_SUCCESS,
  GET_CONTACTS_REQUEST,
  GET_CONTACTS_SUCCESS, REMOVE_CONTACTS_REQUEST, REMOVE_CONTACTS_SUCCESS
} from "../../../calls/actions/contacts";

const middlewares = [thunk, apiMiddleware];
const mockStore = configureMockStore(middlewares);

describe("contacts actions", () => {

  it("should create an action to select a contact", () => {
    const expectedAction = {
      type: actions.SELECT_CONTACT
    };
    expect(actions.selectContact()).toEqual(expectedAction);
  });

  it("should create an action to unselect a contact", () => {
    const expectedAction = {
      type: actions.UNSELECT_CONTACT
    };
    expect(actions.unSelectContact()).toEqual(expectedAction);
  });

  it("should return an API endpoint", () => {
    const path = "/api/v1/contacts";
    const expectedPath = "http://localhost:7075/api/v1/contacts";
    expect(actions.buildCallsApiEndpoint(path)).toEqual(expectedPath);
  });


});


describe("async contacts actions", () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it("should return list of user's contacts", () => {

    const body = [
      {
        division: "DIVISION",
        cernGroup: "GROUP",
        cernSection: "SECTION",
        displayName: "NAME"
      }
    ];

    fetchMock.getOnce(
      `http://localhost:7075/api/v1/contacts/`,
      { body: body, headers: { "content-type": "application/json" } }
    );

    const expectedActions = [
      { type: actions.GET_CONTACTS_REQUEST },
      { type: actions.GET_CONTACTS_SUCCESS, payload: body }
    ];
    const store = mockStore({});
    return store.dispatch(actions.getUserContacts()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });

  });


  it('should dispatch ADD_CONTACTS_SUCCESS when addUserContact is called', () => {

    const body = {
      firstName: "John",
      lastName: "One",
      personId: "123456",
      division: "IT"
    };

    fetchMock.postOnce(`http://localhost:7075/api/v1/contacts/`,
      {body: body, headers: {'content-type': 'application/json'}});

    const expectedActions = [
      {type: actions.ADD_CONTACTS_REQUEST},
      {type: actions.ADD_CONTACTS_SUCCESS, payload: body}
    ];
    const store = mockStore({});
    return store.dispatch(actions.addUserContact(body)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  });


  it('should dispatch REMOVE_CONTACTS_SUCCESS when removeUserContact is called', () => {

    const body = {
      personId: 1
    };

    fetchMock.deleteOnce(`http://localhost:7075/api/v1/contacts/`,
      {body: body, headers: {'content-type': 'application/json'}});

    const expectedActions = [
      {type: actions.REMOVE_CONTACTS_REQUEST},
      {type: actions.REMOVE_CONTACTS_SUCCESS, payload: body}
    ];

    const store = mockStore({});
    return store.dispatch(actions.removeUserContact(body)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

  it("should return a given user profile", () => {

    const personId = '12345';

    const body = [
      {
        division: "DIVISION",
        cernGroup: "GROUP",
        cernSection: "SECTION",
        displayName: "NAME"
      }
    ];

    fetchMock.getOnce(
      `http://localhost:7075/api/v1/users/?personId=${personId}`,
      { body: body, headers: { "content-type": "application/json" } }
    );

    const expectedActions = [
      { type: actions.GET_CONTACTS_PROFILE_REQUEST },
      { type: actions.GET_CONTACTS_PROFILE_SUCCESS, payload: body }
    ];
    const store = mockStore({});
    return store.dispatch(actions.getUserProfileById(personId)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });

  });

});