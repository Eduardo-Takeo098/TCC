import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #fff;
`;

export const Header = styled.View`
  align-items: center;
  margin-bottom: 20px;
`;

export const HeaderTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

export const Menu = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const MenuItem = styled.TouchableOpacity`
  padding: 10px;
  border-bottom-width: 2px;
  border-bottom-color: ${({ active }) => (active ? '#333' : 'transparent')};
`;

export const MenuItemText = styled.Text`
  font-size: 18px;
  color: #333;
`;

export const Input = styled.TextInput`
  margin-bottom: 20px;
  padding: 10px;
  border-width: 1px;
  border-color: #999;
  border-radius: 5px;
  font-size: 16px;
  color: #333;
`;

export const ActionButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  height: 50px;
  background-color: green; /* Altere a cor aqui */
  border-radius: 5px;
`;

export const ActionButtonText = styled.Text`
  font-size: 18px;
  color: #fff;
`;

export const LoadingArea = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const LogoImage = styled.Image`
  width: 400px;
  height: 300px;
  align-self: center;
  margin-bottom: 20px;
`;
