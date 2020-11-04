import React, {useState} from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  Keyboard,
  Modal,
} from 'react-native'
import PropTypes from 'prop-types'

import {theme} from '../theme'

export const AddTodoModal = ({onSave, onClose, visible}) => {
  const [inputTitleValue, setInputTitleValue] = useState('')

  const saveHandler = () => {
    if (!inputTitleValue.trim().length) {
      Alert.alert('Error!', 'Title is required!')
      return
    }

    onSave(inputTitleValue)
    onClose()
    setInputTitleValue('')
    Keyboard.dismiss()
  }

  const cancelHandler = () => {
    setInputTitleValue('')
    onClose()
  }

  return (
    <Modal
      visible={visible}
      animationType="fade">
      <View style={styles.addTodoWrapper}>
        <TextInput
          style={styles.inputTitle}
          onChangeText={setInputTitleValue}
          value={inputTitleValue}
          placeholder="Todo Title"
          autoCorrect={false}
          autoCapitalize="none"
        />

        <View style={styles.addTodoButtonsWrapper}>
          <View>
            <Button
              title="Cancel"
              onPress={cancelHandler}
              color={theme.colors.red} />
          </View>

          <View>
            <Button title="Save" onPress={saveHandler} />
          </View>
        </View>
      </View>
    </Modal>
  )
}

AddTodoModal.propTypes = {
  onSave: PropTypes.func,
  onClose: PropTypes.func,
  visible: PropTypes.bool,
}

const styles = StyleSheet.create({
  addTodoWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputTitle: {
    padding: 10,
    borderColor: theme.colors.blue,
    borderWidth: 2,
    borderRadius: 6,
    width: '80%',
    marginBottom: 20,
  },
  addTodoButtonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
})
