-- Enable foreign key support in SQLite
PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS bleets;
DROP TABLE IF EXISTS users;

-- Users Table
CREATE TABLE users (
    user_id TEXT PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Bleets Table
CREATE TABLE bleets (
    bleet_id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Likes Table
CREATE TABLE likes (
    like_id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    bleet_id TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (bleet_id) REFERENCES bleets(bleet_id)
);

-- Comments Table
CREATE TABLE comments (
    comment_id TEXT PRIMARY KEY,
    bleet_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    comment_text TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (bleet_id) REFERENCES bleets(bleet_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Notifications Table
CREATE TABLE notifications (
    notification_id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,            -- Recipient of the notification
    notification_type TEXT NOT NULL,
    bleet_id TEXT,                    -- Related bleet
    comment_id TEXT,                  -- Related comment
    like_id TEXT,                     -- Related like
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (bleet_id) REFERENCES bleets(bleet_id),
    FOREIGN KEY (comment_id) REFERENCES comments(comment_id),
    FOREIGN KEY (like_id) REFERENCES likes(like_id)
);
