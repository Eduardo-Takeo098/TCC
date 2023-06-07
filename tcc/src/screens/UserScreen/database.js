import { AsyncStorage } from 'react-native';

const DB_KEY = 'myAppDB'; // Chave para armazenar os dados no AsyncStorage

const Database = {
  // Função para obter todos os dados do banco de dados
  getAllData: async () => {
    try {
      const data = await AsyncStorage.getItem(DB_KEY);
      return data ? JSON.parse(data) : []; // Retorna um array vazio se não houver dados salvos
    } catch (error) {
      console.error('Erro ao obter dados do banco de dados:', error);
      return [];
    }
  },

  // Função para salvar dados no banco de dados
  saveData: async (data) => {
    try {
      await AsyncStorage.setItem(DB_KEY, JSON.stringify(data));
      console.log('Dados salvos com sucesso no banco de dados!');
    } catch (error) {
      console.error('Erro ao salvar dados no banco de dados:', error);
    }
  },

  // Função para limpar o banco de dados (remover todos os dados)
  clearData: async () => {
    try {
      await AsyncStorage.removeItem(DB_KEY);
      console.log('Banco de dados limpo com sucesso!');
    } catch (error) {
      console.error('Erro ao limpar o banco de dados:', error);
    }
  },
};

export default Database;
