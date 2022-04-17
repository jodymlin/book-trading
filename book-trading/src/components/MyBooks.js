import React from "react";
import MyBookTile from "./MyBookTile.js"
import { View } from "react-native"

function MyBooks() {
    return (
        <View>
            <MyBookTile title="Atomic Habits" author="James Clear" condition="New"/>
            <MyBookTile title="Why We Sleep" author="Matthew Walker" condition="Good"/>
        </View>
    )
}

export default MyBooks; 