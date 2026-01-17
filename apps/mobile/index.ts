import { LogBox } from 'react-native';

// Ignore specific warnings
LogBox.ignoreLogs([
    'SafeAreaView has been deprecated',
]);

import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';

// Disable Reanimated strict mode to suppress "Reading from `value` during component render" warnings
configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false,
});

// IMPORTANT: This must be imported first to polyfill the URL global for tRPC
import 'react-native-url-polyfill/auto';

import 'expo-router/entry';
