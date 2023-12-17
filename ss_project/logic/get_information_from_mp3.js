import { Image } from 'react-native';
import defaultImage from '../assets/playlist1.png'; 
import getMp3Files from './look_for_mp3'

async function processFiles() {
  const assets = await getMp3Files();

  if (!Array.isArray(assets)) {
    console.error('getMp3Files did not return an array');
    return [];
  } 

  const processedFiles = assets.map(asset => {
    const minutes = Math.floor(asset.duration / 60);
    const seconds = Math.floor(asset.duration % 60);
  
    return {
      filename: asset.filename,
      duration: `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`,
      uri: asset.uri,
      image: Image.resolveAssetSource(defaultImage).uri, 
    };
  });
  
  return processedFiles;
}

export default processFiles;