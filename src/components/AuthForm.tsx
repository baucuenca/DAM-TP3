import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type AuthFormProps = {
  title: string;
  email: string;
  onEmailChange: (text: string) => void;
  password: string;
  onPasswordChange: (text: string) => void;
  confirmPassword?: string;
  onConfirmPasswordChange?: (text: string) => void;
  error: string;
  buttonText: string;
  onSubmit: () => void;
  linkText: string;
  onLinkPress: () => void;
  theme: any;
};

export default function AuthForm({
  title,
  email,
  onEmailChange,
  password,
  onPasswordChange,
  confirmPassword,
  onConfirmPasswordChange,
  error,
  buttonText,
  onSubmit,
  linkText,
  onLinkPress,
  theme,
}: AuthFormProps) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 24,
      justifyContent: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.textPrimary,
      marginBottom: 32,
      textAlign: 'center',
    },
    inputContainer: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      color: theme.textSecondary,
      marginBottom: 6,
    },
    input: {
      backgroundColor: theme.surface,
      color: theme.textPrimary,
      borderWidth: 1,
      borderColor: error ? 'red' : theme.border,
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
      backgroundColor: theme.buttonPrimary,
      paddingVertical: 14,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 10,
      shadowColor: theme.shadowColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
    },
    buttonText: {
      color: theme.buttonPrimaryText,
      fontSize: 16,
      fontWeight: 'bold',
    },
    link: {
      marginTop: 18,
      color: theme.primary,
      textAlign: 'center',
      fontSize: 14,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="ejemplo@email.com"
          value={email}
          onChangeText={onEmailChange}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={theme.textSecondary}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          placeholder="••••••••"
          value={password}
          onChangeText={onPasswordChange}
          style={styles.input}
          secureTextEntry
          placeholderTextColor={theme.textSecondary}
        />
      </View>

      {confirmPassword !== undefined && onConfirmPasswordChange && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirmar Contraseña</Text>
          <TextInput
            placeholder="••••••••"
            value={confirmPassword}
            onChangeText={onConfirmPasswordChange}
            style={styles.input}
            secureTextEntry
            placeholderTextColor={theme.textSecondary}
          />
        </View>
      )}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity onPress={onSubmit} style={styles.button}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>

      <Text onPress={onLinkPress} style={styles.link}>
        {linkText}
      </Text>
    </View>
  );
}
