import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Switch = createSwitchNavigator({
  SignIn: SignIn,
  SignUp: SignUp,
});

export const Container = createAppContainer(Switch);
