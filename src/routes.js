/******************************************************************************
 * @file:	routes.js
 * @brief:	Trate the routes of API
 * @author:	Nathan Melegari
 * @date:	11-15-2025
 * @version:	1.2
******************************************************************************/



import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import mysql from 'mysql2/promise';
import pool from './database_connection.js';

const app = express();
app.use(express.json());


/*GET INFORMATIONS WITH CLIENT ID*/
app.get('/get-client/:clientId', async (req, res) => {

	const { clientId } = req.params;

	try {
		let conn = await pool.getConnection();

		const [rows] = await conn.query(
			"SELECT * FROM client WHERE clientid = ?", [clientId]
		);

		conn.release();

		if(rows.lenght === 0) {
			return
			res.status(404).json({ message: "Client not founded!" });
		}

		res.json(rows[0]);
	}
	catch(err) {
		console.error(`Don't be possible choose the client: ${err}`);
		res.status(500).json({ message: "Error" });
	}

});

/*REGISTER CLIENT ON DATABASE*/
app.post('/register-client', async (req, res) => {

	try {
		let conn = await pool.getConnection();

		const { clientName, clientEmail, clientPassword } = req.body;
		const clientId = uuidv4();

		const [row] = await conn.query(
			"INSERT INTO client (clientid, clientname, clientemail, clientpassword) VALUES (?, ?, ?, ?)", [clientId, clientName, clientEmail, clientPassword]
		);

		console.log('Database is running!');
		return res.json({

			"clientid": `${clientId}`,
			"clientname": `${clientName}`,
			"clientemail": `${clientEmail}`,
			"clientpassword": `${clientPassword}`
		});
	}
	catch(err) {
		console.error(`Don't be possible run db: ${err}`);
	}
});


/*EDIT ESPECIFIC CLIENT*/
app.put('/edit-client/:clientId', async (req, res) => {

	const { clientId } = req.params;
	const { clientName, clientEmail, clientPassword } = req.body;

	try {
		let conn = await pool.getConnection();

		const [rows] = await conn.query(
			"UPDATE client SET clientname = ?, clientemail = ?, clientpassword = ? WHERE clientid = ?", [clientName, clientEmail, clientPassword, clientId]
		);

		conn.release();

		if(rows.affectedRows === 0) {
			return
			res.status(404).json({ message: "Client not founded!" });
		}

		res.json({ message: "Client UPDATED with success!" });
	}
	catch(err) {
		console.error(`Error to require client: ${err}`);
		res.status(500).json({ message: "Error" });
	}
});


/*DELETE ESPECIFIC CLIENT*/
app.delete('/delete-client/:clientId', async (req, res) => {

	const { clientId } = req.params;

	try {
		let conn = await pool.getConnection();

		const [rows] = await conn.query(
			"DELETE FROM client WHERE clientId = ?", [clientId]
		);

		conn.release();

		if(rows.affectedRows === 0) {
			return
			res.status(404).json({ message: "Client not founded!" });
		}

		res.json({ message: "Client DELETED with success!" });
	}
	catch(err) {
		console.error(`Error to require client: ${err}`);
		res.status(500).json({ message: "Error" });
	}
});

export default app;
