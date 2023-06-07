import React, { useState } from 'react';
import { StatusBar, Platform, Text, ActivityIndicator } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import axios from 'axios';

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
  LoadingArea
} from './styled';

const serverUrl = 'http://localhost:3000/server';


const app = {
  signin: async (email, password) => {
    const endpoint = `${serverUrl}/api/login`;
    const data = { email, password };

    try {
      console.log('Realizando requisição de login...');
      const response = await axios.post(endpoint, data);
      console.log('Resposta da requisição de login:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao efetuar o login:', error);
      throw error;
    }
  },

  signup: async (name, email, password) => {
    const endpoint = `${serverUrl}/api/singup`;
    const data = { name, email, password };

    try {
      console.log('Realizando requisição de cadastro...');
      const response = await axios.post(endpoint, data);
      console.log('Resposta da requisição de cadastro:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao cadastrar o usuário:', error);
      throw error;
    }
  }
};


const Page = (props) => {
  const [activeMenu, setActiveMenu] = useState('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (email && password) {
      setLoading(true);

      try {
        const res = await app.signin(email, password);
        setLoading(false);

        if (res.error) {
          alert(res.error);
        } else {
          props.setToken(res.token);
          props.navigation.dispatch(
            StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'HomeDrawer' })]
            })
          );
        }
      } catch (error) {
        setLoading(false);
        alert('Ocorreu um erro ao efetuar o login.');
        console.error(error);
      }
    }
  };

  const handleSignUp = async () => {
    if (name && email && password) {
      setLoading(true);

      try {
        const res = await app.signup(name, email, password);
        setLoading(false);

        if (res.error) {
          alert(res.error);
        } else {
          props.setToken(res.token);
          props.navigation.dispatch(
            StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'HomeDrawer' })]
            })
          );
        }
      } catch (error) {
        setLoading(false);
        alert('Ocorreu um erro ao cadastrar o usuário.');
        console.error(error);
      }
    }
  };

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : null}>
      {/*<StatusBar barStyle="light-content"/>*/}
      <Header>
        <HeaderTitle>Carona Solidária</HeaderTitle>
      </Header>
      <Menu>
        <MenuItem active={activeMenu == 'signin'} onPress={() => setActiveMenu('signin')} underlayColor="transparent">
          <MenuItemText>Login</MenuItemText>
        </MenuItem>
        <MenuItem active={activeMenu == 'signup'} onPress={() => setActiveMenu('signup')} underlayColor="transparent">
          <MenuItemText>Cadastrar</MenuItemText>
        </MenuItem>
      </Menu>

      {activeMenu == 'signup' && <Input editable={!loading} value={name} onChangeText={(t) => setName(t)} placeholder="Nome" placeholderTextColor="#999" />}

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

      {activeMenu == 'signin' && (
        <ActionButton disabled={loading} onPress={handleSignIn}>
          <ActionButtonText>Login</ActionButtonText>
        </ActionButton>
      )}

      {activeMenu == 'signup' && (
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
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.userReducer.token
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setToken: (token) => dispatch({ type: 'SET_TOKEN', payload: { token } })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
