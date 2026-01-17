require('dotenv').config({
    path: process.env.APP_ENV === 'production'
        ? '.env.production'
        : process.env.APP_ENV === 'preview'
            ? '.env.preview'
            : '.env.development'
});

module.exports = {
    "expo": {
        "name": "helix",
        "slug": "helix",
        "version": "1.0.0",
        "orientation": "portrait",
        "icon": "./assets/icon.png",
        "userInterfaceStyle": "light",
        "newArchEnabled": true,
        "splash": {
            "image": "./assets/splash-icon.png",
            "resizeMode": "contain",
            "backgroundColor": "#ffffff"
        },
        "ios": {
            "supportsTablet": true
        },
        "android": {
            "adaptiveIcon": {
                "foregroundImage": "./assets/adaptive-icon.png",
                "backgroundColor": "#ffffff"
            }
        },
        "web": {
            "favicon": "./assets/favicon.png",
            "bundler": "metro"
        },
        "extra": {
            "apiUrl": process.env.API_URL || "http://localhost:3000",
            "environment": process.env.APP_ENV || "development",
            "eas": {
                "projectId": "d01ce14a-09e2-46e0-b607-58443887b694"
            }
        }
    }
};
