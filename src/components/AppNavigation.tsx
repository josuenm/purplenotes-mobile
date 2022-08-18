import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { UserContext, UserContextProps } from "../contexts/userContext";
import Dashboard from "../screens/Dashboard";
import Login from "../screens/Login";
import Register from "../screens/Register";

const { Navigator, Screen } = createNativeStackNavigator();

export default function AppNavigation() {
  const { user } = useContext(UserContext) as UserContextProps;

  return (
    <Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        <Screen name="Dashboard" component={Dashboard} />
      ) : (
        <>
          <Screen name="Login" component={Login} />
          <Screen name="Register" component={Register} />
        </>
      )}
    </Navigator>
  );
}
