import React from 'react';
import { View, ScrollView, ImageBackground, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Detail extends React.Component {
  render() {
    return (
      <ScrollView style={{
        backgroundColor: "#f8f8f8",
        paddingHorizontal: 20
      }}>
        <ImageBackground
          source={require('./images/dev2.png')}
          style={{ marginLeft: 50, width: "100%", height: 250 }}
        >
          <View style={{
            backgroundColor: "#000",
            height: 30,
            width: 40,
            marginLeft: -50,
            marginTop: 70,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center"
          }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image source={require('./images/back.png')} style={{ width: 25, height: 10 }} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <View style={{
          backgroundColor: "#FFF",
          padding: 10,
          borderRadius: 15
        }}>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
          }}>
            <View>
              <Text style={{
                fontSize: 18,
                fontWeight: "bold"
              }}>Fernando Silva</Text>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{
                  fontWeight: "bold",
                  color: "#000",
                  opacity: 0.6,
                  fontSize: 14
                }}>Masculino</Text>

                <Text style={{
                  fontWeight: "bold",
                  fontSize: 13,
                  color: "#B8B8B8",
                  marginLeft: 25
                }}>Brasil, São Paulo</Text>
              </View>
            </View>
            <View style={{
              backgroundColor: "#DFDFDF",
              height: 32,
              width: 32,
              borderRadius: 5,
              marginLeft: 50,
              marginTop: 5,
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Image source={require('./images/favourite.png')}
                style={{ opacity: 0.5, width: 24, height: 24 }} />
            </View>
          </View>
          <View style={{
            flexDirection: "row",
            paddingTop: 20,
            alignItems: "center"
          }}>
            <Image source={require('./images/1.jpg')} style={{ width: 30, height: 30 }} />
            <Image source={require('./images/2.jpg')} style={{ width: 30, height: 30 }} />
            <Image source={require('./images/3.jpg')} style={{ width: 30, height: 30 }} />
            <Image source={require('./images/4.jpg')} style={{ width: 30, height: 30 }} />
            <Text style={{
              fontWeight: "bold",
              color: "#B8B8B8",
              paddingHorizontal: 10
            }}>Últimas atividades</Text>
          </View>
        </View>
        <View style={{
          flexDirection: "row",
          marginTop: 20
        }}>
          <View style={{
            backgroundColor: "#FFF",
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderRadius: 8,
            width: 140
          }}>
            <Text style={{
              fontWeight: "bold",
              color: "#B8B8B8",
            }}>Tempo de contribuição:</Text>
            <Text style={{
              fontWeight: "bold"
            }}>2 Anos</Text>
          </View>
          <View style={{
            backgroundColor: "#FFF",
            paddingVertical: 10,
            paddingHorizontal: 10,
            marginLeft: 35,
            borderRadius: 8,
            width: 140
          }}>
            <Text style={{
              fontWeight: "bold",
              color: "#B8B8B8",
            }}>Avaliação:</Text>
            <Text style={{
              fontWeight: "bold"
            }}>4.7 ⭐️ </Text>
          </View>
        </View>
        <View style={{
          backgroundColor: "#FFF",
          borderRadius: 15,
          padding: 20,
          marginTop: 20
        }}>
          <Text style={{
            fontWeight: "bold",
            fontSize: 20,
            marginBottom: 10
          }}>Biografia:</Text>
          <Text style={{
            fontWeight: "normal",
            color: "#B2B2B2",
            marginBottom: 10,
          }}>
            Olá, meu nome é Roberto Silva. Nasci e cresci em uma pequena cidade, onde aprendi desde cedo a importância de ajudar os outros. 
            A estrada sempre foi minha paixão, e cada viagem se tornava uma oportunidade de explorar novos lugares e conhecer diferentes culturas.
            Ao longo dos anos, descobri que poderia usar minha paixão pela condução para fazer a diferença na vida das pessoas. Decidi me tornar um motorista solidário, 
            oferecendo caronas e assistência para aqueles que precisavam se deslocar. 
          </Text>
        </View>
        <View style={{
          width: "100%",
          alignItems: "flex-end"
        }}>
        </View>
      </ScrollView>
    );
  }
}
