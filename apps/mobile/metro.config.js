const { getDefaultConfig } = require('expo/metro-config');
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
config.resolver.disableHierarchicalLookup = true;

// 4. Add extra node modules to resolve from (critical for pnpm)
config.resolver.extraNodeModules = new Proxy(
    {},
    {
        get: (target, name) => {
            // Redirect all module requests to the workspace root node_modules
            return path.join(workspaceRoot, `node_modules/${name}`);
        },
    }
);

module.exports = config;
