import React from 'react';
import { View, TouchableOpacity, FlatList, Text, StyleSheet } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import ScreenTitle from '../../components/ScreenTitle.js';
import { Feather } from '@expo/vector-icons';
import MyBookTile from '../../components/MyBookTile';
import ItemDivider from '../../components/ItemDivider';

const books = [

  {
    title: "Atomic Habits",
    author: "James Clear",
    condition: "New"
  }, 
  {
    title: "Why We Sleep",
    author: "Matthew Walker",
    condition: "Used"
  }, 
  {
    title: "Harry Potter and the Prisoner of Azkaban",
    author: "J.K. Rowling",
    condition: "Very Good"
  }, 
  {
    title: "Nothing to Envy: Ordinary Lives in North Korea",
    author: "Barbara Demick",
    condition: "Used"
  },
  {
    title: "Stinky Poopy: A Memoir",
    author: "Eugene Lo",
    condition: "New"
  },
  {
    title: "Testing: A Memoir",
    author: "ahhhh",
    condition: "Good"
  }
];

function MyBooksScreen() {
  return (
    <ScreenContainer>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <ScreenTitle>My Books</ScreenTitle>
        <TouchableOpacity
          onPress={() => {}}
        >
          <Feather name="plus" size={32} color="black" />
        </TouchableOpacity>
      </View>

      {books && books.length === 0 ? 
        <View
          style={styles.emptyListTextContainer}
        >
          <Text style={styles.emptyListText}>
            <Text>
              press{` `}
            </Text>
            <Feather name="plus" size={26} color="rgba(0, 0, 0, 0.6)" />
            <Text>
              {` `}to add a book
            </Text>
          </Text>
        </View> : 
        <FlatList 
          showsVerticalScrollIndicator={false}
          data={books}
          keyExtractor={item => `${item.title}-${item.author}-${item.condition}`}
          ItemSeparatorComponent={ItemDivider}
          renderItem={({item}) => <MyBookTile 
            title={item.title}
            author={item.author}
            condition={item.condition}
          />}
        />        
      }
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  emptyListTextContainer: {
    height: '90%',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  emptyListText: {
    fontFamily: "OpenSans_400Regular",
    color: 'rgba(0, 0, 0, 0.6)', 
    fontSize: 20,
    textAlign: 'center',
  },
});

export default MyBooksScreen;