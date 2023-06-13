import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firebaseConfig } from '../dbConfig';

export default function dbLogin() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(firebaseConfig, 'User'));
      querySnapshot.forEach((doc) => {
        setDados((prevDados) => [...prevDados, doc.data()]);
      });
    };

    fetchData();
  }, []);

  return (
    <view>
      {dados.map((item, index) => (
        <Text key={index}>{item.name}{item.email}{item.password}</Text>
      ))}
    </view>
  );
}
