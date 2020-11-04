import React, {useState, useContext} from 'react'
import {StyleSheet, Switch, View, Text, Button} from 'react-native'

import {AppCard} from '../components/ui/AppCard'
import {theme} from '../theme'
import {EditTodoModal} from '../components/EditTodoModal'
import {TodoContext} from '../context/todo/todoContext'
import {ScreenContext} from '../context/screen/screenContext'

export const TodoScreen = () => {
  const {
    todos,
    updateTodo,
    removeTodo,
    completeTodo,
  } = useContext(TodoContext)

  const {todoId, changeScreen} = useContext(ScreenContext)

  const [modalEditTodoVisible, setModalEditTodoVisible] = useState(false)

  const todo = todos.find((todo) => todo.id === todoId)

  const saveHandler = async (title) => {
    await updateTodo(todo.id, title)
    setModalEditTodoVisible(false)
  }

  return (
    <View>
      <EditTodoModal
        visible={modalEditTodoVisible}
        onCancel={() => setModalEditTodoVisible(false)}
        value={todo.title}
        onSave={saveHandler}
      />

      <AppCard>
        <Text style={styles.todoTitle}>{todo.title}</Text>

        <View style={styles.completedWrapper}>
          <Switch
            trackColor={{false: '#767577', true: theme.colors.green}}
            thumbColor="#f4f3f4"
            ios_backgroundColor="#3e3e3e"
            value={todo.completed}
            onValueChange={(newValue) => completeTodo(todo.id, newValue)}
          />

          <Text
            style={styles.completedTitle}
            onPress={() => completeTodo(todo.id, !todo.completed)}>
            Completed
          </Text>
        </View>
      </AppCard>

      <View style={styles.buttons}>
        <View>
          <Button
            title="Back"
            onPress={() => changeScreen(null)}
          />
        </View>

        <View>
          <Button
            title="Edit"
            onPress={() => setModalEditTodoVisible(true)}
          />
        </View>

        <View>
          <Button
            title="Remove"
            color={theme.colors.red}
            onPress={() => removeTodo(todo.id)}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  todoTitle: {
    fontSize: 34,
    marginBottom: 20,
  },
  completedWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedTitle: {
    marginLeft: 15,
    fontSize: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})
