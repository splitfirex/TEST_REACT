module.exports = function override(config, env) {
    config.module.rules.unshift({
        test: /\.worker\.ts$/,
        use: {
            loader: "worker-loader"
        }
    })

    config.output["globalObject"] = "this";
    return config;
}