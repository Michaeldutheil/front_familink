import listReducer from './lists';
import userReducer from './user';
import pictureReducer from './picture';
import familyReducer from './family';
import messageReducer from './message';
import agendaReducer from './agenda';

const reducer = {
  user: userReducer,
  lists: listReducer,
  pictures: pictureReducer,
  family: familyReducer,
  messages: messageReducer,
  agendas: agendaReducer,
};

export default reducer;
