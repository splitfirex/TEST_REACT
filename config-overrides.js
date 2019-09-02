module.exports = function override(config, env) {

    config.module.rules.unshift({
        test: /\.worker\.ts$/,
        use: {loader: "sharedworker-loader"}
    });

 /*   config.module.rules.unshift({
        test: /\.svg$/,
        use: ['react-svg-loader']
    })*/


    config.output["globalObject"] = "this";
    return config;
}