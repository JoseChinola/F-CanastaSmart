import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const TOKEN_KEY = 'user_token';
const USER_KEY = 'user_data';

// Guardar token
export async function saveToken(token: string) {
  try {
    if (Platform.OS === 'web') {
      await AsyncStorage.setItem(TOKEN_KEY, token.toString());
    } else {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    }
  } catch (error) {
    console.error('Error guardando token:', error);
  }
}

// Guardar datos de usuario
export async function saveUser(user: any) {
  try {
    if (Platform.OS === 'web') {
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
    }
  } catch (error) {
    console.error('Error guardando datos de usuario:', error);
  }
}

// Obtener token
export async function getToken() {
  try {
    if (Platform.OS === 'web') {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      return token;
    } else {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      return token;
    }
  } catch (error) {
    console.error('Error obteniendo token:', error);
    return null;
  }
}

// Obtener datos de usuario
export async function getUser(): Promise<any | null> {
  try {
    if (Platform.OS === 'web') {
      const userString = await AsyncStorage.getItem(USER_KEY);
      return userString ? JSON.parse(userString) : null;
    } else {
      const userString = await SecureStore.getItemAsync(USER_KEY);
      return userString ? JSON.parse(userString) : null;
    }
  } catch (error) {
    console.error('Error obteniendo datos de usuario:', error);
    return null;
  }
}

// Eliminar token y datos de usuario
export async function removeTokenAndUser() {
  try {
    if (Platform.OS === 'web') {
      await AsyncStorage.removeItem(TOKEN_KEY);
      await AsyncStorage.removeItem(USER_KEY);
    } else {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await SecureStore.deleteItemAsync(USER_KEY);
    }
  } catch (error) {
    console.error('Error eliminando token o usuario:', error);
  }
}