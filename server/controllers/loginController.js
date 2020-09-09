const { query } = require('../pool')	
const sha1 = require('sha1')
const { sign, verify } = require('jsonwebtoken')
const JWT_SECRET ='secretcode'

module.exports.LoginGetController = (req, res) => { res.render('login') }
module.exports.LoginPostController = async (req, res) => {
	
	const {username, password} = req.body
	const [ user ] = await query('select * from users where username = $1 and password = $2', username, sha1(password))
	try {
		if (user) {
			res.json({	message: 'OK waiting...', error: null, data: user, access_token: sign(user, JWT_SECRET) })
		} 
		else {	throw new Error('Wrong Username or Password :(' )}
	}
	catch(error) {
		res.json({	message: error.message, error: true, data: null, status: 403 })
	}
}