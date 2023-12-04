import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import processFiles from '../get_information_from_mp3';
import words from '../../short/words';

export function LocalFilesList() {
    const [files, setFiles] = useState([]);
  
    useEffect(() => {
      const fetchFiles = async () => {
        const processedFiles = await processFiles();
        setFiles(processedFiles);
      };
  
      fetchFiles();
    }, []);
  
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& significa la cadena completa
      }
      
      function cleanFilename(filename) {
        let cleanName = filename;
        words.forEach(word => {
          const regex = new RegExp(escapeRegExp(word), 'gi');
          cleanName = cleanName.replace(regex, '');
        });
        return cleanName;
      }
  
    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {files.map((file, index) => (
          <View key={index}>
            <Text>{cleanFilename(file.filename)}</Text>
            <Text>{file.duration}</Text>
            <Image source={{ uri: file.image }} style={{width: 50, height: 50}} />
          </View>
        ))}
      </ScrollView>
    );
  }