import Constants from 'expo-constants';

export const getApiUrl = () => {
    try {
        const apiUrl = Constants.expoConfig?.extra?.apiUrl || 'http://localhost:3000';

        // If we're on a physical device and the URL is localhost, try to replace it with the machine's IP
        if (apiUrl.includes('localhost') && Constants.expoConfig?.hostUri) {
            const hostUri = Constants.expoConfig.hostUri; // e.g., "192.168.1.10:8081"
            const ip = hostUri.split(':')[0];
            const newUrl = apiUrl.replace('localhost', ip);
            console.log('🔄 Replaced localhost with host IP:', newUrl);
            return newUrl;
        }

        return apiUrl && apiUrl.startsWith('http') ? apiUrl : 'http://localhost:3000';
    } catch (error) {
        console.error('❌ Failed to get API URL from config:', error);
        return 'http://localhost:3000';
    }
};
