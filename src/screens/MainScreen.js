import React, {useContext, useEffect, useCallback, useState} from 'react'
import {StyleSheet, View, FlatList, Text, Button} from 'react-native'
import {AntDesign} from '@expo/vector-icons'

import {AddTodoModal} from '../components/AddTodoModal'
import {Todo} from '../components/Todo'
import {AppLoader} from '../components/ui/AppLoader'
import {ScreenContext} from '../context/screen/screenContext'
import {TodoContext} from '../context/todo/todoContext'

import {theme} from '../theme'

export const MainScreen = () => {
  const {
    addTodo,
    todos,
    completeTodo,
    fetchTodos,
    loading,
    error,
  } = useContext(TodoContext)

  const {changeScreen} = useContext(ScreenContext)

  const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos])

  const [modalAddTodoVisible, setModalAddTodoVisible] = useState(false)

  useEffect(() => {
    loadTodos()
  }, [])

  if (loading) return <AppLoader />

  if (error) return (
    <View style={styles.error}>
      <Text style={styles.errorTitle}>ERROR!</Text>
      <Text style={styles.errorDescription}>{error}</Text>
      <Button onPress={loadTodos} title="Try Again" />
    </View>
  )

  return (
    <View style={styles.aaa}>
      <View style={styles.addTodoButtonWrapper}>
        <AntDesign.Button
          style={styles.addTodoButton}
          onPress={() => setModalAddTodoVisible(true)}
          name="pluscircleo">
          Add ToDo
        </AntDesign.Button>
      </View>

      <AddTodoModal
        visible={modalAddTodoVisible}
        onClose={() => setModalAddTodoVisible(false)}
        onSave={addTodo}
      />

      {
        todos.length ? (
          <FlatList
            keyExtractor={(item) => item.id}
            data={todos}
            renderItem={({item}) => (

              <Todo
                todo={item}
                onComplete={completeTodo}
                onOpen={changeScreen}
              />

            )}
          />
        ) : (
          <Text style={styles.noTodos}>No Todos</Text>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  addTodoButton: {
    backgroundColor: theme.colors.blue,
  },
  addTodoButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  error: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: theme.colors.red,
    borderRadius: 6,
    padding: 30,
  },
  errorTitle: {
    fontSize: 30,
    color: theme.colors.red,
    marginBottom: 15,
  },
  errorDescription: {
    marginBottom: 15,
  },
  noTodos: {
    textAlign: 'center',
    fontSize: 20,
    color: theme.colors.grey,
  },
  aaa: {
    height: '100%',
  },
})
