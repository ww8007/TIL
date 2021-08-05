import createItemsLogic from '../common/createItemsLogic';

const { add, reducer, remove, edit } = createItemsLogic('friend');

export const addFriend = add;
export const removeFriend = remove;
export const editFriend = edit;
export default reducer;
