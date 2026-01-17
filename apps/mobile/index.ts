import { LogBox } from 'react-native';

// Ignore specific warnings
LogBox.ignoreLogs([
    'SafeAreaView has been deprecated',
]);

// IMPORTANT: This must be imported first to polyfill the URL global for tRPC
import 'react-native-url-polyfill/auto';

import 'expo-router/entry';
