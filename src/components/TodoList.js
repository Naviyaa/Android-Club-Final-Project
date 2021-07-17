/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import colors from '../Colors';
import TodoModal from './TodoModal';

export default class TodoList extends React.Component {
  state= {
      showListVisible:  false,
  };

  toggleListModal() {
      this.setState({showListVisible: !this.state.showListVisible});
  }

  render() {
      const list = this.props.list;
      const compCount = list.todos.filter(todo => todo.completed).length;
      const remCount = list.todos.length - compCount;
      return (
          <View>
            <Modal
                animationType="slide" visible={this.state.showListVisible}
                onRequestClose={() => this.toggleListModal()}
            >
                <TodoModal
                    list={list}
                    closeModal={() => this.toggleListModal()}
                    updateList={this.props.updateList}
                />
            </Modal>
            <TouchableOpacity
                style={[styles.listContainer, {backgroundColor: list.color}]}
                onPress={() => this.toggleListModal()}
            >
                <Text style={styles.listTitle} numberOfLines={1}>
                    {list.name}
                </Text>
                <View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.count}>{remCount}</Text>
                        <Text style={styles.sub}>Remaining</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.count}>{compCount}</Text>
                        <Text style={styles.sub}>Completed</Text>
                    </View>
                </View>
            </TouchableOpacity>
          </View>
      );
  }
}

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 32,
        paddingLeft: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: 'center',
        width: 250,
    },
    listTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.white,
        marginBottom: 18,
    },
    count: {
        fontSize: 44,
        fontWeight: '200',
        color: colors.white,
    },
    sub: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.white,
    },
});