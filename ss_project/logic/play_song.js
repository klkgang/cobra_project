import { Audio } from 'expo-av';

let soundObject = null;
let songDuration = 0;

async function playSong(uri) {
  if (!uri) {
    return;
  }

  if (soundObject) {
    try {
      await soundObject.stopAsync();
      await soundObject.unloadAsync();
    } catch (error) {
      console.log('Error stopping audio', error);
    }
  }

  soundObject = new Audio.Sound();
  try {
    await soundObject.loadAsync({ uri: uri });
    const status = await soundObject.getStatusAsync();
    songDuration = status.durationMillis / 1000; // Convertir a segundos
    await soundObject.playAsync();
  } catch (error) {
    console.log('Error loading audio', error);
  }
}

async function stopSong() {
  if (soundObject) {
    try {
      await soundObject.stopAsync();
      await soundObject.unloadAsync();
      soundObject = null;
    } catch (error) {
      console.log('Error stopping audio', error);
    }
  }
}

async function setSongPosition(seconds) {
  if (soundObject) {
    try {
      await soundObject.setPositionAsync(seconds * 1000); // Convertir a milisegundos
    } catch (error) {
      console.log('Error setting position', error);
    }
  }
}

export { playSong, stopSong, songDuration, setSongPosition };