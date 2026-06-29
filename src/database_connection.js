import mysql from 'mysql2/promise';

const pool = mysql.createPool({

	host: 'localhost',
	port: '3306',
	user: 'root',
	password: 'senha123',
	database: 'test',
	connectionLimit: 5
});

export default pool;
