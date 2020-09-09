const { query } = require('../pool')	
const sha1 = require('sha1')
const { sign } = 'jsonwebtoken'
const JWT_SECRET = 'secretcode'

module.exports.CreateGetController = (req, res) => { res.render('create') }
module.exports.CreatePostController = async (req, res) => {
	const {username, password } = req.body
	const users = await query('select * from users')
	const haveUsername = await users.find(u => u.username == username)
	const [ user ] = await query('select * from users where username = $1 and password = $2', username, sha1(password))
	try {
		if(user) {	throw new Error('You have an account')	} 
		else if(haveUsername) {	throw new Error('Username has already declareded')	}
		else {
			const [user] = await query(`insert into users (username, password) values ($1, $2) returning username, user_id`,
				username, sha1(password))
			res.json({message: 'Created :)', status: 201, data: user, access_token: sign(user, JWT_SECRET)})
		}
	} 
	catch(error) {
		res.json({message: error.message, status: 403, error: true, data: null})
	}	
}