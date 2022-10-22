-- +goose Up
-- model: user
CREATE TABLE IF NOT EXISTS `users` (
  `id` BLOB NOT NULL,
  `email` TEXT NOT NULL,
  `avatar` BLOB NOT NULL,
  `created_at` TEXT NOT NULL,
  PRIMARY KEY (`id`)
);

-- +goose StatementBegin
SELECT 'up SQL query';
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';
-- +goose StatementEnd
