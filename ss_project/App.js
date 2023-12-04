import Main from "./Screens/start_screen";
import getStoragePermission from "./logic/permission";
import getMp3Files from "./logic/look_for_mp3";
import React, { useEffect } from 'react';
import processFiles from "./logic/get_information_from_mp3";


function App() {
  useEffect(() => {
    getStoragePermission();
    getMp3Files();
    processFiles();
  }, []);
  
  
  return (
    <Main />
  );
}

export default App;