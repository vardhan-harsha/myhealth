const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// 1. Watch all files within the monorepo
config.watchFolders = [workspaceRoot];

// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(workspaceRoot, 'node_modules'),
];

// 3. Force Metro to resolve (sub)dependencies from the `nodeModulesPaths`
// config.resolver.disableHierarchicalLookup = true;

// 4. Add extra node modules to resolve from (critical for pnpm)
const extraNodeModules = new Proxy(
    {},
    {
        get: (target, name) => {
            // Handle ~ alias by pointing to project root
            if (name === '~') {
                return projectRoot;
            }
            // Redirect all other module requests to the workspace root node_modules
            return path.join(workspaceRoot, `node_modules/${name}`);
        },
    }
);

config.resolver.extraNodeModules = extraNodeModules;

// 5. Enable Expo Router
config.resolver.unstable_enablePackageExports = true;

module.exports = withNativeWind(config, { input: './global.css' });
