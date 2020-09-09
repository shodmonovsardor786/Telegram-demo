;(async () => {

	const userStorage = localStorage.getItem('user') || '{}'
	const user = JSON.parse(userStorage)
	if(user.username) { window.location.pathname = '/chat'	}
	
	const form = document.getElementById('form')
	const username = document.getElementById('username')
	const password = document.getElementById('password')
	const message = document.getElementById('message')

	form.addEventListener('submit', async e => {
		e.preventDefault()
		try {
			if(username.value.trim().length && password.value.trim().length){
				const fetchResponse = await fetch('http://localhost:4000/create', 
					{
						method: 'POST',
						headers: { 'Content-Type': 'application/json'}, 
						body: JSON.stringify(
						{ 
							username: username.value,	
							password: password.value 
						}) 
					})
				const response = await fetchResponse.json()
				message.textContent = response.message

				if (!response.error) {
					window.localStorage.setItem('access_token', response.access_token)
					window.localStorage.setItem('user', JSON.stringify(response.data))
					setTimeout(() => {  window.location.pathname = '/chat' }, 2000)
				} 
				else { throw new Error	}
			}
		} 
		catch(e) {  console.log(e);	  }
        finally  {  e.target.reset()  }
	})
})()