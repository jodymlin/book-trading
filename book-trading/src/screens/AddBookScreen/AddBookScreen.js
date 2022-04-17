import { React, useState }from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';

import ScreenContainer from '../../components/ScreenContainer.js';
import ScreenTitle from '../../components/ScreenTitle.js';
import { firebase } from '../../firebase/config'
import { AntDesign } from '@expo/vector-icons'; 

const styles = StyleSheet.create({
  textInputWrapper: {
    paddingBottom: 24,
    paddingLeft: 12,
    paddingRight: 12
  },
  inputText: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 18,
    paddingTop: 8,
  },
  inputHeader: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 20,
  },
  conditionWrapper: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

function BookInfoScreen({ navigation, userData, ...props }) {
  const [ titleText, setTitleText ] = useState('');
  const [ authorText, setAuthorText ] = useState('');
  const [ condition, setCondition ] = useState('');
  const [ submissionError, setSubmissionError ] = useState(false);

  const conditions = [ "Used", "Good", "Very Good", "New" ];

  const addToDatabase = async () => {
    // prevent user from submitting empty data
    setTitleText(titleText.trim());
    setAuthorText(authorText.trim());
    setCondition(condition.trim());
    if (titleText === '' || authorText === '' || condition === '') {
      setSubmissionError(true);
      return;
    }

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
        uid: userData.uid
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
        uid: userData.uid
      }

      newListing.set(listData)

      let book = db.collection("books").doc(bid)
      book.update({
        listings: firebase.firestore.FieldValue.arrayUnion(lid)
      })
    }
    navigation.goBack()
  }

  return (
    <ScreenContainer>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <ScreenTitle>Add a Book</ScreenTitle>
        {/* Empty view to create spacing effect we want*/}
        <View />
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

      {submissionError ? 
        <Text
          style={{
            fontFamily: "OpenSans_400Regular",
            color: "#F5788E",
            textAlign: "center",
            fontSize: 16
          }}
        >
          All fields must be filled
        </Text> : 
        null}
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
                borderColor: '#FCABD8',
                backgroundColor: condition === choice ? '#FCABD8' : '#00000000',
                borderRadius: 20,
                borderWidth: condition === choice ? 2 : 0,
                padding: 8
              }}
              key={choice}
              onPress={ () => {setCondition(choice)}}
            >
            <Text
              style={{
                fontFamily: "OpenSans_600SemiBold",
                color: condition === choice ?  'white' : 'grey'
              }}
            >
              {choice}
            </Text>
          </TouchableOpacity>)
          }
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 16
          }}
        >
          <TouchableOpacity
              onPress={addToDatabase}
              style={{
                borderColor: '#84CAE7',
                borderWidth: 2,
                borderRadius: 24,
                backgroundColor: "#84CAE7",
                padding: 8,
                width: 80,
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  color: "white",
                  fontSize: 20,
                  fontFamily: "OpenSans_400Regular",
                }}
              >save</Text>
            </TouchableOpacity>
          </View>
      </View>
    </ScreenContainer>
  );
}

export default BookInfoScreen;