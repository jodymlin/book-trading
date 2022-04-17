import { React, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenContainer from '../../components/ScreenContainer.js';
import ScreenTitle from '../../components/ScreenTitle.js';
import { firebase } from "../../firebase/config";

export default function ProfileScreen({ navigation, userData, ...props }) {
    return (
      <SafeAreaView>
        <ScreenContainer>
          <ScreenTitle>Profile</ScreenTitle>
          <View style={styles.imageContainer}>
            <Image style={styles.profilePicture} source={require("../../../assets/yellow-bean.png")}/>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Username</Text>
            <Text style={styles.userText}>{userData.username}</Text>
            <Text style={styles.text}>Email</Text>
            <Text style={styles.userText}>{userData.email}</Text>
          </View>
        </ScreenContainer>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  imageContainer: {
      alignItems: "center",
      padding: 50,
  },  
  textContainer: {
      alignItems: "center",
  },
  profilePicture: {
      width: 200,
      height: 200,
      resizeMode: 'center',
  },
  text: {
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
    paddingBottom: 5,
  },
  userText: {
    fontSize: 20,
    fontFamily: "OpenSans_700Bold",
    paddingBottom: 25,
  }
});


