import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import processFiles from '../get_information_from_mp3';
import words from '../../short/words';
import styles from '../../styles/songs';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { withTiming, withRepeat } from 'react-native-reanimated';
import { FlatList } from 'react-native';
import { playSong } from '../play_song';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';



function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
}

function cleanFilename(filename) {
    let cleanName = filename;
    words.forEach(word => {
        const regex = new RegExp(escapeRegExp(word), 'gi');
        cleanName = cleanName.replace(regex, '');
    });
    return cleanName;
}

const MarqueeText = ({ cleanName }) => {
  const translateX = useSharedValue(0);
  const textWidth = cleanName.length * 5;
  

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(-textWidth, { duration: 10000 }),
      -1
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }]
    };
  });

  return (
    <View style={{ width: 110, overflow: 'hidden', flexDirection: 'row' }}>
      <Animated.Text style={[styles.name, animatedStyle]} numberOfLines={3}>{cleanName}</Animated.Text>
      <Animated.Text style={[styles.name, animatedStyle]} numberOfLines={3}>{cleanName}</Animated.Text>
    </View>
  );
};

export function LocalFilesList() {
  const [files, setFiles] = useState([]);
  const navigation = useNavigation();


  useEffect(() => {
    const fetchFiles = async () => {
      const processedFiles = await processFiles();
      setFiles(processedFiles);
    };

    fetchFiles();
  }, []);
  
  return (
    <GestureHandlerRootView style={[{ flex: 1 }, styles.box]}>
      <FlatList
        data={files}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(file, index) => index.toString()}
        renderItem={({ item: file }) => {
          const cleanName = cleanFilename(file.filename);

          return (
            <View style={styles.listItem}>
              <TouchableOpacity onPress={() => {
                if (file.uri) {
                  playSong(file.uri);
                  navigation.navigate('Playing_music', { file: file, cleanName: cleanName });                  
                }
              }}>
                <Image source={{ uri: file.image }} style={{ width: 70, height: 70 }} />
              </TouchableOpacity>
              {cleanName.length > 19 ? (
                <MarqueeText cleanName={cleanName} style={styles.names} />
              ) : (
                <Text style={styles.name}>{cleanName}</Text>
              )}
            </View>
          );
        }}
      />
    </GestureHandlerRootView>
  );
}


