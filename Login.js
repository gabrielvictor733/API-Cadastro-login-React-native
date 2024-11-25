import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default function LoginScreen({ navigation, route }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    const { email: cadastradoEmail, senha: cadastradoSenha, nome, biometriaCadastrada } =
      route.params || {};

    if (email === cadastradoEmail && senha === cadastradoSenha) {
      Alert.alert('Sucesso', `Seja bem-vindo, ${nome}!`);
    } else {
      Alert.alert('Erro', 'Credenciais inválidas.');
    }
  };

  const autenticarBiometria = async () => {
    const { nome, biometriaCadastrada } = route.params || {};

    if (!biometriaCadastrada) {
      Alert.alert('Erro', 'Nenhuma biometria cadastrada.');
      return;
    }

    const biometria = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Use sua digital para autenticar',
    });

    if (biometria.success) {
      Alert.alert('Sucesso', `Seja bem-vindo, ${nome}!`);
    } else {
      Alert.alert('Erro', 'Autenticação biométrica falhou.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Cadastrar" onPress={() => navigation.navigate('Cadastro')} />
      <Button title="Login com Biometria" onPress={autenticarBiometria} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});
