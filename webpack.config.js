let path = require('path');

//导入css分离插件
let MiniCssExtractPlugin = require('mini-css-extract-plugin');

//导入处理HTML插件
let HTML_WEBPACK_PLUGIN=require('html-webpack-plugin');

//创建一个分离css实例
let miniCssExtractPlugin = new MiniCssExtractPlugin({
    //输出css名称
    filename: '[name][hash].css'
})

//创建处理HTML模板实例
let htmlWebpackPlugin=new HTML_WEBPACK_PLUGIN({
    //模板路径
    template:'./index.html',

    //打包脚本注入方式
    //true：将打包输出的脚本添加到body结束标签之前
    //false：不添加打包脚本
    //head：将打包输出的脚本添加到head结束标签之前
    //body：将打包输出的脚本添加到body结束标签之前
    inject:true,

    //压缩配置
    minify:{
        //去除注释
        removeComments:true,
        //移除标签属性的引号
        removeAttributeQuotes:true,
        //去除空白符
        collapseWhitespace:true
    },

    //输出文件名
    filename:'index.html'
})

module.exports = {
    //模式
    mode: 'development',

    //入口
    entry: {
        index: ['./js/index.js']
    },

    //出口
    output: {

        path: path.resolve(__dirname, 'public'),

        filename: '[name].js'
    },

    //模块
    module: {
        //定义loader解析规则

        rules: [
            //css-loader
            {
                test: /\.css$/,
                use: [
                    // {loader:'style-loader'},

                    //分离css
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },

            //less-loader

            {
                test: /\.less$/,
                use: [
                    // {loader:'style-loader'},

                    //分离css
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            },

            //url-loader
            {
                test: /\.(png|gif|jpg|jpeg|webp)$/,
                use: [{
                    loader: 'url-loader',
                    //指定图片转为base64码的范围，单位为B
                    options: {
                        limit: 10240,
                         //处理图片时，不返回对象结构，而是返回解析图片后的一个字符串
                        esModule:false
                    }
                }]
            },

            //html-withimg-loader
            {
                test:/\.html?$/,
                use:[
                    {loader:'html-withimg-loader'}
                ]
            }
        ]
    },

    //插件
    plugins: [
        //分离css插件
        miniCssExtractPlugin,
        htmlWebpackPlugin
    ],

    //本地服务器配置
    devServer:{
        //服务器ip
        host:'localhost',

        //监听窗口
        port:9001,

        //自动打开浏览器
        // open:true,

        //编译过程显示百分比

        progress:true,

        //webpack本地服务器路由

        before(js){
            //路由实例
            js.get('/pros',(req,res)=>{

                //req:请求对象
                //res:响应对象

                res.json({name:'webpack本地服务器',status:'ok'});
            })
        }
    }


}