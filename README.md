# fortune-cookie-backend

The backend for the fortune-cookie frontend. Receives http requests from frontend and contacts the mysql database providing the response back to the frontend. 

For the mysql credentials, create a file name dbConfig.js with the following:

exports.host = '' 
exports.user = '';
exports.password = '';
exports.database = '';
exports.table = '';
exports.tableAttribute = '';
