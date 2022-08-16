import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../screens/Dashboard";
import Login from "../screens/Login";
import Register from "../screens/Register";

const { Navigator, Screen } = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Login" component={Login} />
      <Screen name="Register" component={Register} />
      <Screen name="Dashboard" component={Dashboard} />
    </Navigator>
  );
}
