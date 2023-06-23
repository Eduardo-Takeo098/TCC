import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, ImageBackground, Image, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Snackbar, Text } from 'react-native-paper';
import { initializeApp } from 'firebase/app';
import { format } from 'date-fns';
import { 
  getFirestore, collection, addDoc, getDocs, useCollectionDataOnce, serverTimestamp, updateDoc, doc  
} from 'firebase/firestore';
import firebaseConfig from '../Database/dbConfig';

const DriversScreen = ({ navigation }) => {
  const [calledDocuments, setCalledDocuments] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [cpf, setCPF] = useState('');
  const [number, setNumber] = useState('');
  const [rg, setRG] = useState('');
  const [placa, setPlaca] = useState('');
  const [carteiraMotorista, setCarteiraMotorista] = useState('');
  const [documentoCarro, setDocumentoCarro] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [DriverData, setDriverData] = useState(null);
  const [showAddedData, setShowAddedData] = useState(false);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  useEffect(() => {
    fetchDriverData();
  }, []);

  const handleAcceptCalled = async (documentId) => {
    const calledDocRef = doc(db, 'Called', documentId);
    await updateDoc(calledDocRef, { status: true });
  };

  const fetchDriverData = async () => {
    const querySnapshot = await getDocs(collection(db, 'Drivers'));
    const DriversData = querySnapshot.docs.map((doc) => doc.data());
    if (DriversData.length > 0) {
      const Driver = DriversData[0];
      setName(Driver.name);
      setAddress(Driver.address);
      setCPF(Driver.cpf);
      setNumber(Driver.number);
      setRG(Driver.rg);
      setPlaca(Driver.placa);
      setCarteiraMotorista(Driver.carteiraMotorista);
      setDocumentoCarro(Driver.documentoCarro);
      setShowAddedData(true);

      const calledQuerySnapshot = await getDocs(collection(db, 'Called'));
      const calledDocumentsData = calledQuerySnapshot.docs.map((doc) => doc.data());
      setCalledDocuments(calledDocumentsData);

    }
  };

  const handleAddData = async () => {
    try {
      await addDoc(collection(db, 'Drivers'), {
        name,
        address,
        cpf,
        number,
        rg,
        placa,
        carteiraMotorista,
        documentoCarro,
      });
  
      setName('');
      setAddress('');
      setCPF('');
      setNumber('');
      setRG('');
      setPlaca('');
      setCarteiraMotorista('');
      setDocumentoCarro('');
  
      setSnackbarVisible(true);
      fetchDriverData(); 
  
    } catch (error) {
      console.error('Erro ao adicionar dados:', error);
    }
  };

  return (
    <ScrollView>
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
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Placa</Text>
            <TextInput
              label="Placa"
              value={placa}
              onChangeText={setPlaca}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Carteira de Motorista</Text>
            <TextInput
              label="Carteira de Motorista"
              value={carteiraMotorista}
              onChangeText={setCarteiraMotorista}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Documento do Carro</Text>
            <TextInput
              label="Documento do Carro"
              value={documentoCarro}
              onChangeText={setDocumentoCarro}
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
          {calledDocuments.map((document) => (
            <View key={document.id} style={styles.calledItem}>
              <Text style={styles.calledDateTime}>
                {document.createdAt && typeof document.createdAt.toDate === 'function' && (
                  `Data e hora da criação: ${format(document.createdAt.toDate(), 'dd/MM/yyyy HH:mm')}`
                )}
              </Text>
              <Text style={styles.racingText} > Mais Uma Corrida!</Text>
              <Button
                title="Aceitar?"
                onPress={() => handleAcceptCalled(document.id)}
                style={styles.acceptButton}
              />
            </View>
          ))}
          <Text style={styles.addedDataTitle}>Dados Adicionados:</Text>
          <Text style={styles.addedDataText}>Endereço: {address}</Text>
          <Text style={styles.addedDataText}>CPF: {cpf}</Text>
          <Text style={styles.addedDataText}>Número: {number}</Text>
          <Text style={styles.addedDataText}>RG: {rg}</Text>
          <Text style={styles.addedDataText}>Placa: {placa}</Text>
          <Text style={styles.addedDataText}>Carteira de Motorista: {carteiraMotorista}</Text>
          <Text style={styles.addedDataText}>Documento do Carro: {documentoCarro}</Text>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  racingText: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold'
  },
  calledContainer: {
    marginTop: 20,
  },
  calledTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF0000',
  },
  calledItem: {
    marginBottom: 10,
  },
  calledDateTime: {
    marginBottom: 5,
    color: '#B2B2B2',
  },
  acceptButton: {
    marginTop: 5,
  },  
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
    borderRadius: 10,
    elevation: 2,
  },
  addedDataTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addedDataText: {
    marginBottom: 5,
  },
  snackbar: {
    backgroundColor: '#333',
    marginBottom: 20,
  },
  snackbarText: {
    color: '#FFF',
  },
});

export default DriversScreen;
