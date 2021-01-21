import React from 'react';
import {StyleSheet,Image} from 'react-native';

import {Heading} from '../components/Heading';
import {Input} from '../components/Input';
import {FilledButton} from '../components/FilledButton';
import {Error} from '../components/Error';
import {IconButton} from '../components/IconButton';
import {AuthContainer} from '../components/AuthContainer';
import {AuthContext} from '../contexts/AuthContext';
import {Loading} from '../components/Loading';

export function RegistrationScreen({navigation}) {
  const {register} = React.useContext(AuthContext);
  const [fname, setFname] = React.useState('');
  const [lname, setLname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhoneNumber] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  return (
    <AuthContainer>
      <IconButton
        style={styles.closeIcon}
        name={'close-circle-outline'}
        onPress={() => {
          navigation.pop();
        }}
      />
      {/* <Heading style={styles.title}>REGISTRATION</Heading> */}
      <Image source ={require('../images/image.jpeg')}
                    style={{width:"100%",height:"10%"}}
      />
      <Error error={error} />
      <Input
        style={styles.input}
        placeholder={'First Name'}
        value={fname}
        onChangeText={setFname}
      />
      <Input
        style={styles.input}
        placeholder={'Last Name'}
        value={lname}
        onChangeText={setLname}
      />
      <Input
        style={styles.input}
        placeholder={'Phone Number'}
        value={phone}
        onChangeText={setPhoneNumber}
      />
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
        title={'Register'}
        style={styles.loginButton}
        onPress={async () => {
          try {
            setLoading(true);
            await register(fname,lname,phone,email, password);
            navigation.pop();
          } catch (e) {
            setError(e.message);
            setLoading(false);
          }
        }}
      />
      <Loading loading={loading} />
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 3,
    marginBottom: 48,
  },
  input: {
    marginVertical: 10,
    height: 55,
  },
  loginButton: {
    marginVertical: 10,
    height: 50,
    width: 150,
    position:'relative',
    bottom:0,
    left:-90,

  },
  closeIcon: {
    position: 'absolute',
    top: 20,
    right: 16,
  },
});
