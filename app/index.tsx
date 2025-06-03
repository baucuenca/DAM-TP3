import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../constants/firebaseConfig';

export default function Index() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/Login');
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

      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: '#ff4d4d',
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}
