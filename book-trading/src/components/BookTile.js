import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native";


function BookTile (props){
    return (
        <TouchableOpacity
            onPress={() => {}}
        >
            <View style={styles.bookTileContainer}>
                <Image style={styles.image} source={require('../../assets/book.png')}/>
                <View style={styles.infoContainer}>
                <Text style={styles.titleText}
                >{props.title}</Text>
                    <Text style = {styles.authorText}>{props.author}</Text>
                    <Text style = {styles.availableText}>{props.available} available</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    bookTileContainer: {
        padding: 24,
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-around',
        width: "100%",
        // borderBottomColor: 'rgba(0, 0, 0, 0.6)',
        // borderBottomWidth: 2
    },
    infoContainer: {
        width: "65%",
        alignItems: 'center',
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
    availableText: {
        fontSize: 14,
        textAlign: 'center',
        color: 'rgba(0, 0, 0, 0.6)',
        fontFamily: "OpenSans_400Regular"
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'center',
    }
});

export default BookTile; 
