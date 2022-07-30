import { useColorScheme, View, Text, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Button } from 'react-native'
import React, { useContext, useState } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import moment from 'moment'
import { Formik, validateYupSchema } from 'formik'
import * as yup from 'yup'

import IconFA5 from 'react-native-vector-icons/FontAwesome5'

import { AuthContext } from '../../navigation/AuthProvider'

const color = '#aaa';

const SignUpScreen = ({ navigation }) => {

  const isDarkMode = useColorScheme() === 'dark';

  const [isSecurePass, setIsSecurePass] = useState(true);
  const [isSecurePassConfirm, setIsSecurePassConfirm] = useState(true);
  const { signup } = useContext(AuthContext);

  const signupValidationSchema = yup.object().shape({

    nickname: yup
      .string()
      .required('Boş Geçilemez')
      .max(30, ({ max }) => 'Kullanıcı Adı en fazla ' + max + ' karakterden oluşmalıdır')
      .min(1, ({ min }) => 'Kullanıcı Adı en az ' + min + ' karakterden oluşmalıdır'),

    email: yup
      .string()
      .required('Boş Geçilemez')
      .email('Geçerli bir e-mail adresi giriniz!'),

    password: yup
      .string()
      .required('Boş Geçilemez')
      .min(6, ({ min }) => 'Şifre en az ' + min + ' karakterden oluşmalıdır')
      .matches(/\w*[a-z]\w*/, 'En az 1 adet küçük harf kullanmalısınız!')
      .matches(/\w*[A-Z]\w*/, 'En az 1 adet büyük harf kullanmalısınız!')
      .matches(/\d/, 'En az 1 adet rakam kullanmalısınız!')
      .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, 'En az 1 adet özel karakter kullanmalısınız!'),

    passwordConfirm: yup
      .string()
      .required('Boş Geçilemez')
      .oneOf([yup.ref('password')], 'Şifreler uyumsuz')
      .min(6, ({ min }) => 'Şifre en az ' + min + ' karakterden oluşmalıdır')
      .matches(/\w*[a-z]\w*/, 'En az 1 adet küçük harf kullanmalısınız!')
      .matches(/\w*[A-Z]\w*/, 'En az 1 adet büyük harf kullanmalısınız!')
      .matches(/\d/, 'En az 1 adet rakam kullanmalısınız!')
      .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, 'En az 1 adet özel karakter kullanmalısınız!'),

  });

  return (
    <SafeAreaView style={{
      width: '100%',
      height: '100%',
      backgroundColor: "#FF6F00",
      justifyContent: 'center',
      alignItems: 'center'
    }}>

      <Text style={{
        fontSize: 24,
        height: '10%',
        color: Colors.white
      }}>CodeTalks</Text>

      <View style={{
        width: '100%',
        padding: '5%'
      }}>

        <Formik
          validationSchema={signupValidationSchema}
          initialValues={{
            nickname: '',
            email: '',
            password: '',
            passwordConfirm: ''
          }}
          onSubmit={values => signup(values.email, values.password, values.nickname, navigation)}>
          {({ handleChange, handleBlur, handleSubmit, values, errors, isValid,
          }) => (
            <>

              <TextInput
                name="email"
                placeholder="E-mail Adresi"
                style={{
                  width: '100%',
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.white,
                  marginBottom: '2%'
                }}
                color={Colors.white}
                placeholderTextColor={Colors.white}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
              />
              {errors.email && <Text style={{ color: '#f00', fontSize: 14, fontWeight: 'bold' }}>{errors.email}</Text>}

              <TextInput
                name="nickname"
                placeholder="NickName"
                style={{
                  width: '100%',
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.white,
                  marginBottom: '2%'
                }}
                color={Colors.white}
                placeholderTextColor={Colors.white}
                onChangeText={handleChange('nickname')}
                onBlur={handleBlur('nickname')}
                value={values.nickname}
                keyboardType="email-address"
              />
              {errors.nickname && <Text style={{ color: '#f00', fontSize: 14, fontWeight: 'bold' }}>{errors.nickname}</Text>}

              <View style={{
                width: '100%',
                borderBottomWidth: 1,
                borderBottomColor: Colors.white,
                marginBottom: '2%'
              }}>
                <TextInput
                  name="password"
                  placeholder="Şifre"
                  style={{
                    width: '90%',
                    fontSize: 16
                  }}
                  color={Colors.white}
                  placeholderTextColor={Colors.white}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={isSecurePass}
                />
                <IconFA5 onPress={() => {
                  setIsSecurePass(!isSecurePass)
                }} style={{
                  position: 'absolute',
                  right: 0,
                  top: '30%'
                }}
                  name={isSecurePass ? 'eye-slash' : 'eye'}
                  size={20}
                  color={Colors.white} />
              </View>

              <View>{errors.password && (<Text style={{ color: '#f00', fontSize: 14, fontWeight: 'bold' }}>{errors.password}</Text>)}</View>

              <View style={{
                width: '100%',
                borderBottomWidth: 1,
                borderBottomColor: Colors.white,
                marginBottom: '2%'
              }}>
                <TextInput
                  name="passwordConfirm"
                  placeholder="Şifre Tekrar"
                  style={{
                    height: 50,
                    width: '80%',
                    fontSize: 16
                  }}
                  color={Colors.white}
                  placeholderTextColor={Colors.white}
                  onChangeText={handleChange('passwordConfirm')}
                  onBlur={handleBlur('passwordConfirm')}
                  value={values.passwordConfirm}
                  secureTextEntry={isSecurePassConfirm}
                />
                <IconFA5 onPress={() => {
                  setIsSecurePassConfirm(!isSecurePassConfirm)
                }} style={{
                  position: 'absolute',
                  right: 0,
                  top: '30%'
                }}
                  name={isSecurePassConfirm ? 'eye-slash' : 'eye'}
                  size={20}
                  color={Colors.white} />
              </View>
              {errors.passwordConfirm && (<Text style={{ color: '#f00', fontSize: 14, fontWeight: 'bold' }}>{errors.passwordConfirm}</Text>)}

              <View style={{
                width: '100%',
                marginTop: '5%',
              }}>

                <TouchableOpacity style={{
                  backgroundColor: isValid ? 'orange' : '#BDBDBD',
                  alignItems: 'center',
                  padding: '2%',
                  borderRadius: 10
                }}
                  disabled={!isValid}
                  onPress={handleSubmit}>
                  <Text style={{
                    color: 'white',
                    fontSize: 16,
                    fontWeight: 'bold'
                  }}>Üye Ol</Text>
                </TouchableOpacity>

              </View>


            </>
          )}
        </Formik>

        <TouchableOpacity style={{
          backgroundColor: 'white',
          alignItems: 'center',
          padding: '2%',
          borderRadius: 10,
          marginTop: '5%'
        }}
          onPress={() => {
            navigation.navigate("LoginScreen")
          }}>
          <Text style={{
            color: '#FF6F00',
            fontSize: 16,
            fontWeight: 'bold'
          }}>Giriş Yap</Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  )
}

export default SignUpScreen