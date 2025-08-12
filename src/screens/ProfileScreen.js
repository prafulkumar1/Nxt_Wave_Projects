
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';


export default function ProfileScreen({ navigation }) {
  const navigation2 = useNavigation()

  // React.useEffect(() => {
  //   const unsubscribe = navigation2?.addListener('focus', () => {
  //     alert('Screen is focused');
  //   });

  //   const onBlurChange = navigation2?.addListener('blur', () => {
  //     // alert('Screen is blur');
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  const handleNavigate = () => {
    navigation?.navigate("HomeScreen");
  };

  const goBack = () => {
    navigation?.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>

      <TouchableOpacity style={[styles.button, styles.blueButton]} onPress={handleNavigate}>
        <Text style={styles.buttonText}>Navigate</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.greenButton]} onPress={goBack}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>

      <TextInput
        keyboardType='visible-password'
        returnKeyType='next' 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
  },
  button: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 10,
  },
  blueButton: {
    backgroundColor: 'blue',
  },
  greenButton: {
    backgroundColor: 'green',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

