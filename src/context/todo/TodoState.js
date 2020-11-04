import React, {useReducer, useContext} from 'react'
import PropTypes from 'prop-types'
import {Alert} from 'react-native'

import {TodoContext} from './todoContext'
import {todoReducer} from './todoReducer'
import {
  ADD_TODO,
  CLEAR_ERROR,
  FETCH_TODOS,
  HIDE_LOADER,
  REMOVE_TODO,
  SHOW_ERROR,
  SHOW_LOADER,
  UPDATE_TODO,
  COMPLETE_TODO,
} from '../types'
import {ScreenContext} from '../screen/screenContext'
import {FirebaseClient} from '../../FirebaseClient'

export const TodoState = ({children}) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null,
  }

  const {changeScreen} = useContext(ScreenContext)
  const [state, dispatch] = useReducer(todoReducer, initialState)

  const fetchTodos = async () => {
    clearError()
    showLoader()

    const {success, error, data} = await FirebaseClient.req('get', 'todos.json')

    if (!success) {
      showError(error)
      hideLoader()
      return
    }

    const todos = data ?
      Object.keys(data).map((key) => ({...data[key], id: key})) :
      []

    dispatch({type: FETCH_TODOS, todos})
    hideLoader()
  }

  const addTodo = async (title) => {
    const {success, error, data} = await FirebaseClient.req(
        'post',
        'todos.json',
        {title}
    )

    if (!success) {
      showError(error)
      return
    }

    dispatch({type: ADD_TODO, title, id: data.name})
  }

  const removeTodo = (todoId) => {
    const todo = state.todos.find((todo) => todo.id === todoId)

    Alert.alert(
        'Remove Todo',
        `Are you sure you want to delete the todo: ${todo.title}`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => {
              changeScreen(null)

              const {
                success,
                error,
              } = await FirebaseClient.req('delete', `todos/${todoId}.json`)

              if (!success) {
                showError(error)
                return
              }

              dispatch({type: REMOVE_TODO, todoId})
            },
          },
        ]
    )
  }

  const updateTodo = async (id, title) => {
    clearError()

    const {
      success,
      error,
    } = await FirebaseClient.req(
        'patch',
        `todos/${id}.json`,
        {title}
    )

    if (!success) {
      showError(error)
      return
    }

    dispatch({type: UPDATE_TODO, id, title})
  }

  const completeTodo = async (id, completed) => {
    clearError()

    const {
      success,
      error,
    } = await FirebaseClient.req(
        'patch',
        `todos/${id}.json`,
        {completed}
    )

    if (!success) {
      showError(error)
      return
    }

    dispatch({type: COMPLETE_TODO, id, completed})
  }

  const showLoader = () => dispatch({type: SHOW_LOADER})
  const hideLoader = () => dispatch({type: HIDE_LOADER})
  const showError = (error) => dispatch({type: SHOW_ERROR, error})
  const clearError = () => dispatch({type: CLEAR_ERROR})

  return <TodoContext.Provider
    value={{
      todos: state.todos,
      loading: state.loading,
      error: state.error,
      addTodo,
      removeTodo,
      updateTodo,
      fetchTodos,
      completeTodo,
    }}>
    {children}
  </TodoContext.Provider>
}

TodoState.propTypes = {
  children: PropTypes.node.isRequired,
}
