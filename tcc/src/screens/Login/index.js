import React, { useState } from 'react';
import {
  StatusBar,
  Platform,
  Text,
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../Database/dbConfig';
import {
  Container,
  Header,
  HeaderTitle,
  Menu,
  MenuItem,
  MenuItemText,
  Input,
  ActionButton,
  ActionButtonText,
  LoadingArea,
  LogoImage,
} from './styled';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Login = (props) => {
  const [activeMenu, setActiveMenu] = useState('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Conta criada com sucesso');
        const user = userCredential.user;
        console.log(user);

        props.setToken(user.token);
        props.navigation.dispatch(
          StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'HomeDrawer' }),
            ],
          })
        );
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(error.message);
      });
  };

  const handleSignIn = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Logado');
        const user = userCredential.user;
        console.log(user);

        props.setToken(user.token);
        props.navigation.dispatch(
          StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'HomeDrawer' }),
            ],
          })
        );
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Email ou senha incorreta');
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{ flex: 1 }}
      onPress={() => Keyboard.dismiss()}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Container>
          <StatusBar barStyle="light-content" />
          <Header>
            <HeaderTitle>Carona Solidária</HeaderTitle>
            <LogoImage source={require('./images/image1.png')} />
          </Header>
          <Menu>
            <MenuItem
              active={activeMenu === 'signin'}
              onPress={() => setActiveMenu('signin')}
              underlayColor="transparent"
            >
              <MenuItemText>Login</MenuItemText>
            </MenuItem>
            <MenuItem
              active={activeMenu === 'signup'}
              onPress={() => setActiveMenu('signup')}
              underlayColor="transparent"
            >
              <MenuItemText>Cadastrar</MenuItemText>
            </MenuItem>
          </Menu>

          {activeMenu === 'signup' && (
            <Input
              editable={!loading}
              value={name}
              onChangeText={(t) => setName(t)}
              placeholder="Nome"
              placeholderTextColor="#999"
            />
          )}

          <Input
            editable={!loading}
            value={email}
            onChangeText={(t) => setEmail(t)}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="E-mail"
            placeholderTextColor="#999"
          />

          <Input
            editable={!loading}
            value={password}
            onChangeText={(t) => setPassword(t)}
            placeholder="Senha"
            placeholderTextColor="#999"
            secureTextEntry={true}
          />

          {activeMenu === 'signin' && (
            <ActionButton disabled={loading} onPress={handleSignIn}>
              <ActionButtonText>Login</ActionButtonText>
            </ActionButton>
          )}

          {activeMenu === 'signup' && (
            <ActionButton disabled={loading} onPress={handleSignUp}>
              <ActionButtonText>Cadastrar</ActionButtonText>
            </ActionButton>
          )}

          {loading && (
            <LoadingArea>
              <ActivityIndicator size="large" color="#FFF" />
            </LoadingArea>
          )}
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.userReducer.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setToken: (token) =>
      dispatch({ type: 'SET_TOKEN', payload: { token } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);