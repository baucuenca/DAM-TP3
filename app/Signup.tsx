import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../constants/firebaseConfig';
import { ThemeContext } from '../src/context/ThemeContext';
import { useAuthRedirect } from '../src/hooks/useAuthRedirect';

function translateFirebaseError(errorCode: string): string {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'El correo electrónico no es válido.';
    case 'auth/invalid-credential':
      return 'Credenciales inválidas.';
    case 'auth/weak-password':
      return 'La contraseña debe tener al menos 6 caracteres.';
    case 'auth/email-already-in-use':
      return 'El correo electrónico ya está en uso.';
    case 'auth/user-not-found':
      return 'No se encontró un usuario con ese correo.';
    case 'auth/wrong-password':
      return 'La contraseña es incorrecta.';
    default:
      return 'Ocurrió un error inesperado. Intenta nuevamente.';
  }
}


export default function Signup() {
  useAuthRedirect();
  const { theme: currentTheme } = useContext(ThemeContext);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    setError('');
    if (!email || !password || !confirmPassword) {
      setError('Por favor, completa todos los campos');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace('/');
    } catch (err: any) {
      setError(translateFirebaseError(err.code));
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentTheme.background,
      padding: 24,
      justifyContent: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: currentTheme.textPrimary,
      marginBottom: 32,
      textAlign: 'center',
    },
    inputContainer: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      color: currentTheme.textSecondary,
      marginBottom: 6,
    },
    input: {
      backgroundColor: currentTheme.surface,
      color: currentTheme.textPrimary,
      borderWidth: 1,
      borderColor: error ? 'red' : currentTheme.border,
      borderRadius: 10,
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    error: {
      color: 'red',
      marginBottom: 8,
      textAlign: 'center',
    },
    button: {
      backgroundColor: currentTheme.buttonPrimary,
      paddingVertical: 14,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 10,
      shadowColor: currentTheme.shadowColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
    },
    buttonText: {
      color: currentTheme.buttonPrimaryText,
      fontSize: 16,
      fontWeight: 'bold',
    },
    link: {
      marginTop: 18,
      color: currentTheme.primary,
      textAlign: 'center',
      fontSize: 14,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="ejemplo@email.com"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={currentTheme.textSecondary}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
          placeholderTextColor={currentTheme.textSecondary}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirmar Contraseña</Text>
        <TextInput
          placeholder="••••••••"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
          secureTextEntry
          placeholderTextColor={currentTheme.textSecondary}
        />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity onPress={handleSignup} style={styles.button}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <Text onPress={() => router.push('/Login')} style={styles.link}>
        ¿Ya tienes cuenta? Inicia sesión
      </Text>
    </View>
  );
}
