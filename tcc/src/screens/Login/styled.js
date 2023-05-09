import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: #F7F7F7;
`;

export const Header = styled.SafeAreaView`
  height: 150px;
  background-color: #1E3D58;
  justify-content: center;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  color: #FFF;
  font-size: 40px;
  font-weight: bold;
  text-align: center;
`;


export const Menu = styled.View`
  background-color: #1E3D58;
  flex-direction: row;
  padding: 10px 20px;
  justify-content: space-around;
  align-items: center;
`;

export const MenuItem = styled.TouchableHighlight`
  padding: 10px 20px;
  border-bottom-width: 5px;
  border-bottom-color: ${props => props.active ? '#FFF' : '#1E3D58'};
  transition: all 0.2s ease-in-out;
  
  &:hover {
    background-color: #FFF;
  }
`;

export const MenuItemText = styled.Text`
  color: #FFF;
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
`;

export const Input = styled.TextInput`
  margin: 20px;
  padding: 10px;
  border-bottom-width: 2px;
  border-bottom-color: #1E3D58;
  height: 50px;
  font-size: 18px;
  color: #333;
  border-radius: 5px;
  background-color: #F7F7F7;
`;

export const ActionButton = styled.TouchableHighlight`
  background-color: #1E3D58;
  justify-content: center;
  align-items: center;
  height: 50px;
  border-radius: 5px;
  margin: 40px 20px 30px 20px;
  box-shadow: 0px 2px 5px rgba(30, 61, 88, 0.5);
`;

export const ActionButtonText = styled.Text`
  color: #FFF;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
`;

export const LoadingArea = styled.View`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1;
`;