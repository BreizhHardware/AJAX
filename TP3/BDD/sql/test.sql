SELECT name FROM channels;

SELECT nickname, message, timestamp FROM users JOIN messages ON users.login = messages.userlogin WHERE messages.channelid = 1;

INSERT INTO messages (userlogin, channelid, message) VALUES ('etudiant0', 1, 'Vive Star Citizen !');

SELECT * FROM messages;