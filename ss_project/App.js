import Main from "./Screens/start_screen";
import getStoragePermission from "./logic/permission";
import getMp3Files from "./logic/look_for_mp3";
import React, { useEffect } from 'react';
import processFiles from "./logic/get_information_from_mp3";
import { AppRegistry } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Playing_music from "./Screens/playing_music";

const Stack = createStackNavigator();

function App() {
  useEffect(() => {
    const fetchData = async () => {
      await getStoragePermission();
      const files = await getMp3Files();
      await processFiles(files);
    };

    fetchData();
  }, []);
  


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="S" 
        component={Main} 
        options={{headerShown: false}}
        />
        <Stack.Screen name="Playing_music"
        component={Playing_music}
        options={{headerShown: false}}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent('main', () => App);

export default App;