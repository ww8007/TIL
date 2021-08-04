const INITIAL_STATE = { value: 0 };
const reducer = createReducer(INITIAL_STATE, {
  INCREMENT: (state) => (state.value += 1),
});
const store = createStore(reducer);

let prevState;
store.subscribe(() => {
  const state = store.getState();
  if (state === prevState) {
    console.log('상태값 같음');
  } else {
    console.log('상태값 변경');
  }
  prevState = state;
});

store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'OTHER_ACTION' });
store.dispatch({ type: 'INCREMENT' });
