import React, {useState} from 'react';
import {StatusBar, ToastAndroid, ActivityIndicator} from 'react-native';
import styled from 'styled-components';

import {APIURL} from '../components/Global';

import {AuthContext} from './../components/Context';


export default function SignUpScreen({navigation}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [signUpLoader, setSignUpLoader] = useState(false);

    const { signUp } = React.useContext(AuthContext);

    function submitForm() {
        setNameError();
        setEmailError();
        setPasswordError();

        if (name === undefined || name.length === 0 || name === '') {
            setNameError("Please enter name!");
            return;
        }

        if (name.length > 15) {
            setNameError("Name not be greater than 15 characters!");
            return;
        }

        if (email === undefined || email.length === 0 || email === '') {
            setEmailError("Please enter email!");
            return;
        }

        if (email.length > 50) {
            setEmailError("Email not be greater than 50 characters!");
            return;
        }

        if (validateEmail(email) === false) {
            setEmailError("Please enter valid email!");
            return;
        }

        if (password === undefined || password.length === 0 || password === '') {
            setPasswordError("Please enter password!");
            return;
        }

        if (password.length < 6) {
            setPasswordError("Password must be 6 characters!");
            return;
        }

        if (password.length > 10) {
            setPasswordError("Password not be greater than 10 characters");
            return;
        }

        setSignUpLoader(true);

        fetch(APIURL.url + 'register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        }).then((response) => response.json())
            .then((data) => {
                if (data.status === false) {
                    setNameError(data.errors.name);
                    setEmailError(data.errors.email);
                    setPasswordError(data.errors.password);
                } else {
                    signUp(data.data.api_token , data.data.email);
                    ToastAndroid.show(data.message, ToastAndroid.SHORT);
                }
                setSignUpLoader(false);
            }).catch((error) => {
            console.error("Register error : " + error);
            ToastAndroid.show("Something went wrong!", ToastAndroid.SHORT);
            setSignUpLoader(false);
        });
    }

    const validateEmail = (email) => {
        return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) === null ? false : true;
    };

    return (
        <Container>
            <StatusBar hidden={true}/>
            <Header>
                <HeaderText>Sign Up</HeaderText>
            </Header>
            <FormContent>
                <FormGroup>
                    <Label>Name</Label>
                    <Input onChangeText={text => setName(text)}/>
                    {nameError !== '' ? <ErrorText>{nameError}</ErrorText> : null}
                </FormGroup>

                <FormGroup>
                    <Label>Email</Label>
                    <Input onChangeText={text => setEmail(text)}/>
                    {emailError !== '' ? <ErrorText>{emailError}</ErrorText> : null}
                </FormGroup>

                <FormGroup>
                    <Label>Password</Label>
                    <Input onChangeText={text => setPassword(text)} secureTextEntry={true}/>
                    {passwordError !== '' ? <ErrorText>{passwordError}</ErrorText> : null}
                </FormGroup>

                <SubmitBtn onPress={() => submitForm()} disable={signUpLoader}>
                    {signUpLoader ? (
                            <ActivityIndicator size="small" color="#98FB98"/>)
                        : (<SignUpButtonText center>Sign Up</SignUpButtonText>)}
                </SubmitBtn>

                <SignInLink>Have an already account?{' '}<SignInLink
                    onPress={() => navigation.navigate('SignIn')}>Sign In
                </SignInLink>
                </SignInLink>

            </FormContent>
        </Container>
    );
};

const Container = styled.View`
flex:1;
backgroundColor: #98FB98;;
padding:4%;
`;

const Header = styled.View`
flex:1;
`;

const HeaderText = styled.Text`
font-size:20px;
color:#000;
`;

const FormContent = styled.View`
flex:5;
`;

const FormGroup = styled.View`
margin-bottom:25px;
`;

const Label = styled.Text`
margin-bottom:5px;
color:#000;
`;

const Input = styled.TextInput`
height:35px;
border-bottom-width:1px;
border-color:#FFF;
`;

const ErrorText = styled.Text`
color:#FF0000;
margin-top:2px;
`;

const SubmitBtn = styled.TouchableOpacity`
border:0px solid;
justify-content:center;
backgroundColor: #fff;
padding:10px;
border-radius:5px;
width:100%;
margin-top:20px;
margin-bottom:20px;
text-align:center;
elevation : 10;
`;

const SignUpButtonText = styled.Text`
color:#000;
text-align:center;
justify-content:center;
`;

const SignInLink = styled.Text`
color:#000;
`;
