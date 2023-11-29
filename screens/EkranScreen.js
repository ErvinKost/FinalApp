import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, StyleSheet, Keyboard, Text, View } from 'react-native';
import Task from '../components/Task';
import { Platform } from 'react-native';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../firebase';

export default function EkranScreen() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);

  const saveTasksToStorage = async (tasks) => {
    try {
      await AsyncStorage.setItem(`tasks_${auth.currentUser.uid}`, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to AsyncStorage:', error);
    }
  };

  const loadTasksFromStorage = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem(`tasks_${auth.currentUser.uid}`);
      if (savedTasks !== null) {
        setTaskItems(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error('Error loading tasks from AsyncStorage:', error);
    }
  };

  const handleAddTask = () => {
    Keyboard.dismiss();
    const newTaskItems = [...taskItems, { text: task }];
    setTaskItems(newTaskItems);
    setTask('');

    saveTasksToStorage(newTaskItems);
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);

    saveTasksToStorage(itemsCopy);
  };

  useEffect(() => {
    loadTasksFromStorage();
  }, []);

  return (
    <View style={styles.container}>
      {/* Today's Tasks */}
      <View style={styles.taskwrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <View style={styles.items}>
          {/* This is where the tasks will go */}
          {taskItems.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => completeTask(index)}>
              <Task text={item.text} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Write a task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={'Write a task'}
          value={task}
          onChangeText={(text) => setTask(text)}
          onSubmitEditing={handleAddTask}
        />

        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  taskwrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#0782F9',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});
