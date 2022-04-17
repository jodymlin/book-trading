import React from "react";
import BookTile from "../../components/BookTile.js";
import ScreenContainer from '../../components/ScreenContainer.js';
import ScreenTitle from '../../components/ScreenTitle.js';
import { View, FlatList, TouchableOpacity } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import ItemDivider from "../../components/ItemDivider.js";

const books = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    available: "2",
  }, 
  {
    title: "Why We Sleep",
    author: "Matthew Walker",
    available: "3",
  }, 
  {
    title: "Harry Potter and the Prisoner of Azkaban",
    author: "J.K. Rowling",
    available: "5",
  }, 
  {
    title: "Nothing to Envy: Ordinary Lives in North Korea",
    author: "Barbara Demick",
    available: "1",
  },
  {
    title: "Stinky Poopy: A Memoir",
    author: "Eugene Lo",
    available: "1",
  },
  {
    title: "Testing: A Memoir",
    author: "ahhhh",
    available: "1",
  }
];

function BookSearchScreen () {
    return (
        <ScreenContainer>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <ScreenTitle>Books Near You</ScreenTitle>
            <TouchableOpacity
              onPress={() => {console.log('Books Near You: Search button pressed!')}}
            >
              <Ionicons name="search" size={32} color="black" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={books}
            ItemSeparatorComponent={ItemDivider}
            keyExtractor={(item) => `${item.title}-${item.author}`}
            renderItem={({item}) => { 
              return <BookTile 
                title={item.title}
                author={item.author}
                available={item.available}
            />}}
          />
        </ScreenContainer>
    )
}

export default BookSearchScreen; 