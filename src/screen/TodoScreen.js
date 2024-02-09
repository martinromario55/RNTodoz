import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  Keyboard,
} from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons'

const TodoScreen = () => {
  const dummyData = [
    {
      id: 1,
      title: 'Task 1',
    },
    {
      id: 2,
      title: 'Task 2',
    },
    {
      id: 3,
      title: 'Task 3',
    },
  ]
  //   State
  const [todo, setTodo] = useState('')
  const [todolist, setTodolist] = useState([])
  const [editTodo, setEditTodo] = useState(null)

  const addTodo = () => {
    setTodolist([
      ...todolist,
      { id: Date.now().toString(), title: todo, completed: false },
    ])
    setTodo('')
    Keyboard.dismiss()
  }

  const handleDelete = id => {
    setTodolist(todolist.filter(todo => todo.id !== id))
  }

  const handleEdit = todo => {
    setEditTodo(todo)
    setTodo(todo.title)
  }

  const handleUpdate = () => {
    const updatedTodos = todolist.map(item => {
      if (item.id === editTodo.id) {
        return {
          ...item,
          title: todo,
        }
      }
      return item
    })
    setTodolist(updatedTodos)
    setEditTodo(null)
    setTodo('')
    Keyboard.dismiss()
  }

  const handleCompleted = id => {
    const updatedTodos = todolist.map(item => {
      if (item.id === id) {
        return {
          ...item,
          completed: !item.completed,
        }
      }
      return item
    })
    setTodolist(updatedTodos)
  }

  const renderTodo = ({ item }) => {
    return (
      <View style={todoList}>
        <View style={todoText}>
          {item.completed ? (
            <Feather
              name="check-circle"
              size={24}
              color="green"
              onPress={() => handleCompleted(item.id)}
            />
          ) : (
            <Feather
              name="circle"
              size={24}
              color="black"
              onPress={() => handleCompleted(item.id)}
            />
          )}
          <Text
            style={{
              fontSize: 20,
              paddingLeft: 10,
              color: item.completed ? 'grey' : 'black',
              textDecorationLine: item.completed ? 'line-through' : 'none',
            }}
          >
            {item.title}
          </Text>
        </View>
        <View style={todoIcons}>
          <Feather
            name="edit"
            size={24}
            color={item.completed ? 'grey' : 'blue'}
            onPress={() => handleEdit(item)}
            disabled={item.completed}
          />
          <Feather
            name="trash-2"
            size={24}
            color={item.completed ? 'grey' : 'red'}
            style={{ marginLeft: 20 }}
            onPress={() => handleDelete(item.id)}
            disabled={item.completed}
          />
        </View>
      </View>
    )
  }

  const {
    container,
    input,
    btn,
    btnContainer,
    todoListContainer,
    todoList,
    todoIcons,
    todoText,
  } = styles
  return (
    <View style={container}>
      <View style={input}>
        <TextInput
          placeholder="Enter a task"
          value={todo}
          onChangeText={text => setTodo(text)}
        />
      </View>
      <View style={btnContainer}>
        {editTodo ? (
          <Button
            title="Save Changes"
            styles={btn}
            onPress={() => handleUpdate()}
            disabled={todo === ''}
          />
        ) : (
          <Button
            title="Add todo"
            styles={btn}
            onPress={addTodo}
            disabled={todo === ''}
          />
        )}
      </View>

      <View style={todoListContainer}>
        {todolist.length > 0 ? (
          <FlatList data={todolist} renderItem={renderTodo} />
        ) : (
          <Text style={{ fontSize: 20 }}>No task added yet.</Text>
        )}
      </View>
    </View>
  )
}

export default TodoScreen

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: '#1e90ff',
    borderRadius: 4,
    padding: 10,
  },
  btnContainer: {
    marginTop: 10,
  },
  btn: {
    marginTop: 20,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
  },
  todoListContainer: {
    marginTop: 20,
  },
  todoList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  todoIcons: {
    flexDirection: 'row',
  },
  todoText: {
    flexDirection: 'row',
  },
})
