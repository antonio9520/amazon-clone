import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {styles} from './styles';
import countryList from 'country-list';

const countries = countryList.getData();

const AddressScreen = () => {
  const [country, setCountry] = React.useState(countries[0].code);
  const [fullName, setFullName] = React.useState('');

  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <Picker selectedValue={country} onValueChange={setCountry}>
          {countries.map((countryItem: {code: any; name: any}) => (
            <Picker.Item value={countryItem.code} label={countryItem.name} />
          ))}
        </Picker>
      </View>

      {/* Full name */}
      <View style={styles.row}>
        <Text style={styles.label}>Full name (First and Last name)</Text>
        <TextInput
          style={styles.input}
          placeholder="Full name"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

      {/* Phone number */}
      <View style={styles.row}>
        <Text style={styles.label}>Full name (First and Last name)</Text>
        <TextInput
          style={styles.input}
          placeholder="Full name"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>
    </View>
  );
};

export default AddressScreen;
