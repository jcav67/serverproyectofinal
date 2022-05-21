
module.exports ={

    database:{
        host: process.env.MYSQL_ADDON_HOST,
        port: process.env.MYSQL_ADDON_PORT,
        user: process.env.MYSQL_ADDON_USER,
        password: process.env.MYSQL_ADDON_PASSWORD,
        database: process.env.MYSQL_ADDON_DB,
        insecureAuth : true
    }
}


// module.exports ={

//     database:{
//         host: 'localhost',
//         port: 3306,
//         user: 'root',
//         password: 'Camilo67.com',
//         database: 'minerosbd',
//         insecureAuth : true
//     }
// }


//descomentar el código para usarlo de forma local / remota