import { React, useState }from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';

import ScreenContainer from '../../components/ScreenContainer.js';
import ScreenTitle from '../../components/ScreenTitle.js';
import { Feather } from '@expo/vector-icons';

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

  return (
    <ScreenContainer>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <ScreenTitle>Add a Book</ScreenTitle>
        <TouchableOpacity
          onPress={() => {
            console.log(`Add a Book: Add book pressed! Title: ${titleText}, Author: ${authorText}, Condition: ${condition}`);
          }}
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
  );
}

export default BookInfoScreen;