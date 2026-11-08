const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const config = getDefaultConfig(__dirname);
// Shared financial calculations live outside the Expo package.
config.watchFolders = [
  path.resolve(__dirname, "../shared"),
  path.resolve(__dirname, "../server/config"),
];
config.resolver.nodeModulesPaths = [path.resolve(__dirname, "node_modules")];
module.exports = config;
