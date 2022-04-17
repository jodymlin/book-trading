import { React, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer.js';
import ScreenTitle from '../../components/ScreenTitle.js';
import BookOwnerProfileList from '../../components/BookOwnerProfileList.js';
import { AntDesign } from '@expo/vector-icons';
import { firebase } from "../../firebase/config";

function BookInfoScreen({navigation, userData, ...props }) {
    let [ bookData, setBookData ] = useState({})

    useEffect(() => {
        const db = firebase.firestore()
        const docRef = db.collection('books').doc(props.route.params.bid);
        docRef.get().then((doc) => {
            if (doc.exists) {
                setBookData(doc.data());
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
      }, []);
    return(
        <ScreenContainer> 
            <TouchableOpacity
                onPress={() => {navigation.goBack()}}
            >
                <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.container}>
                <ScreenTitle>{bookData.bname}</ScreenTitle>
                <Text style={styles.text}>{bookData.author}</Text>
                <Image style={styles.image} source={require("../../../assets/book.png")}/>
            </View>
            <BookOwnerProfileList listings={bookData.listings} />
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        paddingBottom: 25,
    },
    text: {
        fontSize: 16,
        fontFamily: "Poppins_400Regular",
        paddingBottom: 25
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'stretch',
    }
});

export default BookInfoScreen;