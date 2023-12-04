import { Image } from 'react-native';
import getMp3Files from "./look_for_mp3";
import defaultImage from '../assets/icon.png'; // Asegúrate de reemplazar esto con la ruta de tu imagen

async function processFiles() {
  const files = await getMp3Files();

  if (!Array.isArray(files)) {
    console.error('getMp3Files did not return an array');
    return [];
  }

  return files.map(file => {
    const minutes = Math.floor(file.duration / 60);
    const seconds = Math.floor(file.duration % 60);

    return {
      filename: file.filename,
      duration: `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`,
      uri: file.uri,
      image: Image.resolveAssetSource(defaultImage).uri,
    };
    
  });
}

export default processFiles;