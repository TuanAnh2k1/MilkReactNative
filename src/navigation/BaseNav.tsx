/* eslint-disable react/react-in-jsx-scope */
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {store} from '../actions';
import AddMembers from '../screens/AddMembers/AddMembers';
import Home from '../screens/Home/Home';
import ProductsScreens from '../screens/ProductsScreens/ProductsScreen';
import QRCodeInvite from '../screens/QrCode/QRCodeInvite';
import AddMilk from '../screens/Milk/AddMilk/AddMilk';
import EmailMilk from '../screens/Milk/EmailMilk/EmailMilk';
import Milk from '../screens/Milk/Milk';
import MilkDetail from '../screens/Milk/MilkDetail/MilkDetail';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import Single from '../screens/Single/Single';
import Card from '../screens/Milk/Card/Card';
import Profile from '../screens/Profile/Profile';
import UpdateProfile from '../screens/Profile/UpdateProfile';
import CreateProfile from '../screens/Profile/CreateProfile';
import MilkUpdate from '../screens/Milk/MilkDetail/MilkUpdate';

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Milk"
        component={Milk}
      />
      {/* <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={Home}
      /> */}
      <Stack.Screen
        options={{headerShown: false}}
        name="Product"
        component={ProductsScreens}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SignIn"
        component={SignInScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SignUp"
        component={SignUpScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="AddMembers"
        component={AddMembers}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="MilkDetail"
        component={MilkDetail}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="EmailMilk"
        component={EmailMilk}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="AddMilk"
        component={AddMilk}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="UpdateMilk"
        component={MilkUpdate}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Card"
        component={Card}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Single"
        component={Single}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="QRCodeInvite"
        component={QRCodeInvite}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Profile"
        component={Profile}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="UpdateProfile"
        component={UpdateProfile}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="CreateProfile"
        component={CreateProfile}
      />
    </Stack.Navigator>
  );
}

const Mainnavigator = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default Mainnavigator;
