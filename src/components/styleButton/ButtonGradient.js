import React from "react";
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function  ButtonGradient ({text, onPress}) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <LinearGradient
                // Button Linear Gradient
                colors={['#D2B4DE', '#8E44AD']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}    
                style={styles.button}
            >
                <Text style={styles.text}>{text}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: 200,
        marginTop: 60,
    },

    text: {
      fontSize: 14,
      color: '#fff',
      fontWeight: 'bold',
    },
    button: {
        width: '80%',
        height: 50,
        borderRadius: 25,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
  });