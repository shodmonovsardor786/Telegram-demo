const { query } = require('../pool')	
const sha1 = require('sha1')

const express = require('express')
const app = express()

module.exports.EditGetController = (req, res) => { res.render('edit') }

module.exports.EditPostController =  async(req, res) => {
	
	try	{
		const { user_id, newUsername, newPassword } = req.body
		
		if(newUsername != undefined && newPassword != undefined) {
			const [ username ] = await query('select * from users where username = $1', newUsername)
			if (username) {
				throw new Error( 'Username has already declareted' )
			}
			else {
				const [ row ] = await query('update users set username = $1, password = $2 where user_id = $3 returning *',
				newUsername, sha1(newPassword), user_id)
				res.json({ message: 'Updated', data: row })
			}
		}
		else {
			if(newUsername != undefined) {
				const [ username ] = await query('select * from users where username = $1', newUsername)
				if (username) {
					throw new Error( 'Username has already declareted' )
				}
				else {
					const [ row ] = await query('update users set username = $1 where user_id = $2 returning *',
					newUsername,  user_id)
					res.json({ message: 'Updated Username', data: row })
				}	
			}
			else if(newPassword != undefined) {
				const [ row ] = await query('update users set password = $1 where user_id = $2 returning *',
				sha1(newPassword),  user_id)
				res.json({ message: 'Updated Password', data: row })
			}	
		}
	}
	catch(error) {
		res.json({message: error.message, status: 403, error: true, data: null})
	}
}

module.exports.EditImgPostController = async (req, res) => {
	
	// const file = req.files.img
	// try {
	// 	if (file) {
	// 		// console.log(file);
	// 		// res.send('ok')
	// 		// console.log(req.body)
	// 		file.mv('../client/images/' + file.name)
	// 		const  [ row ] = await query('update users set avatar = $1 where username = $2 returning *', file.name, username)
	// 	}
	// 	// res.send('ok')
	// 	else if(file == null) {
	// 		throw new Error (`Image don't selected`)
	// 	}
	// }
	// catch (error) {
	// 	console.log(error);
	// 	res.json({message: error.message, status: 403, error: true, data: {}})
	// }
}
