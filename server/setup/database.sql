create table users (
	user_id bigserial not null,
	username character varying(30) not null,
	password character varying(128) not null,
	avatar character varying(128),

	primary key(user_id)
);

create table posts (
	post_id bigserial not null,
	user_id bigint references users(user_id),
	post character varying(500),
	posted_at character varying(128) not null,
	
	primary key(post_id) 
);