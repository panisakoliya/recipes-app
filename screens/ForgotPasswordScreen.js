import React from 'react';
import {StatusBar} from 'react-native';
import styled from 'styled-components';

export default function ForgotPasswordScreen() {
    return (
        <Container>
            <StatusBar hidden={true}/>
            <IntroImage source={require('../assets/image/logo.png')}/>
            <IntroText>Pregnancy</IntroText>
            <IntroSmallText>A total care of your baby</IntroSmallText>
        </Container>
    );
};

const Container = styled.View`
flex:1;
align-items:center;
text-align:center;
justify-content:center;
backgroundColor: #ff9933;
`;

const IntroImage = styled.Image`
width:300px;
height:300px;
`;

const IntroText = styled.Text`
font-size:25px;
margin-top:20px;
color:#000000;
font-weight:bold;
font-family:cursive;
`;

const IntroSmallText = styled.Text`
margin-top:5px;
color:#000000;
font-family:cursive;
`;
