/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase';

import colors from './src/Colors';
import tempData from './src/tempData';
import TodoList from './src/components/TodoList';
import AddListModel from './src/components/AddListModel';
import Fire from './src/Fire';

class App extends React.Component {
  state = {
    addTodoVisible: false,
    lists: tempData,
    user: {},
    loading: true,
  };

  componentDidMount() {
    firebase = new Fire((error, user) => {
      if (error) {
        return alert('Uh oh, something went wrong');
      }
      firebase.getLists(lists => {
        this.setState({lists, user}, () => {
          this.setState({loading: false});
        });
      });
      this.setState({user});
    });
  }

  componentWillUnmount() {
    firebase.detach();
  }

  toggleAddTodoModal() {
    this.setState({addTodoVisible: !this.state.addTodoVisible});
  }

  renderList = list => {
    return <TodoList list={list} updateList={this.updateList} />;
  };

  addList = list => {
    firebase.addList({
      name: list.name,
      color: list.color,
      todos: [],
    });
  };

  updateList = list => {
    firebase.updateList(list);
  };

  render() {
    if (this.state.user.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={colors.lavender} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={this.state.addTodoVisible}
          onRequestClose={() => this.toggleAddTodoModal()}>
          <AddListModel
            closeModal={() => this.toggleAddTodoModal()}
            addList={this.addList}
          />
        </Modal>
        {/* <View>
          <Text>User: {this.state.user.uid}</Text>
        </View> */}
        <View style={{flexDirection: 'row'}}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            Todo <Text style={styles.subtitle}>Lists</Text>
          </Text>
          <View style={styles.divider} />
        </View>

        <View style={{marginVertical: 40}}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => this.toggleAddTodoModal()}>
            <Icon name="add" size={26} color={colors.pink} />
          </TouchableOpacity>
          <Text style={styles.addText}>Add List</Text>
        </View>

        <View style={{height: 275, paddingLeft: 30}}>
          <FlatList
            data={this.state.lists}
            keyExtractor={item => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => this.renderList(item)}
            keyboardShouldPersistTaps="always"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: colors.pink,
    height: 2,
    flex: 1,
    alignSelf: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.grey,
    paddingHorizontal: 60,
  },
  subtitle: {
    fontSize: 30,
    fontWeight: '600',
    color: colors.lavender,
  },
  addButton: {
    borderWidth: 3,
    borderColor: colors.pink,
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    color: colors.pink,
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 16,
  },
});

export default App;
