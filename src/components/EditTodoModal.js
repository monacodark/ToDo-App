import React, {useState} from 'react'
import {View, Button, TextInput, Modal, StyleSheet, Alert} from 'react-native'
import PropTypes from 'prop-types'

import {theme} from '../theme'

export const EditTodoModal = ({visible, onCancel, value, onSave}) => {
  const [inputTitleValue, setInputTitleValue] = useState(value)

  const saveHandler = () => {
    if (!inputTitleValue.trim().length) {
      Alert.alert('Error!', 'Title is required!')
      return
    }

    onSave(inputTitleValue)
  }

  const cancelHandler = () => {
    setInputTitleValue(value)
    onCancel()
  }

  return (
    <Modal
      visible={visible}
      animationType="fade">
      <View style={styles.editTodoWrapper}>
        <TextInput
          value={inputTitleValue}
          onChangeText={setInputTitleValue}
          style={styles.inputTitle}
          placeholder="Title"
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={64}
        />

        <View style={styles.editTodoButtonsWrapper}>
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

EditTodoModal.propTypes = {
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  visible: PropTypes.bool,
  value: PropTypes.string,
}

const styles = StyleSheet.create({
  editTodoWrapper: {
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
  editTodoButtonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
})
