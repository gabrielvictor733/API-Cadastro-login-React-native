import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Picker } from '@react-native-picker/picker'

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [funcao, setFuncao] = useState('aluno');
  const [biometriaCadastrada, setBiometriaCadastrada] = useState(false);

  const cadastrarBiometria = async () => {
    const disponivel = await LocalAuthentication.hasHardwareAsync();
    if (!disponivel) {
      Alert.alert('Erro', 'Biometria não disponível neste dispositivo.');
      return;
    }

    const biometria = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Registre sua digital',
    });

    if (biometria.success) {
      setBiometriaCadastrada(true);
      Alert.alert('Sucesso', 'Biometria registrada com sucesso!');
    } else {
      Alert.alert('Erro', 'Falha ao registrar biometria.');
    }
  };

  const handleCadastro = () => {
    if (!nome || !email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
    navigation.navigate('Login', { nome, email, senha, funcao, biometriaCadastrada });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
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
      <Picker selectedValue={funcao} onValueChange={setFuncao} style={styles.input}>
        <Picker.Item label="Aluno" value="aluno" />
        <Picker.Item label="Professor" value="professor" />
        <Picker.Item label="Coordenador" value="coordenador" />
      </Picker>
      <Button title="Registrar Biometria" onPress={cadastrarBiometria} />
      <Button title="Cadastrar" onPress={handleCadastro} />
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
