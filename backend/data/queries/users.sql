-- name: CreateUser :one
INSERT INTO users (id, email, created_at)
VALUES (?, ?, ?)
RETURNING *;

-- name: GetUser :one
SELECT * FROM users
WHERE id = ? LIMIT 1;

-- name: ListUsers :many
SELECT * FROM users
ORDER BY created_at DESC;

-- name: DeleteUser :exec
DELETE FROM users
WHERE id = ?;

-- name: UpdateAvatar :one
UPDATE users
SET avatar = ?
WHERE id = ? AND email = ?
RETURNING *;
