import React, {useContext} from 'react'
import {View, StyleSheet} from 'react-native'

import {Navbar} from './components/Navbar'
import {MainScreen} from './screens/MainScreen'
import {TodoScreen} from './screens/TodoScreen'
import {ScreenContext} from './context/screen/screenContext'

export const MainLayout = () => {
  const {todoId} = useContext(ScreenContext)

  return (
    <View style={styles.appWrapper}>
      <View style={styles.navbarWrapper}>
        <Navbar title="ToDo App" />
      </View>

      <View style={styles.container}>
        {todoId ? <TodoScreen /> : <MainScreen />}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingTop: 30,
    paddingRight: 15,
  },
  appWrapper: {
    flex: 1,
  },
})
