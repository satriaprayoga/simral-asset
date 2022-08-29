const autoprefixer = require('autoprefixer');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path=require('path');
const tailwindcss=require('tailwindcss');

module.exports={
    entry:{
        popup:'./src/popup.js',
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js',
    },
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use:{
                    loader:'babel-loader',
                    options: {
                        presets:['@babel/preset-env','@babel/preset-react']
                    }
                }
            },
            {
                use:['style-loader','css-loader', {
                    loader:'postcss-loader',
                    options:{
                        postcssOptions:{
                            ident:'postcss',
                            plugins:[tailwindcss,autoprefixer]
                        }
                    }
                }],
                test: /\.css$/,
            }
        ],
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/popup.html',
            filename:'popup.html'
        }),
        new CopyPlugin({
            patterns:[
                {from:"public"}
            ]
        })]
        
};