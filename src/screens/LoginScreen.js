import React from 'react';
import {StyleSheet,Image} from 'react-native';

import {Heading} from '../components/Heading';
import {Input} from '../components/Input';
import {FilledButton} from '../components/FilledButton';
import {TextButton} from '../components/TextButton';
import {Error} from '../components/Error';
import {AuthContainer} from '../components/AuthContainer';
import {AuthContext} from '../contexts/AuthContext';
import {Loading} from '../components/Loading';

export function LoginScreen({navigation}) {
  const {login} = React.useContext(AuthContext);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  return (
    <AuthContainer>
      <Heading style={styles.title}>WELCOME</Heading>
      <Image source ={require('../images/image.jpeg')}
                    style={{width:"100%",height:"20%"}}
      />              
      <Error error={error} />
      <Input
        style={styles.input}
        placeholder={'Email'}
        keyboardType={'email-address'}
        value={email}
        onChangeText={setEmail}
      />
      <Input
        style={styles.input}
        placeholder={'Password'}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <FilledButton
        title={'Login'}
        style={styles.loginButton}
        onPress={async () => {
          try {
            setLoading(true);
            await login(email, password);
          } catch (e) {
            setError(e.message);
            setLoading(false);
          }
        }}
      />
      <TextButton
        title={'Have u an account? Sign Up'}
        onPress={() => {
          navigation.navigate('Registration');
        }}
      />
      <Loading loading={loading} />
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 30,
    marginBottom: 20,
    textAlign:'center',
    
  },
  input: {
    marginVertical: 8,
    marginLeft: 20,
    marginRight: 20 ,
    height: 55,
  },
  loginButton: {
    marginVertical: 32,
    marginLeft: 20,
    padding: 10,
    margin: 20,
    height: 50,
  },
});
