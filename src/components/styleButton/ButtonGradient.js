import React from "react";
import {Text, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from "twrnc";
export default function  ButtonGradient ({text, onPress}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <LinearGradient
                // Button Linear Gradient
                colors={['#D2B4DE', '#8E44AD']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}    
                style={tw`text-center h-45px flex justify-center items-center py-2 px-4 rounded-[14px] mt-5 w-80`}
            >
                <Text style={tw`text-white font-bold`}>{text}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}