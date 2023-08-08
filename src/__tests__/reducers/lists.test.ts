import { describe, it, expectTypeOf, expect } from 'vitest';

import listReducer, {
  fetchLists,
  initialState,
} from '../../store/reducers/lists';

describe('lists reducer', () => {
  describe('structure', () => {
    it('Should be a function', () => {
      expectTypeOf(listReducer).toBeFunction();
    });
    it('should return an object', () => {
      expectTypeOf(listReducer(undefined, { type: 'an Action' })).toBeObject();
    });
  });

  describe('Execution', () => {
    it('Should return the initial state on first call', () => {
      expect(listReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
    });
  });

  it('Should handle fetchLists.fulfilled', () => {
    const fakePayload = [{ fakeList: 'testing' }];
    const fakeRequestID = 'id123456fake';
    const fakeArg = 0;

    const action = fetchLists.fulfilled(fakePayload, fakeRequestID, fakeArg);

    const state = listReducer(initialState, action);
    expect(state.list).toEqual(fakePayload);
  });
});
