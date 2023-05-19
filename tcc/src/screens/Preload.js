import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

const Preload = (props) => {
  useEffect(() => {
    const delay = 2000;

    const timer = setTimeout(() => {
      if (!props.token) {
        // LOGIN
        props.navigation.dispatch(StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Login' })]
        }));
      } else {
        // HOME
        props.navigation.dispatch(StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'HomeDrawer' })]
        }));
      }
    }, delay);

    return () => clearTimeout(timer); // Limpa o timer ao desmontar o componente
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.userReducer.token
  };
}

export default connect(mapStateToProps)(Preload);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});