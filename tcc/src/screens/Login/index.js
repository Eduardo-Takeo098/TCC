import React, { useState } from 'react';
import { Statusbar, Platform } from 'react-native';
import { 
  Container,
  Header,
  HeaderTitle, 
  Menu,
  MenuItem,
  MenuItemText,
  Input,
  ActionButton,
  ActionButtonText
} from './styled';

const Page = () => {

  const [activeMenu, setActiveMenu] = useState('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container behavior={Platform.OS === 'ios'?'padding':null}>
      {/*<Statusbar barStyle="light-content"/>*/}
      <Header>
        <HeaderTitle>Carona Solidária</HeaderTitle>
      </Header>
      <Menu>
        <MenuItem active={activeMenu=='signin'} onPress={()=>setActiveMenu('signin')} underlayColor="transparent">
          <MenuItemText>Login</MenuItemText>
        </MenuItem>
        <MenuItem active={activeMenu=='signup'} onPress={()=>setActiveMenu('signup')} underlayColor="transparent">
          <MenuItemText>Cadastrar</MenuItemText>
        </MenuItem>
      </Menu>

      {activeMenu == 'signup' &&
        <Input value={name} onChangeText={t=>setName(t)} placeholder="Nome" placeholderTextColor="#999" />
      }

      <Input valu={email} onChangeText={t=>setEmail(t)} keyboardType="email-address" autoCapitalize="none" placeholder="E-mail" placeholderTextColor="#999" />

      <Input value={password} onChangeText={t=>setPassword(t)} placeholder="Senha" placeholderTextColor="#999" />
      
      {activeMenu == 'signin' &&
        <ActionButton>
          <ActionButtonText>Login</ActionButtonText>
        </ActionButton>
      }

      {activeMenu == 'signup' &&
        <ActionButton>
          <ActionButtonText>Cadastrar</ActionButtonText>
        </ActionButton>
      }
    </Container>
  );
}

export default Page;