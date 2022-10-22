-- +goose Up
-- model: message
CREATE TABLE IF NOT EXISTS `messages`(
  `id` BLOB NOT NULL,
  -- user_id represents the user ID in firebase.
  `user_id` BLOB NOT NULL,
  `title` TEXT NOT NULL,
  `body` TEXT NOT NULL,
  -- 2 options to hide the message: BY_TIME, and/or BY_VIEWS
  `hide_options` TEXT DEFAULT "BY_TIME" NOT NULL,
  `view_count` INTEGER DEFAULT 0 NOT NULL,
  -- TEXT type in date represents the ISO8601 format.
  -- more info on: https://www.sqlite.org/datatype3.html
  `created_at` TEXT NOT NULL,
  PRIMARY KEY (`id`),
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
