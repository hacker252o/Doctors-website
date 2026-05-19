// craco.config.js

const path = require("path");

require("dotenv").config();

/* ---------- Environment ---------- */

const isDevelopment =
  process.env.NODE_ENV !== "production";

/* ---------- Health Check ---------- */

const enableHealthCheck =
  process.env.ENABLE_HEALTH_CHECK === "true";

/* ---------- Optional Plugins ---------- */

let WebpackHealthPlugin;
let setupHealthEndpoints;
let healthPluginInstance;

if (enableHealthCheck) {
  try {

    WebpackHealthPlugin =
      require("./plugins/health-check/webpack-health-plugin");

    setupHealthEndpoints =
      require("./plugins/health-check/health-endpoints");

    healthPluginInstance =
      new WebpackHealthPlugin();

  } catch (error) {

    console.warn(
      "[health-check] Plugin not found."
    );
  }
}

/* ---------- Main Config ---------- */

let webpackConfig = {

  eslint: {
    configure: {
      extends: [
        "react-app",
        "react-app/jest",
      ],

      rules: {
        "react-hooks/rules-of-hooks":
          "error",

        "react-hooks/exhaustive-deps":
          "warn",
      },
    },
  },

  webpack: {

    alias: {
      "@": path.resolve(
        __dirname,
        "src"
      ),
    },

    configure: (
      config
    ) => {

      /* ---------- Watch Options ---------- */

      config.watchOptions = {
        ...(config.watchOptions || {}),

        ignored: [
          "**/node_modules/**",
          "**/.git/**",
          "**/build/**",
          "**/dist/**",
          "**/coverage/**",
        ],
      };

      /* ---------- Health Plugin ---------- */

      if (
        enableHealthCheck &&
        healthPluginInstance
      ) {
        config.plugins.push(
          healthPluginInstance
        );
      }

      return config;
    },
  },
};

/* ---------- Dev Server ---------- */

webpackConfig.devServer = (
  devServerConfig
) => {

  if (
    enableHealthCheck &&
    setupHealthEndpoints &&
    healthPluginInstance
  ) {

    const originalSetup =
      devServerConfig.setupMiddlewares;

    devServerConfig.setupMiddlewares =
      (
        middlewares,
        devServer
      ) => {

        if (originalSetup) {
          middlewares =
            originalSetup(
              middlewares,
              devServer
            );
        }

        setupHealthEndpoints(
          devServer,
          healthPluginInstance
        );

        return middlewares;
      };
  }

  return devServerConfig;
};

/* ---------- Emergent Visual Editing ---------- */

if (isDevelopment) {

  try {

    const {
      withVisualEdits,
    } = require(
      "@emergentbase/visual-edits/craco"
    );

    webpackConfig =
      withVisualEdits(
        webpackConfig
      );

  } catch (error) {

    if (
      error.code ===
        "MODULE_NOT_FOUND" &&
      error.message.includes(
        "@emergentbase/visual-edits/craco"
      )
    ) {

      console.warn(
        "[visual-edits] Package not installed."
      );

    } else {

      console.error(error);
    }
  }
}

/* ---------- Export ---------- */

module.exports =
  webpackConfig;