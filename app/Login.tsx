import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
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

export default function Login() {
  useAuthRedirect();
  const { theme } = useContext(ThemeContext);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Por favor, completa todos los campos");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/");
    } catch (err: any) {
      setError(translateFirebaseError(err.code));
    }
  };

  return (
    <AuthForm
      title="Bienvenido"
      email={email}
      onEmailChange={setEmail}
      password={password}
      onPasswordChange={setPassword}
      error={error}
      buttonText="Iniciar sesión"
      onSubmit={handleLogin}
      linkText="¿No tienes cuenta? Regístrate"
      onLinkPress={() => router.push("/Signup")}
      theme={theme}
    />
  );
}
