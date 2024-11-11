import { envString, envNumber } from "@/__boot/environment";

export const config={
    http:{
        host:envString('HOST', 'localhost'),
        port: envNumber('PORT', 5000)
    },
    mongo: {
        host: envString('DB_HOST', 'mongodb://127.0.0.1:27017'),
        database: envString('DB_NAME', 'autovert'),
        username: envString('DB_USERNAME', 'mongo_username'),
        password: envString('DB_PASSWORD', 'mongo_password')
    },
    secrets: {
        access_token: envString('ACCESS_TOKEN_SECRET', 'testsecret'),
        refresh_token: envString('REFRESH_TOKEN_SECRET', 'testsecret'),
    },
    client:{
        clienturl:envString('CLIENT_URL','http://localhost:5173')
    }
}