import React, { useState } from 'react';
import { FlatList, Keyboard, KeyboardAvoidingView, Modal, Platform, Pressable, SafeAreaView, Text, TextInput, View } from 'react-native';
import { colors, glass, GlassButton } from './SoftGlass';
import { currencyNames } from './currencyCodes';

const popular = ['USD', 'EUR', 'GBP', 'JPY', 'CHF'];
const currencies = Object.keys(currencyNames).map(code => ({code, name: currencyNames[code] ?? code}));
const ordered = [...popular.map(code => ({code, name: currencyNames[code] ?? code})),
  ...currencies.filter(item => !popular.includes(item.code)).sort((a, b) => a.name.localeCompare(b.name, 'en'))];

export function CurrencyField({label, value, onChange}: {label: string; value: string; onChange: (code: string) => void}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const filter = query.trim().toLowerCase();
  const matches = ordered.filter(({code,name}) => `${code} ${name}`.toLowerCase().includes(filter));
  return <View style={{gap: 7}}>
    <Text style={glass.label}>{label}</Text>
    <Pressable accessibilityRole="button" accessibilityLabel={label} style={glass.input} onPress={() => {Keyboard.dismiss(); setQuery(''); setOpen(true);}}>
      <Text style={{color: colors.ink}}>{value ? `${value} · ${currencyNames[value] ?? value}` : 'Choose currency'}  ⌄</Text>
    </Pressable>
    <Modal visible={open} animationType="slide" presentationStyle="fullScreen" onRequestClose={() => setOpen(false)}>
      <SafeAreaView style={{flex: 1, backgroundColor: '#f3f5ef'}}>
        <KeyboardAvoidingView style={{flex: 1, padding: 20, gap: 12}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <GlassButton title="Done" secondary onPress={() => setOpen(false)} />
          <Text accessibilityRole="header" style={{color: colors.ink, fontSize: 26, fontWeight: '700'}}>Choose currency</Text>
          <TextInput accessibilityLabel="Search currencies" placeholder="Search by name or code" autoCorrect={false} value={query} onChangeText={setQuery} style={glass.input} />
          <FlatList data={matches} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag" keyExtractor={item => item.code}
            ListEmptyComponent={<Text>No currencies found.</Text>}
            renderItem={({item, index}) => <View>
              {!filter && (index === 0 || index === popular.length) && <Text style={glass.label}>{index === 0 ? 'Popular' : 'All currencies'}</Text>}
              <Pressable accessibilityRole="button" accessibilityState={{selected: value === item.code}} style={{paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#dce1d8'}} onPress={() => {setOpen(false); onChange(item.code);}}>
                <Text style={{color: colors.ink, fontWeight: value === item.code ? '700' : '400'}}>{item.name} · {item.code}{value === item.code ? '  ✓' : ''}</Text>
              </Pressable>
            </View>} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  </View>;
}
