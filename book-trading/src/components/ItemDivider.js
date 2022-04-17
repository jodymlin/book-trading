import React from 'react';
import { View } from 'react-native';

function ItemDivider(props) {
  return <View
    style={{
      flexDirection: "row",
      justifyContent: "center"
    }}
  >
    <View 
    style={{
      height: 1,
      borderBottomColor: '#c5c5c5',
      borderBottomWidth: 1.8,
      width: '90%'
    }}
    {...props}
  />
  </View>
}

export default ItemDivider;