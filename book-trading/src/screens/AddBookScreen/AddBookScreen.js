import { React, useState }from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenContainer from '../../components/ScreenContainer.js';
import ScreenTitle from '../../components/ScreenTitle.js';
import { Feather } from '@expo/vector-icons';
import { firebase } from '../../firebase/config'

const styles = StyleSheet.create({
  textInputWrapper: {
    paddingTop: 16
  },
  inputText: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 22
  },
  inputHeader: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 16
  },
  conditionWrapper: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

function BookInfoScreen() {
  const [ titleText, setTitleText ] = useState('');
  const [ authorText, setAuthorText ] = useState('');
  const [ condition, setCondition ] = useState('');

  const conditions = [ "Used", "Good", "Very Good", "New" ];

  const addToDatabase = async () => {
    console.log(`Add a Book: Add book pressed! Title: ${titleText}, Author: ${authorText}, Condition: ${condition}`);
    const db = firebase.firestore()
    let books = []
    let bid = 0
    let lid = 0
    let querySnapshot= await db.collection("books")
                              .where("bname", "==", titleText)
                              .get()
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      books.push(doc.data());
    });
    console.log(books)
    if (books.length == 0)
    {
      let newBook = db.collection("books").doc()
      let newListing = db.collection("listings").doc()

      bid = newBook.id
      lid = newListing.id

      const bookData = {
        author: authorText,
        bid,
        bname: titleText,
        listings: [lid]
      }

      const listData = {
        author: authorText,
        bid,
        bname: titleText,
        condition,
        lid,
        uid: 1
      }

      newListing.set(listData)
      newBook.set(bookData)
    }
    else
    {
      bid = books[0].bid
      console.log(bid)

      let newListing = db.collection("listings").doc()
      lid = newListing.id

      const listData = {
        author: authorText,
        bid,
        bname: titleText,
        condition,
        lid,
        uid: 1
      }

      newListing.set(listData)

      let book = db.collection("books").doc(bid)
      book.update({
        listings: firebase.firestore.FieldValue.arrayUnion(lid)
      })
    }
  }

  return (
    <SafeAreaView>
      <ScreenContainer>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <ScreenTitle>Add a Book</ScreenTitle>
          <TouchableOpacity
            onPress={addToDatabase}
          >
            <Feather name="check" size={32} color="black" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 50
          }}
        >
          <Image 
            style={{
              width: 200,
              height: 200,
              resizeMode: 'center'
            }}
            source={require('../../../assets/book.png')}
          />
        </View>
        {/* Title Text Input */}
        <View
          style={styles.textInputWrapper}
        >
          <Text
            style={styles.inputHeader}
          >
            Title
          </Text>
          <TextInput 
            style={styles.inputText}
            allowFontScaling
            placeholder="enter book title"
            onChangeText={text => setTitleText(text)}
            value={titleText}
            scrollEnabled
          />
        </View>
        
        {/* Author Text Input */}
        <View
          style={styles.textInputWrapper}
        >
          <Text
            style={styles.inputHeader}
          >
            Author
          </Text>
          <TextInput
            style={styles.inputText}
            allowFontScaling
            placeholder="add author"
            onChangeText={text => setAuthorText(text)}
            value={authorText}
            scrollEnabled
          />
        </View>

        <View
          style={styles.textInputWrapper}
        >
          <Text
            style={styles.inputHeader}
          >
            Condition
          </Text>

          <View style={styles.conditionWrapper}>
            {conditions.map(choice => <TouchableOpacity 
                style={{
                  borderColor: '#FFE15C',
                  borderRadius: 20,
                  borderWidth: condition === choice ? 2 : 0,
                  padding: 8
                }}
                key={choice}
                onPress={ () => {setCondition(choice)}}
              >
              <Text
                style={{
                  fontFamily: "OpenSans_400Regular",
                  color: condition === choice ?  'black' : 'grey'
                }}
              >
                {choice}
              </Text>
            </TouchableOpacity>)
            }
          </View>
          
        </View>
      </ScreenContainer>
    </SafeAreaView>
  );
}

export default BookInfoScreen;