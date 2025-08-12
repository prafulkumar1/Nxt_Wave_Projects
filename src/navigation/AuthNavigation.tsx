import React, { Component } from 'react'
// import ForgotPassword from '../screens/ForgotPassword';
// import OtpVerification from '../screens/OtpVerification';
// import SignInAndSignUp from '../screens/SignInAndSignUp';
// import TermsAndConditions from '../screens/TermsAndConditions';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
const AuthStack = createNativeStackNavigator();

export class AuthNavigation extends Component {
    render() {
        return (
            <AuthStack.Navigator screenOptions={{ headerShown: false }}>
                <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
                {/* <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
                <AuthStack.Screen name="OTPVerification" component={OtpVerification} />
                <AuthStack.Screen name="TnC" component={TermsAndConditions} options={{ headerShown: false }} /> */}
            </AuthStack.Navigator>
        )
    }
}

export default AuthNavigation