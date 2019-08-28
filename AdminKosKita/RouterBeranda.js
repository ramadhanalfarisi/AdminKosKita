import {createStackNavigator, createAppContainer} from 'react-navigation';
import TambahKost from './TambahKost';
import Main from './Main';
import Chat from './Chat';
import AddKost from './AddKost';
import ListKost from './ListKost';
import ModalList from './ModalList';
import EditKost from './EditKost';
import ViewPesan from './ViewPesan';

const Stack = createStackNavigator(
  {
    Main: Main,
    TambahKost: TambahKost,
    Chat: Chat,
    AddKost: AddKost,
    ListKost: ListKost,
    ModalList: ModalList,
    EditKost: EditKost,
    ViewPesan: ViewPesan,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export const ContainerBeranda = createAppContainer(Stack);
