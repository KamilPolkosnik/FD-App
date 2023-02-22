import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import RedirectScreen from "./src/screens/RedirectScreen";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import RemindPasswordScreen from "./src/screens/RemindPasswordScreen";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import Dashboard from "./src/screens/Dashboard";

const Stack = createNativeStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyBx4xzjHSVN-l12UTHaYfGYnLv3N-DbIxg",
  authDomain: "fd-app-1dc2e.firebaseapp.com",
  projectId: "fd-app-1dc2e",
  storageBucket: "fd-app-1dc2e.appspot.com",
  messagingSenderId: "30717747572",
  appId: "1:30717747572:web:9f0d6f3252e5e12e000c21",
  measurementId: "G-PWFWJ392MR",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Remind"
            component={RemindPasswordScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Redirect"
            component={RedirectScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}
