import * as MediaLibrary from 'expo-media-library';

async function getMp3Files() {
  const { assets } = await MediaLibrary.getAssetsAsync({
    mediaType: 'audio',
  });

  return assets.filter(asset => asset.filename.endsWith('.mp3'));
}

export default getMp3Files;