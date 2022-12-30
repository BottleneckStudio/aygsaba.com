-- name: CreateMessage :one
INSERT INTO messages (id, user_id, title, body, hide_options, view_count, created_at)
VALUES (?, ?, ?, ?, ?, ?, ?)
RETURNING *;

-- name: GetMessage :one
SELECT * FROM messages
WHERE id = ? LIMIT 1;

-- name: GetUserMessage :one
SELECT * FROM messages
WHERE user_id = ? AND id = ?
LIMIT 1;

-- name: ListMessages :many
SELECT * FROM messages
ORDER BY created_at DESC;

-- name: GetUserMessages :many
SELECT * FROM messages
WHERE user_id = ?
ORDER BY created_at DESC;

