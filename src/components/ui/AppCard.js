import React from 'react'
import {View, StyleSheet} from 'react-native'
import PropTypes from 'prop-types'

import {theme} from '../../theme'

export const AppCard = ({children}) => (
  <View style={styles.card}>
    {children}
  </View>
)

AppCard.propTypes = {
  children: PropTypes.node.isRequired,
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: theme.colors.blue,
  },
})
