/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable eol-last */
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../Colors';
import tempData from '../tempData';

export default class AddListModel extends React.Component {
    backgroundColors = ['#5A0101', '#2D015A', '#722626', '#5A012D', '#5A5A01', '#01015A', '#267226', '#264C72', '#015A5A'];
    state = {
        name: '',
        color: this.backgroundColors[0],
    };

    createTodo = () => {
        const {name, color} = this.state;
        const list = {name, color};

        this.props.addList(list);
        this.setState({name:''});
        this.props.closeModal();
    }

    renderColors() {
        return this.backgroundColors.map(color => {
            return (
                <TouchableOpacity
                    Key={color}
                    style={[styles.colorSelect, {backgroundColor: color}]}
                    onPress={() => this.setState({ color })}
                />
            );
        });
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <TouchableOpacity style={{position: 'absolute', top: 64, right: 32}} onPress={this.props.closeModal}>
                    <Icon name="close-circle" size={26} color={colors.grey} />
                </TouchableOpacity>

                <View style={{alignSelf: 'stretch', marginHorizontal: 32}}>
                    <Text style={styles.title}>Create To-Do List</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter List Name"
                        onChangeText={text => this.setState({name: text})}
                    />

                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 14}}>
                        {this.renderColors()}
                    </View>

                    <TouchableOpacity
                        style={[styles.createButton, {backgroundColor: this.state.color}]}
                        onPress={this.createTodo}
                    >
                        <Text style={{color: colors.white, fontWeight: 'bold', fontSize: 16}}>Create!</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.grey,
        alignSelf: 'center',
        marginBottom: 16,
    },
    input: {
        borderWidth: 1.5,
        borderColor: colors.lavender,
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18,
    },
    createButton: {
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    colorSelect: {
        width: 30,
        height: 30,
        borderRadius: 4,
    },
});