import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/components/pages/Login";
import Main from "./src/components/pages/Main";
import MainCasino from "./src/components/pages/MainCasino";
import RecoverPassword from "./src/components/pages/RecoverPassword";
const Stack = createNativeStackNavigator();
const MyTheme = {
  dark: false,
  colors: {
    primary: "#8b5cf6",
    background: "#f1f1f1",
    card: "#ecf0f1",
    text: "#7f8c8d",
    border: "#f1f1f1",
  },
};
export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Recover" component={RecoverPassword} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="MainCasino" component={MainCasino} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
