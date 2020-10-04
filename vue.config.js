module.exports={
    devServer:{
        open:true,
        port:8080,
        proxy:{
            "/knife":{
                target:"http://localhost:8089",
                changeOrigin:true,
                pathRewrite:{
                    '^/knife':''
                }
            }
        }
    }
}
