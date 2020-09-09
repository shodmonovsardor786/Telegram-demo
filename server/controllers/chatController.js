const { query } = require('../pool')	
const sha1 = require('sha1')

exports.ChatGetController = async (req, res) => { 
	const post = await query('select * from posts natural join users order by post_id desc')
	res.render('chat', { post })
}

exports.ChatPostController = async (req, res) => {
	const {username, newPost, newDate} = req.body
	const [ user ]= await query('select * from users where username = $1', username)
	if(user) {
		let  [ row ] = await query(
			`insert into posts (user_id, post, posted_at) values ($1, $2, $3) returning *`,
			user.user_id, newPost, newDate)
		res.json({	error: false, message: 'created', data:  { user, post: row }})
	}
	else {	res.json({	error: false, message: 'ok', data:{} })	}
}