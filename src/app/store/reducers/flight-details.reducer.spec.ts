
import * as fromFlightDetailsReducer from './flight-details.reducer';
import * as actions from 'src/app/store/actions/flight-details.actions';
import { FlightResult } from 'src/app/core/models';
import { mockFlightResult } from '../mockData/mock-flight-details';

describe('FlightDetailsReducer', () => {

  it('should handle action "[FlightDetails] SET_FlightDetails_LOADING" correctly', () => {
    const reducer = fromFlightDetailsReducer.reducer(
      fromFlightDetailsReducer.initialState, actions.setFlightDetailsLoading);
    expect(reducer.loading).toEqual(true);
  });

  it('should handle action "[FlightDetails] GET_FlightDetails_SUCCESS" correctly', () => {

    const flightResult: FlightResult = mockFlightResult;
    const action = { type: '[FlightDetails] GET_FlightDetails_SUCCESS', flightResult };
    const reducer = fromFlightDetailsReducer.reducer(
      fromFlightDetailsReducer.initialState, action);
    const id = 'MELPEK15746868000001574946000000';
    expect(reducer.entities[id].id).toEqual(id);
  });


});
