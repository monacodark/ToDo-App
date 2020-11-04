import React from 'react'
import {StyleSheet, View, ActivityIndicator} from 'react-native'

import {theme} from '../../theme'

export const AppLoader = () => (
  <View style={styles.loader}>
    <ActivityIndicator size="large" color={theme.colors.blue} />
  </View>
)

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
