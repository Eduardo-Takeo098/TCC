import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import LottieView from 'lottie-react-native';

const Preload = (props) => {

  return (
    <View style={styles.container}>
      <LottieView
        source={require('./Splash/splash.json')}
        autoPlay
        loop={false}
        onAnimationFinish={() => {
          if (!props.token) {
            // LOGIN
            props.navigation.dispatch(StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'OnboardingScreen' })]
            }));
          } else {
            // HOME
            props.navigation.dispatch(StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'HomeDrawer' })]
            }));
          }
        }}
      />
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
