import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import 'react-native-gesture-handler';
import AuthNavigation from "./src/navigation/AuthNavigation";

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <AuthNavigation/>
      </PaperProvider>
    </NavigationContainer>
  );
}
