import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import { socialData } from "../constants/CustomData";
import { GoogleSignin,isErrorWithCode,isSuccessResponse,statusCodes } from "@react-native-google-signin/google-signin";
import { authorize } from 'react-native-app-auth';
import { jwtDecode } from "jwt-decode";

const config = {
  issuer: 'https://accounts.google.com',
  clientId: '997159242404-s8v6kvlq910d1gb8c811kgd96292b7m8.apps.googleusercontent.com',
  redirectUrl: 'com.calenderofevents:/oauth2redirect/google',
  scopes: [
    'openid',
    'profile',
    'email',
    // 'https://www.googleapis.com/auth/calendar',
  ],
};
export default function SignInScreen(props:any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // GoogleSignin.configure({
    //   webClientId: '1019287630296-q1pfnt5ho137mm8g2ere9vreb4pl7h2f.apps.googleusercontent.com',
    // });
    // GoogleSignin.configure({
    //   webClientId: '1019287630296-q1pfnt5ho137mm8g2ere9vreb4pl7h2f.apps.googleusercontent.com',
    //   offlineAccess: true, // so you get refresh token
    // });
  },[])

  // const signIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  //     const userInfo = await GoogleSignin.signIn();
  //     console.log("User Info:", userInfo);
  //   } catch (error: any) {
  //     console.log(JSON.stringify(error),"-----error")
  //     if (isErrorWithCode(error)) {
  //       console.log("Google Sign-In Error:", error.code, error.message);
  //       switch (error.code) {
  //         case statusCodes.SIGN_IN_CANCELLED:
  //           console.log("User cancelled sign-in");
  //           break;
  //         case statusCodes.IN_PROGRESS:
  //           console.log("Sign-in already in progress");
  //           break;
  //         case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
  //           console.log("Play services not available or outdated");
  //           break;
  //         default:
  //           console.log("Other error:", error);
  //       }
  //     } else {
  //       console.log("Non-Google error:", error);
  //     }
  //   }
  // };

    const signIn = async () => {
    try {
      const authState = await authorize(config);
      console.log('Auth State:', authState);

      const { accessToken, refreshToken,idToken } = authState;
      console.log(accessToken)
      if (idToken) {
        const userInfo = jwtDecode(idToken);
        props?.navigation?.navigate("TodoScreen")
        console.log("User Info from ID Token:", userInfo);
        // Example userInfo fields: email, name, picture, sub
      }

    } catch (error) {
      console.error('Login error:', error);
    }
  };

  
  const handleSocialLogin = (provider: string) => {
    if(provider == "Google"){
      signIn()
    }
  };

  const renderSocialItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.socialButton}
      onPress={() => handleSocialLogin(item.name)}
    >
      <Image source={{ uri: item.icon }} style={styles.socialIcon} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>H</Text>
        </View>
      </View>

      <Text style={styles.title}>Sign in your account</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="ex: jon.smith@email.com"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="********"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.signInButton}>
        <Text style={styles.signInText}>SIGN IN</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or sign in with</Text>

      <View style={styles.socialButtonBox}>
        <FlatList
          data={socialData}
          renderItem={renderSocialItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don’t have an account?</Text>
        <TouchableOpacity>
          <Text style={styles.signUpText}> SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 25,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logoBox: {
    borderWidth: 2,
    borderColor: "#34c759",
    borderRadius: 10,
    padding: 15,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#34c759",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
    marginBottom: 5,
  },
  input: {
    height: 45,
    borderRadius: 8,
    backgroundColor: "#f7f7f7",
    paddingHorizontal: 12,
    marginBottom: 15,
    fontSize: 14,
    color: "#000",
  },
  signInButton: {
    backgroundColor: "#34c759",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  signInText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  orText: {
    textAlign: "center",
    color: "#555",
    marginBottom: 15,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  footerText: {
    color: "#777",
  },
  signUpText: {
    color: "#34c759",
    fontWeight: "bold",
  },
  socialContainer: {
    justifyContent: "center",
  },
  socialButton: {
    backgroundColor: "#f7f7f7",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 10,
    flexGrow: 1,
  },
  socialIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  socialButtonBox: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
});
