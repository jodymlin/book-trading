import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';

function MyBookTile (props){
    return (
        <View style={styles.bookTileContainer}> 
        <View style={styles.bookInfoContainer}>
            <Image style={styles.image} source={require('../../assets/book.png')}/>
            <View style={styles.infoContainer}>
                <Text style = {styles.titleText}>{props.title}</Text>
                <Text style = {styles.authorText}>{props.author}</Text>
                <Text style = {styles.conditionText}>Condition: {props.condition}</Text>
            </View>
        </View>
        <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => {console.log("My Books: Delete Book!")}}
        >
            <Feather name="trash-2" size={24} color="#c5c5c5" />
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    bookTileContainer: {
        padding: 24,
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-around',
        width: "100%",
    },
    bookInfoContainer: {
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    infoContainer: {
        width: "70%",
        alignItems: 'center',
        paddingLeft: 16
    },
    titleText: {
        fontFamily: "OpenSans_600SemiBold",
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 22,
    },
    authorText: {
        fontFamily: "OpenSans_400Regular",
        fontSize: 16,
        textAlign: 'center',
        paddingBottom: 10
    },
    conditionText: {
        fontSize: 14,
        textAlign: 'center',
        color: 'rgba(0, 0, 0, 0.6)',
        fontFamily: "OpenSans_400Regular"
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'center'
    },
    deleteButton: {
        padding: 8,
        width: '30%',
        justifyContent: 'center',
        alignItems: 'flex-end'
    }
});

export default MyBookTile; 