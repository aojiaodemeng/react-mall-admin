
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const theme = require('./package.json').theme;
module.exports = {
  entry: './src/app.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'js/app.js'
  },
  resolve: {
  	alias:{
  		page:path.resolve(__dirname,'src/page'),
  		layout:path.resolve(__dirname,'src/layout'),
		component:path.resolve(__dirname, 'src/component'),
		store:path.resolve(__dirname, 'src/store'),
		util:path.resolve(__dirname, 'src/util'),
	}
  },
  module: {
	rules: [
		// react（jsx）语法的处理
	  {
	    test: /\.jsx$/,
	    exclude: /(node_modules)/,
	    use: {
	      loader: 'babel-loader',
	      options: {
	        presets: ['env','react','stage-0'],
		    "plugins": [
				[
				  "import",
				  {
					"libraryName": "antd",
					"style": true
				  }
				]
			],
	      }
	    }
	  },
	  	//css的处理
	  {
	  	test: /\.css$/,
	    exclude: /node_modules|antd\.css/,
	  	use: ExtractTextPlugin.extract({
	  		fallback:'style-loader',
			use: "css-loader?modules&localIdentName=styles__[local]__[hash:base64:5]"
	  	}),
	  },
	  {
	  	test: /\.css$/,
	    include: /node_modules|antd\.css/,
	  	use: ExtractTextPlugin.extract({
	  		fallback:'style-loader',
	  		use: "css-loader"
	  	})
	  },
	   //scss的处理
	  {
	  	test: /\.scss$/,
	  	use: ExtractTextPlugin.extract({
	  		fallback:'style-loader',
	  		use:['css-loader','sass-loader']
	  	})
	  },
		//这里开启自己编写的less文件的css modules功能，除了node_modules库中的less
		//也就是可以过滤掉antd库中的样式
		{
          test: /\.less$/,
		  exclude: /node_modules/,
          use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader?modules&localIdentName=styles__[local]__[hash:base64:5]",
			  {
			  	loader: 'less-loader', options: {modifyVars: theme}
			  }
		  ]
        })
      },
		//less的处理，需要加入node_modules里面的样式，并且不开启css modules功能
		{
          test: /\.less$/,
          include: /node_modules/,
          use: ExtractTextPlugin.extract({
			  fallback: "style-loader",
			  use: ["css-loader",
				  {
					loader: 'less-loader', options: {modifyVars: theme}
				  }
			  ]
          })
        },
	  //图片的处理
	  {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
            	name:'resource/[name].[ext]'
            },
          },
        ],
      },
      //字体的处理
      {
        test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
            	name:'resource/[name].[ext]'
            },
          },
        ],
      }
	]
  },
  plugins: [
  	//处理html文件
  	new HtmlWebpackPlugin({
  		template:'./src/index.html'
  	}),
  	//独立css文件
  	new ExtractTextPlugin("css/[name].css"),
  	//提出公共模块
  	new webpack.optimize.CommonsChunkPlugin({
  		name:'common',
  		filename:'js/base.js'
  	}),
    new CleanWebpackPlugin(),
  ],
	devServer: {
  		host: 'localhost',
  		port: 8099,
		historyApiFallback: {
			index: '/dist/index.html'
		},
		proxy:{
		  '/manage' : {
			  target: 'http://admintest.happymmall.com',
			  changeOrigin : true
		  },
		  '/user/logout.do' : {
			  target: 'http://admintest.happymmall.com',
			  changeOrigin : true
		  }
		}
	}
};
