import React from 'react';
import { View, ScrollView, ImageBackground, Image, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Detail extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <ImageBackground
          source={require('./images/dev2.png')}
          style={styles.backgroundImage}
        >
          <View style={styles.backButtonContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image source={require('./images/back.png')} style={styles.backButtonIcon} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <View style={styles.contentContainer}>
          <View style={styles.profileInfoContainer}>
            <View>
              <Text style={styles.profileName}>Fernando Silva</Text>
              <View style={styles.profileDetails}>
                <Text style={styles.profileGender}>Masculino</Text>
                <Text style={styles.profileLocation}>Brasil, São Paulo</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Tempo de contribuição:</Text>
            <Text style={styles.infoValue}>2 Anos</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Avaliação:</Text>
            <Text style={styles.infoValue}>4.7 ⭐️</Text>
          </View>
        </View>
        <View style={styles.biographyContainer}>
          <Text style={styles.biographyTitle}>Biografia:</Text>
          <Text style={styles.biographyText}>
            Olá, meu nome é Fernando Silva. Nasci e cresci em uma pequena cidade, onde aprendi desde cedo a importância de ajudar os outros. 
            A estrada sempre foi minha paixão, e cada viagem se tornava uma oportunidade de explorar novos lugares e conhecer diferentes culturas.
            Ao longo dos anos, descobri que poderia usar minha paixão pela condução para fazer a diferença na vida das pessoas. Decidi me tornar um motorista solidário, 
            oferecendo caronas e assistência para aqueles que precisavam se deslocar.
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 20
  },
  backgroundImage: {
    marginLeft: 10,
    width: '100%',
    height: 250
  },
  backButtonContainer: {
    backgroundColor: '#000',
    height: 30,
    width: 40,
    marginLeft: -10,
    marginTop: 70,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backButtonIcon: {
    width: 25,
    height: 10
  },
  contentContainer: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 15
  },
  profileInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  profileDetails: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  profileGender: {
    fontWeight: 'bold',
    color: '#000',
    opacity: 0.6,
    fontSize: 14
  },
  profileLocation: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#B8B8B8',
    marginLeft: 25
  },
  infoContainer: {
    flexDirection: 'row',
    marginTop: 20
  },
  infoItem: {
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    width: 140
  },
  infoLabel: {
    fontWeight: 'bold',
    color: '#B8B8B8'
  },
  infoValue: {
    fontWeight: 'bold'
  },
  biographyContainer: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    marginTop: 20
  },
  biographyTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10
  },
  biographyText: {
    fontWeight: 'normal',
    color: '#B2B2B2',
    marginBottom: 10
  }
});
