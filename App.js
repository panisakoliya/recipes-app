import React, {useEffect, useMemo} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import axios from 'axios';

import SplashScreen from './screens/SplashScreen';
import MainStackScreen from './stacks/MainStackScreen';
import AuthStackScreen from './stacks/AuthStackScreen';

import {AuthContext} from './components/Context';
import {APIURL} from './components/Global';

export const userData = {
    name: null,
};

export default function App() {
    const initialLoginState = {
        isLoading: true,
        userDetails: null,
    };


    const loginReducer = (prevState, action) => {
        switch (action.type) {
            case 'retrieve_token':
                return {
                    ...prevState,
                    isLoading: false,
                    userDetails: action.userDetails,
                };
            case 'signIn':
                return {
                    ...prevState,
                    isLoading: false,
                    userDetails: action.userDetails,
                };
            case 'signOut':
                return {
                    ...prevState,
                    isLoading: false,
                    userDetails: null,
                };
            case 'signUp':
                return {
                    ...prevState,
                    isLoading: false,
                    userDetails: action.userDetails,
                };
        }
    };

    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

    const authContext = useMemo(() => ({
        signIn: async (data) => {
            const userDetails = data;
            try {
                await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));
            } catch (e) {
                console.log('Sign in error : ' + e);
            }
            dispatch({type: 'signIn', userDetails: userDetails});
        },
        signOut: async () => {
            try {
                await AsyncStorage.removeItem('userDetails');
            } catch (e) {
                console.log('Sign out error : ' + e);
            }
            dispatch({type: 'signOut'});
        },
        signUp: async (data) => {
            const userDetails = data;
            try {
                await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));
            } catch (e) {
                console.log('Sign up error : ' + e);
            }
            dispatch({type: 'signUp', userDetails: userDetails});
        },
    }), []);

    useEffect(() => {
        setTimeout(async () => {
            let userDetails;
            userDetails = null;
            try {
                userDetails = JSON.parse(await AsyncStorage.getItem('userDetails'));
            } catch (e) {
                console.log(e);
            }

            if (userDetails) {
                axios.post(APIURL.url + 'check-email-exist', {
                    email: userDetails.email,
                }).then(function (success) {
                    const response = success.data;
                    if (response.status === false) {
                        dispatch({type: 'signOut'});
                        console.log('Check Email Exist error : ' + response.message);
                    } else {
                        console.log('Logged in user email : ' + response.data.email);
                    }
                }).catch(function (error) {
                    console.log('Check Email Exist error : ' + error);
                });
            }
            dispatch({type: 'retrieve_token', userDetails: userDetails});
        }, 1000);
    }, []);

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {loginState.isLoading ? (
                    <SplashScreen/>
                ) : loginState.userDetails ? (
                    <MainStackScreen/>
                ) : (
                    <AuthStackScreen/>
                )}
            </NavigationContainer>
        </AuthContext.Provider>
    );
};