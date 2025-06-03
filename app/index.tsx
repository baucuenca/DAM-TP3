import { useRouter } from 'expo-router';
import { onAuthStateChanged, signOut, User } from 'firebase/auth'; 
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../constants/firebaseConfig';

export default function Index() {
  const [user, setUser] = useState<User | null>(null); 
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}
    >
      <Text style={{ marginBottom: 20 }}>
        Edit app/index.tsx to edit this screen.
      </Text>

      {user && (
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            backgroundColor: '#ff4d4d',
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            Cerrar sesión
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
