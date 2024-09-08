import React, { useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { AuthenticationContext } from '../service/authentication.context';
import Button from '../components/button'; 
import GoogleButton from '../components/GoogleButton'; 
import Divider from '../components/Divider'; 
import { colors } from '../utils/colors';
import * as Google from 'expo-auth-session/providers/google'; 

const Focus = ({ navigation }) => {
  const [subject, setSubject] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { onLogin, error } = useContext(AuthenticationContext);

  
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "55551343994-hbk48s7qv45ujdm0q6fpdt120cct560t.apps.googleusercontent.com",
    iosClientId: "55551343994-ip0t6m4ri4af85ktoetpg565pjp5e7m9.apps.googleusercontent.com",
    webClientId:"55551343994-7jj5nca8ts9ns7vp8uobujogca6or85p.apps.googleusercontent.com",
  });

  const handleSignUpPress = () => {
    if (!subject) {
      setErrorMessage('Please enter an email address');
      return;
    }
    setErrorMessage('');
    navigation.navigate('SignUp', { email: subject });
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await promptAsync();
      if (result.type === 'success') {
        const { authentication } = result;
        console.log('Google Authentication:', authentication);
      } else {
        console.log('Google Authentication failed:', result);
      }
    } catch (e) {
      console.error('Google Authentication error:', e);
      Alert.alert('Error', 'Failed to authenticate with Google. Please try again later.');
    }
  };

  const handleSignInPress = () => {
    navigation.navigate('SignIn');
  };

  const onChangeSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    setSubject(lowerCaseQuery);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.textContainer}>
            <Text style={styles.text1}>BMS</Text>
            <Text style={styles.text2}>Vidhyarthi Khaana</Text>
            <Text style={styles.text3}>Create an account</Text>
            <Text style={styles.text4}>Enter your email to sign up</Text>
          </View>
          <View style={styles.inputWrapper}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                onChangeText={onChangeSearch}
                label="email@bmsce.ac.in"
                mode="outlined"
                value={subject}
                theme={{
                  colors: {
                    primary: colors.gray2,
                    underlineColor: 'transparent',
                  },
                }}
              />
            </View>
            {errorMessage ? (
              <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}
            <View style={styles.buttonContainer}>
              <Button
                title="Sign up with email"
                onPress={handleSignUpPress}
                color={colors.white}
                labelStyle={{ color: colors.white }}
              />
            </View>
            <Divider text="or continue with" />
            <GoogleButton onPress={handleGoogleSignUp} style={styles.google} />
          </View>
          <View style={styles.bottomText}>
            <Text style={styles.text5}>
              By clicking continue, you agree to our{' '}
              <Text
                style={styles.link}
                onPress={() => console.log('Terms of Service pressed')}
              >
                Terms of Service
              </Text>{' '}
              and{' '}
              <Text
                style={styles.link}
                onPress={() => console.log('Privacy Policy pressed')}
              >
                Privacy Policy
              </Text>
            </Text>
            <Text style={styles.enter} onPress={handleSignInPress}>
              Already have an account? Sign in
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    paddingTop: 50,
    alignItems: 'center',
  },
  text1: {
    color: colors.pure,
    fontSize: 32,
    fontWeight: '600',
  },
  text2: {
    color: colors.pure,
    fontSize: 28,
    fontWeight: '600',
  },
  text3: {
    color: colors.black,
    fontSize: 18,
    fontWeight: '600',
    paddingTop: 70,
  },
  text4: {
    fontSize: 14,
    fontWeight: '400',
  },
  text5: {
    color: '#828282',
    textAlign: 'center',
    bottom: 40,
  },
  link: {
    color: colors.black,
  },
  bottomText: {
    paddingLeft: 27,
    paddingRight: 22,
    paddingTop: 5,
    alignItems: 'center',
  },
  inputWrapper: {
    alignItems: 'center',
    paddingBottom: 70,
  },
  inputContainer: {
    width: 327,
    marginBottom: 20,
  },
  textInput: {
    width: '100%',
    height: 40,
  },
  buttonContainer: {
    width: 327,
    alignItems: 'center',
  },
  enter: {
    top: 80,
    fontSize: 16,
    fontWeight: '600',
  },
  google: {
    // Add any styles for GoogleButton if needed
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
});

export default Focus;
