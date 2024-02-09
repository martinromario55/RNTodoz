import { StatusBar } from 'expo-status-bar'
import {
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native'
import TodoScreen from './src/screen/TodoScreen'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <TodoScreen />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
})
