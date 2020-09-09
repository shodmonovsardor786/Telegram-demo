;(async () => {

	const userStorage = localStorage.getItem('user') || '{}'
	const user = JSON.parse(userStorage)
	const socket = io('http://localhost:4000/') 

	if(!user.username) { window.location.pathname = '/' } 

	const account = document.querySelector('.account')
	const accountImg = document.querySelector('.account_img')
	const accountUsername = document.querySelector('.account_username')
	const logOutBtn = document.querySelector('.logOutBtn')
	const typing = document.querySelector('.typing')
	const form = document.querySelector('.form')
	const posts = document.querySelector('.posts')
	const li = document.querySelectorAll('.one_post')
	const spanUsername = document.querySelectorAll('.username')
	const postInput = document.querySelector('.postInput')
	const date = new Date();	const hour = date.getHours();	const minut = date.getMinutes();	
	const newDate = hour + ':' + minut


	// if(user.avatar != null) {
	// 	accountImg.setAttribute('src', 'images/' + user.avatar)
	// }
	
	accountUsername.textContent = user.username


	li.forEach(l => {
		spanUsername.forEach(e => {
			if (e.textContent == user.username) {
				e.parentElement.parentElement.classList.add('my')
			}
		})
	})

	logOutBtn.onclick = () => {
		window.localStorage.removeItem('user')
		window.localStorage.removeItem('access_token')
		window.location.pathname = '/'
	}
	postInput.onkeyup = e => {	socket.emit('typing', {username: user.username})	}


	form.addEventListener('submit', async e => {
		e.preventDefault()

		if(postInput.value.trim().length) {
			const response = await fetch('http://localhost:4000/chat', 
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json'	}, 
				body: JSON.stringify(
				{ 
					username: user.username,	
					newPost: postInput.value.trim() ,
					newDate: newDate,
				}) 
			})

			const newPost = document.createElement('li')
			const userNameSpan = document.createElement('span')
			const postSpan = document.createElement('span')
			const timeSpan = document.createElement('span')
			const postWrapper = document.createElement('div')
			const div = document.createElement('div')

			userNameSpan.textContent = user.username
			postSpan.textContent = postInput.value
			timeSpan.textContent = newDate

			postSpan.classList.add('username_post')
			timeSpan.classList.add('time')
			postWrapper.classList.add('one_post__post')
			newPost.classList.add('one_post', 'my')

			div.appendChild(postSpan)
			div.appendChild(timeSpan)
			postWrapper.appendChild(div)
			newPost.appendChild(postWrapper)
			posts.insertBefore(newPost, posts.firstElementChild)

			socket.emit('new_message', 
			{  
				username: user.username,	
				newPost: postInput.value.trim(),
				date: newDate, 
				avatar: user.avatar 
			})
			form.reset()
		}

	})

	socket.on('typing', data => {
		typing.textContent = data.username + ' is typing...'	
	})

	socket.on('new_message', async data => {
		typing.innerText = ' '
		typing.hidden = true

		const newPost = document.createElement('li')
		const userNameSpan = document.createElement('span')
		const postSpan = document.createElement('span')
		const timeSpan = document.createElement('span')
		const postWrapper = document.createElement('div')
		const div = document.createElement('div')
		const img = document.createElement('img')

		userNameSpan.textContent = data.username
		postSpan.textContent = data.newPost
		timeSpan.textContent = data.date

		userNameSpan.classList.add('username')
		postSpan.classList.add('username_post')
		timeSpan.classList.add('time')
		newPost.classList.add('one_post')
		postWrapper.classList.add('one_post__post')
		img.setAttribute('src', 'images/' + data.avatar )
		img.classList.add('user_photo')

		newPost.appendChild(img)
		div.appendChild(postSpan)
		div.appendChild(timeSpan)
		postWrapper.appendChild(userNameSpan)
		postWrapper.appendChild(div)
		newPost.appendChild(postWrapper)
		posts.insertBefore(newPost, posts.firstElementChild)

	})
})()