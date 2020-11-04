import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types'

import {theme} from '../theme'

export const Todo = ({todo, onComplete, onOpen}) => {
  return (
    <TouchableOpacity
      activeOpacity={.5}
      onPress={() => onOpen(todo.id)}
      onLongPress={() => onComplete(todo.id, !todo.completed)}
    >
      <View
        style={[styles.todo, {
          borderColor: todo.completed ? theme.colors.green : theme.colors.blue,
        }]}>
        <Text
          style={[styles.todoTitle, {
            textDecorationLine: todo.completed ? 'line-through' : 'none',
            color: todo.completed ? theme.colors.grey : theme.colors.black,
          }]}>
          {todo.title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

Todo.propTypes = {
  todo: PropTypes.object,
  onComplete: PropTypes.func,
  onOpen: PropTypes.func,
}

const styles = StyleSheet.create({
  todo: {
    flexDirection: 'row',
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  todoTitle: {
    textDecorationStyle: 'solid',
    fontSize: 18,
  },
})
