import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Image, Text, Button } from 'react-native';
import Slider from '@react-native-community/slider';
import { stopSong, setSongPosition, soundObject } from '../logic/play_song'; // Asegúrate de importar soundObject
import screenMusic from '../styles_for_Screens/styles_for_playingsong';

export default function Playing_music({ route }){
    const { file, cleanName } = route.params;
    const [songProgress, setSongProgress] = useState(0.00); 
    const [songDuration, setSongDuration] = useState(0.00); // Declarar songDuration con useState
    
    useEffect(() => {
        const interval = setInterval(async () => {
            if (soundObject) {
                const status = await soundObject.getStatusAsync();
                setSongProgress(status.positionMillis / 1000); // Actualizar el progreso de la canción
                setSongDuration(status.durationMillis / 1000); // Actualizar la duración de la canción
            }
        }, 1000); // Actualizar cada segundo

        return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
    }, []);

    const handleValueChange = (value) => {
        setSongProgress(value);
        setSongPosition(value);
    };

    return (
        <SafeAreaView style={screenMusic.conteiner}> 
            <View>
                <Image source={{ uri: file.image }} style={screenMusic.imagen} />
                <Text style={screenMusic.text}>{cleanName}</Text>
                <Text>{songProgress}</Text> 
                <Slider
                    style={{marginLeft:1, width:360, height: 40,}}
                    minimumValue={0}
                    maximumValue={songDuration}
                    value={songProgress}
                    onValueChange={handleValueChange}
                    minimumTrackTintColor='#fff'
                    maximumTrackTintColor='#000'
                    thumbTintColor='#fff'
                />
                <Text>{songDuration}</Text> {/* Mostrar la duración total de la canción */}            
            </View>
        </SafeAreaView>
    )
} 