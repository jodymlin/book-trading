import React from "react";
import BookTile from "./BookTile.js"
import { View, Text } from "react-native"

function BookSearch (props) {
    return (
        <View>
            <BookTile title="Atomic Habits" author="James Clear" available="2"/>
        </View>
    )
}

export default BookSearch;