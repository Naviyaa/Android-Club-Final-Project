/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    KeyboardAvoidingView,
    TextInput,
    Keyboard,
    Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import colors from '../Colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default class TodoModal extends React.Component {
    state = {
        newTodo: '',
    };

    toggleTodoCompleted= index => {
        let list = this.props.list;
        list.todos[index].completed = !list.todos[index].completed;

        this.props.updateList(list);
    };

    addTodo = () => {
        let list = this.props.list;
        if (!list.todos.some (todo => todo.title === this.state.newTodo)) {
            list.todos.push({title: this.state.newTodo, completed: false});
            this.props.updateList(list);
        }

        this.setState({newTodo: ''});
        Keyboard.dismiss();
    };

    deleteTodo = index => {
        let list = this.props.list;
        list.todos.splice(index, 1);
        this.props.updateList(list);
    };

    renderTodo = (todo, index) => {
        return (
            <Swipeable renderRightActions={( , dragX) => this.rightActions(dragX, index)}>
            <View style={styles.todoContainer}>
                <TouchableOpacity onPress={() => this.toggleTodoCompleted(index)}>
                    <Icon
                        name={todo.completed ? 'square' : 'square-outline'}
                        size={26}
                        color={todo.completed ? colors.lightgrey : colors.grey}
                        style={{width: 32}}
                    />
                </TouchableOpacity>
                <Text style={[styles.todoTitle,
                    {
                        textDecorationLine: todo.completed ? 'line-through' : 'none',
                        color: todo.completed ? colors.lightgrey : colors.grey,
                    },
                ]}>{todo.title}</Text>
            </View>
            </Swipeable>
        );
    };

    rightActions = (dragX, index) => {
        return (
            <TouchableOpacity onPress={() => this.deleteTodo(index)}>
                <Animated.View style={styles.delButton}>
                    <Animated.Text style={{color: colors.white, fontWeight: 'bold'}}>Delete</Animated.Text>
                </Animated.View>
            </TouchableOpacity>
        );
    };

    render() {
        const list = this.props.list;
        const taskCount = list.todos.length;
        const compCount = list.todos.filter(todo => todo.completed).length;
        return (
            <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
                <SafeAreaView style={styles.container}>
                    <TouchableOpacity
                        style={{position: 'absolute', top: 64, right: 32, zIndex: 10}}
                        onPress={this.props.closeModal}
                    >
                        <Icon name="close-circle" size={26} color={colors.grey} />
                    </TouchableOpacity>

                    <View style={[styles.section, styles.header,{borderBottomColor: list.color}]}>
                        <View>
                            <Text style={styles.title}>{list.name}</Text>
                            <Text style={styles.taskCount}>{compCount} of {taskCount} tasks</Text>
                        </View>
                    </View>

                    <View style={[styles.section, {flex: 3}]}>
                        <FlatList
                            data={list.todos}
                            renderItem={({item, index}) => this.renderTodo(item, index)}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={{paddingHorizontal: 32, paddingVertical: 64}}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                    <View style={[styles.section, styles.footer]}>
                        <TextInput
                            style={[styles.input, {borderColor: list.color}]}
                            onChangeText={text => this.setState({newTodo: text})}
                            value={this.state.newTodo}
                        />
                        <TouchableOpacity style={[styles.addTask, {backgroundColor: list.color}]} onPress={() => this.addTodo()}>
                            <Icon name="add" size={18} color={colors.white} />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    section: {
        flex: 1,
        alignSelf: 'stretch',
    },
    header: {
        justifyContent: 'flex-end',
        marginLeft: 64,
        borderBottomWidth: 4,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.grey,
    },
    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        color: colors.grey,
        fontWeight: '400',
    },
    footer: {
        paddingHorizontal: 32,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
    },
    input: {
        flex: 1,
        height: 50,
        borderWidth: 1.5,
        borderRadius: 6,
        marginRight: 8,
        paddingHorizontal: 8,
    },
    addTask: {
        borderRadius: 4,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    todoContainer: {
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    todoTitle: {
        fontWeight: '700',
        fontSize: 16,
        color: '#000',
    },
    delButton: {
        backgroundColor: colors.red,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
    },
});