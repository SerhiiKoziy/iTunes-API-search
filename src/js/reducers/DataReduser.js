import * as types from '../constants/ActionTypes';
import { INITIAL_STATE } from '../constants/InitialState';

export default function DataReduser(state = INITIAL_STATE, action) {

  switch (action.type) {

    case types.ADD_FILTER:

      const filterValue = action.value;
      const sortedData = state.historyData.filter( (row) => row.phonenumber.includes(filterValue) );
      return {
        ...state,
        filteredData: sortedData,
        // isDesc: !state.isDesc,
        // activeUser: sortedData.get(0)
      }


    default:
      return state;
  }
}
