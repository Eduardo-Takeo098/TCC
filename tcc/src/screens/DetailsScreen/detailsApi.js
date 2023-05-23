const getRideDetails = () => {
    return new Promise((resolve, reject) => {
      // Dados da carona simulada
      const ride = {
        title: "Carona para o trabalho",
        origin: "Rua A, 123",
        destination: "Avenida B, 456",
        date: "2023-05-20",
        time: "08:00",
      };
  
      // Simulando um pequeno atraso na resposta da API
      setTimeout(() => {
        resolve(ride);
      }, 3000);
    });
  };
  
  export { getRideDetails };