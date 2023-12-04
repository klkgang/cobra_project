//no idea what i'm doing but i hope this works 
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Button, TouchableOpacity, ScrollView } from 'react-native';
import title, {boxes} from '../styles_for_Screens/styles_start_screen.js';
import { LinearGradient } from 'expo-linear-gradient';
import { LocalFilesList } from '../logic/display_song/local.js';

function Main() {
    return (
      <>
        <SafeAreaView  style={title.conteiner}> 
          <LinearGradient colors={['#153969', '#1f1f1f', '#1f1f1f']} style={title.linear}>
          
          <View style={title.rightContainer}>
            <Image source={require('/workspaces/ss_project/ss_project/assets/favicon.png')} />
            <Text style={title.text}>Projecto SS</Text>
          </View>
          
          <TouchableOpacity style={title.button}>
            <Image 
              source={require('/workspaces/ss_project/ss_project/assets/favicon.png')}
            />
         </TouchableOpacity>
         
         </LinearGradient>
        </SafeAreaView>

        <SafeAreaView style={boxes.conteiner}>
          <ScrollView showsVerticalScrollIndicator={false}>
            
            <View style={boxes.section}>
              <Text style={[title.text, boxes.text_1]}>Recently Listened</Text>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {/* contenido */}
              </ScrollView>
            </View>

            <View style={boxes.section}>
              <Text style={[title.text, boxes.text_1]}>Top Songs</Text>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {/* contenido */}
              </ScrollView>
            </View>

            <View style={boxes.section}>
              <Text style={[title.text, boxes.text_1]}>From Your Local Lybrery</Text>
              <LocalFilesList />
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
}

export default Main;