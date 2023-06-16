import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, ImageBackground, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Snackbar, Text } from 'react-native-paper';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import firebaseConfig from '../Database/dbConfig';

const UserScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [cpf, setCPF] = useState('');
  const [number, setNumber] = useState('');
  const [rg, setRG] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showAddedData, setShowAddedData] = useState(false);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const usersData = querySnapshot.docs.map((doc) => doc.data());
    if (usersData.length > 0) {
      const user = usersData[0];
      setName(user.name);
      setAddress(user.address);
      setCPF(user.cpf);
      setNumber(user.number);
      setRG(user.rg);
      setShowAddedData(true);
    }
  };

  const handleAddData = async () => {
    try {
      await addDoc(collection(db, 'users'), {
        name,
        address,
        cpf,
        number,
        rg,
      });

      setName('');
      setAddress('');
      setCPF('');
      setNumber('');
      setRG('');

      setSnackbarVisible(true);
      fetchUserData(); 
    } catch (error) {
      console.error('Erro ao adicionar dados:', error);
    }
  };

  return (
    <View style={styles.container}>
      {!showAddedData ? (
        <View style={styles.form}>
          <Text style={styles.title}>Atualize seu perfil!🤩</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Nome Completo</Text>
            <TextInput
              label="Nome Completo"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Endereço</Text>
            <TextInput
              label="Endereço"
              value={address}
              onChangeText={setAddress}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>CPF</Text>
            <TextInput
              label="CPF"
              value={cpf}
              onChangeText={setCPF}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Número</Text>
            <TextInput
              label="Número"
              value={number}
              onChangeText={setNumber}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>RG</Text>
            <TextInput
              label="RG"
              value={rg}
              onChangeText={setRG}
              style={styles.input}
            />
          </View>
          <Button title="Adicionar dados" onPress={handleAddData} style={styles.button} />
        </View>
      ) : (
        <View style={styles.addedDataContainer}>
          <ImageBackground
            source={require('./images/dev2.png')}
            style={styles.backgroundImage}
          >
          <View style={styles.backButtonContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('./images/back.png')} style={styles.backButtonIcon} />
            </TouchableOpacity>
          </View>
          </ImageBackground>
          <View>
              <Text style={styles.profileName}>{name}</Text>
              <Text style={styles.profileUpdate}>Aqui você verá todas as suas atualizações do seu perfil!</Text>
          </View>
          <Text style={styles.addedDataTitle}>Dados Adicionados:</Text>
          <Text style={styles.addedDataText}>Endereço: {address}</Text>
          <Text style={styles.addedDataText}>CPF: {cpf}</Text>
          <Text style={styles.addedDataText}>Número: {number}</Text>
          <Text style={styles.addedDataText}>RG: {rg}</Text>
        </View>
      )}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        style={styles.snackbar}
        duration={3000}
      >
        <Text style={styles.snackbarText}>Dados adicionados com sucesso!</Text>
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  profileUpdate: {
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 13,
    color: '#B8B8B8',
  },
  profileName: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold'
  },
  backgroundImage: {
    marginLeft: 10,
    marginBottom: 30,
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '80%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputTitle: {
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 5,
  },
  button: {
    marginTop: 20,
  },
  addedDataContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 20,
    width: '100%',
    elevation: 5,
  },
  addedDataTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  addedDataText: {
    marginBottom: 10,
    color: '#B2B2B2',
    marginLeft: 1,
  },
  snackbar: {
    backgroundColor: '#333',
  },
  snackbarText: {
    color: '#FFF',
  },
});

export default UserScreen;
