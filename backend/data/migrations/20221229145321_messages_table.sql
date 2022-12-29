-- +goose Up
-- model: Message
CREATE TABLE IF NOT EXISTS messages (
  id BLOB NOT NULL PRIMARY KEY,
  user_id BLOB NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  hide_options TEXT NOT NULL,
  view_count INTEGER DEFAULT 0 NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE INDEX messages_user_id_idx ON messages (user_id);
CREATE INDEX messages_title_idx ON messages (title);

-- +goose StatementBegin
SELECT 'up SQL query';
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';
-- +goose StatementEnd
