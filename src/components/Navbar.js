import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import PropTypes from 'prop-types'

import {theme} from '../theme'

export const Navbar = ({title}) => {
  return (
    <View style={styles.navbar}>
      <Text style={styles.text}>{title}</Text>
    </View>
  )
}

Navbar.propTypes = {
  title: PropTypes.string,
}

const styles = StyleSheet.create({
  navbar: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: theme.colors.blue,
    paddingBottom: 20,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
})
