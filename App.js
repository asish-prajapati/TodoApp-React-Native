import React, { useState } from "react";
import {
  StyleSheet,
  Alert,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Header from "./components/Header";
import TodoItem from "./components/TodoItem";
import AddTodo from "./components/AddTodo";

export default function App() {
  const [todo, setTodo] = useState([
    { text: "Buy Coffee", key: "1" },
    { text: "create an app", key: "2" },
    { text: "Go to gym", key: "3" },
    { text: "Buy milk", key: "4" },
    { text: "Eat bread", key: "5" },
    { text: "Practice Dance", key: "6" },
    { text: "Play tennis", key: "7" },
  ]);

  const pressHandler = (key) => {
    setTodo((prevTodo) => {
      return prevTodo.filter((todo) => todo.key != key);
    });
  };

  const submitHandler = (text) => {
    if (text.length > 3) {
      setTodo((prevTodo) => {
        return [{ text: text, key: Math.random().toString() }, ...prevTodo];
      });

      Keyboard.dismiss();
    } else {
      Alert.alert("oops.. !", "todo must be over three chars long", [
        { text: "Understood ", onPress: () => console.log("alert closed") },
      ]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          {/*to form*/}
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={todo}
              renderItem={({ item }) => (
                <TodoItem item={item} pressHandler={pressHandler} />
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 40,
    flex: 1,
  },
  list: {
    marginTop: 20,
    flex: 1,
  },
});
