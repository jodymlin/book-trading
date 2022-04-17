import React from 'react';

import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function ScreenContainer(props) {
  return (
    <SafeAreaView>
      <View 
        style={{
          padding: 24,
          fontFamily: ['Poppins', 'Open Sans']
        }}
        {...props}
      />
    </SafeAreaView>
  )
}

export default ScreenContainer;