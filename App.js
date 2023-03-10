import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import 'react-native-gesture-handler';
import AuthNavigation from "./src/navigation/AuthNavigation";
import { store } from "./src/store/store";
import { Provider } from 'react-redux'

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <PaperProvider>
        <AuthNavigation/>
      </PaperProvider>
    </NavigationContainer>
    </Provider>
  );
}
