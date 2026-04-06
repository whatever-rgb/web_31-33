import db from '../db/db.js'

// Ищет пользователя по email, возвращает запись или null
export async function findUserByEmail(email) {
	const query = db.prepare('SELECT * FROM users WHERE email = ?')
	return query.get(email) || null
}

// Создаёт нового пользователя, возвращает id новой записи
export async function createUser(email, passwordHash, role) {
	const query = db.prepare(
		'INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)',
	)
	const result = query.run(email, passwordHash, role)
	return result.lastInsertRowid
}

// Ищет пользователя по id, возвращает запись или null
export async function findUserById(id) {
	const query = db.prepare(
		'SELECT id, email, role, created_at, last_login FROM users WHERE id = ?',
	)
	return query.get(id) || null
}

// Возвращает список всех пользователей без чувствительных данных
export async function getAllUsers() {
	const query = db.prepare(
		'SELECT id, email, role, created_at, last_login FROM users',
	)
	return query.all()
}

// Сохраняет хеш refresh-токена в базу с привязкой к пользователю и сроком жизни
export async function saveRefreshToken(userId, tokenHash, expiresAt) {
	const query = db.prepare(
		'INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES (?, ?, ?)',
	)
	query.run(userId, tokenHash, expiresAt)
}

// Ищет запись refresh-токена по его хешу, возвращает объект или null
export async function findRefreshToken(tokenHash) {
	const query = db.prepare('SELECT * FROM refresh_tokens WHERE token_hash = ?')
	return query.get(tokenHash) || null
}

// Удаляет конкретный refresh-токен по его хешу
export async function deleteRefreshToken(tokenHash) {
	const query = db.prepare('DELETE FROM refresh_tokens WHERE token_hash = ?')
	query.run(tokenHash)
}

// Удаляет все refresh-токены пользователя (выход со всех устройств)
export async function deleteAllRefreshTokensForUser(userId) {
	const query = db.prepare('DELETE FROM refresh_tokens WHERE user_id = ?')
	query.run(userId)
}
