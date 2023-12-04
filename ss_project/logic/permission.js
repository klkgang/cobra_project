import * as MediaLibrary from 'expo-media-library';

async function getStoragePermission() {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('We need your permission to access your media library');
  }
}

export default getStoragePermission;
