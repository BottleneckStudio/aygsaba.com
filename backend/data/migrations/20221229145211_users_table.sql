-- +goose Up
-- model: User
CREATE TABLE IF NOT EXISTS users (
  id BLOB NOT NULL PRIMARY KEY,
  email TEXT NOT NULL,
  avatar TEXT,
  created_at TEXT NOT NULL,
  UNIQUE(email)
);

-- +goose StatementBegin
SELECT 'up SQL query';
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';
-- +goose StatementEnd
