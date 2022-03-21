import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StatusBar, ToastAndroid, ActivityIndicator} from 'react-native';
import styled from 'styled-components';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import AudioScreen from '../screens/AudioScreen';

export default function MainStackScreen() {
    const [name, setName] = useState('');

    const userDetails = async () => {
        try {
            const fetchUserData = JSON.parse(await AsyncStorage.getItem('userDetails'));
            setName(fetchUserData.name);
        } catch (e) {
            console.log('Fetch user error : ' + e);
        }
    };

    useEffect(() => {
        userDetails();
    }, []);

    const Tab = createBottomTabNavigator();

    const tabBarOptions = {
        showLabel: false,
        style: {
            backgroundColor: '#fff',
            paddingBottom: 8,
            borderTopRightRadius: 5,
        },
    };

    const screenOptions = ({route}) => ({
        tabBarIcon: ({focused}) => {
            let iconName = 'home-outline';
            switch (route.name) {
                case 'Home':
                    iconName = focused ? 'home' : 'home-outline';
                    break;

                case 'Audio':
                    iconName = focused ? 'headset' : 'headset-outline';
                    break;

                default:
                    iconName = focused ? 'home' : 'home-outline';
            }
            return <Ionicons name={iconName} size={20} color={'#98FB98'}/>;
        },
    });

    return (
        <Container>
            <StatusBar hidden={true}/>
            <Header>
                <HeaderText>{name}</HeaderText>
            </Header>
            <Content>
                <Tab.Navigator headerMode="none" tabBarOptions={tabBarOptions} screenOptions={screenOptions}>
                    <Tab.Screen name="Home" component={HomeScreen}/>
                    <Tab.Screen name="Audio" component={AudioScreen}/>
                </Tab.Navigator>
            </Content>
        </Container>
    );
}

const Container = styled.View`
flex:1;
backgroundColor: #98FB98;
`;

const Header = styled.View`
flex:0.4;
padding:4%;
`;

const HeaderText = styled.Text`
font-size:20px;
color:#000;
`;

const Content = styled.View`
flex:5.6;
`;
