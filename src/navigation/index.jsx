import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CoinDeatiledScreen from '../screens/CoinDetailedScreen';


const stack = createNativeStackNavigator();

const Navigation = () => {
        return(
        
            <stack.Navigator 
                initialRouteName='Home'
                screenOptions={{headerShown: false}}
            >
                <stack.Screen name={"Home"} component={HomeScreen} />
                <stack.Screen name={"CoinDetailedScreen"} component={CoinDeatiledScreen} />
            </stack.Navigator>
         
        )
}

export default Navigation;