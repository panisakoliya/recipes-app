import React from 'react';
import {StatusBar} from 'react-native';
import styled from 'styled-components';

export default function HomeScreen() {
    return (
        <IntroText>Home Screen</IntroText>
    );
};


const IntroText = styled.Text`
font-size:25px;
margin-top:20px;
color:#000000;
font-weight:bold;
font-family:cursive;
`;