import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import AuthForm from "../src/components/Auth/AuthForm";
import { auth } from "../src/constants/firebaseConfig";
import { ThemeContext } from "../src/context/ThemeContext";
import { useAuthRedirect } from "../src/hooks/useAuthRedirect";

function translateFirebaseError(errorCode: string): string {
  switch (errorCode) {
    case "auth/invalid-email":
      return "El correo electrónico no es válido.";
    case "auth/invalid-credential":
      return "Credenciales inválidas.";
    case "auth/weak-password":
      return "La contraseña debe tener al menos 6 caracteres.";
    case "auth/email-already-in-use":
      return "El correo electrónico ya está en uso.";
    case "auth/user-not-found":
      return "No se encontró un usuario con ese correo.";
    case "auth/wrong-password":
      return "La contraseña es incorrecta.";
    default:
      return "Ocurrió un error inesperado. Intenta nuevamente.";
  }
}

export default function Signup() {
  useAuthRedirect();
  const { theme } = useContext(ThemeContext);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");
    if (!email || !password || !confirmPassword) {
      setError("Por favor, completa todos los campos");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace("/");
    } catch (err: any) {
      setError(translateFirebaseError(err.code));
    }
  };

  return (
    <AuthForm
      title="Crear cuenta"
      email={email}
      onEmailChange={setEmail}
      password={password}
      onPasswordChange={setPassword}
      confirmPassword={confirmPassword}
      onConfirmPasswordChange={setConfirmPassword}
      error={error}
      buttonText="Registrarse"
      onSubmit={handleSignup}
      linkText="¿Ya tienes cuenta? Inicia sesión"
      onLinkPress={() => router.push("/Login")}
      theme={theme}
    />
  );
}
