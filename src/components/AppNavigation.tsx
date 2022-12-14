import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import AboutApp from "../screens/AboutApp";
import Dashboard from "../screens/Dashboard";
import EditNote from "../screens/EditNote";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Settings from "../screens/Settings";
import UserInformation from "../screens/UserInformation";

const { Navigator, Screen } = createNativeStackNavigator();

export default function AppNavigation() {
  const { user } = useContext(UserContext);

  return (
    <Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        <>
          <Screen name="Dashboard" component={Dashboard} />
          <Screen name="Settings" component={Settings} />
          <Screen name="UserInformation" component={UserInformation} />
          <Screen name="EditNote" component={EditNote} />
          <Screen name="AboutApp" component={AboutApp} />
        </>
      ) : (
        <>
          <Screen name="Login" component={Login} />
          <Screen name="Register" component={Register} />
        </>
      )}
    </Navigator>
  );
}
