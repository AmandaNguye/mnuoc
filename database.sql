DROP DATABASE IF EXISTS MEANDUOFC;
CREATE DATABASE MEANDUOFC; 
USE MEANDUOFC;

CREATE TABLE ADMIN (
    username        VARCHAR(255) NOT NULL,
    password        VARCHAR(255) NOT NULL,
    email           VARCHAR(255) NOT NULL,
    PRIMARY KEY (username)
);
CREATE TABLE COMMUNITY (
	community_name   VARCHAR(255) NOT NULL,
    PRIMARY KEY (community_name)
);
CREATE TABLE MANAGEMENT (
	community_name   VARCHAR(255) NOT NULL,
    admin_username   VARCHAR(255) NOT NULL,
    FOREIGN KEY (community_name) REFERENCES COMMUNITY(community_name) ON UPDATE CASCADE,
    FOREIGN KEY (admin_username) REFERENCES ADMIN(username) ON UPDATE CASCADE
);
CREATE TABLE USER (
	username        VARCHAR(255) NOT NULL,
    password        VARCHAR(255) NOT NULL,
    email           VARCHAR(255) NOT NULL,
    major           VARCHAR(255) NOT NULL,
    PRIMARY KEY     (username)
);
CREATE TABLE PROFILE (
	username        VARCHAR(255) NOT NULL,
    url             VARCHAR(255) NOT NULL,
    bio             VARCHAR(255) NOT NULL,
    PRIMARY KEY (username),
    FOREIGN KEY (username) REFERENCES USER(username) ON UPDATE CASCADE
);
CREATE TABLE POST (
    post_id         INT unsigned NOT NULL AUTO_INCREMENT,
	title           VARCHAR(255) NOT NULL,
    text            VARCHAR(255) NOT NULL,
    username        VARCHAR(255) NOT NULL,
    community       VARCHAR(255) NOT NULL,
    time_created DATETIME NOT NULL,
    PRIMARY KEY (post_id),
    FOREIGN KEY (username) REFERENCES USER(username) ON UPDATE CASCADE,
    FOREIGN KEY (community) REFERENCES COMMUNITY(community_name) ON UPDATE CASCADE
);
CREATE TABLE IMAGE_POST (
	post_id         INT unsigned NOT NULL,
    image           VARCHAR(255) NOT NULL,
    PRIMARY KEY (post_id, image),
    FOREIGN KEY (post_id) REFERENCES POST(post_id) ON UPDATE CASCADE
);

CREATE TABLE POST_TAGS (
	post_id         INT unsigned NOT NULL,
    tag             VARCHAR(255) NOT NULL,
    PRIMARY KEY (post_id, tag),
    FOREIGN KEY (post_id) REFERENCES POST(post_id) ON UPDATE CASCADE
);

CREATE TABLE POST_LIKES (
	post_id         INT unsigned NOT NULL,
    username        VARCHAR(255) NOT NULL,
    PRIMARY KEY (post_id, username),
    FOREIGN KEY (post_id) REFERENCES POST(post_id) ON UPDATE CASCADE,
    FOREIGN KEY (username) REFERENCES USER(username) ON UPDATE CASCADE
);
CREATE TABLE POST_DISLIKES (
	post_id         INT unsigned NOT NULL,
    username        VARCHAR(255) NOT NULL,
    PRIMARY KEY (post_id, username),
    FOREIGN KEY (post_id) REFERENCES POST(post_id) ON UPDATE CASCADE,
    FOREIGN KEY (username) REFERENCES USER(username) ON UPDATE CASCADE
);
CREATE TABLE CLASSES_TAKING (
	username        VARCHAR(255) NOT NULL,
    class           VARCHAR(255) NOT NULL,
    PRIMARY KEY (username, class),
    FOREIGN KEY (username) REFERENCES USER(username) ON UPDATE CASCADE
);
CREATE TABLE IN_COMMUNITY (
    username        VARCHAR(255) NOT NULL,
	community_name  VARCHAR(255) NOT NULL,
    PRIMARY KEY (username, community_name),
    FOREIGN KEY (username) REFERENCES USER(username) ON UPDATE CASCADE,
    FOREIGN KEY (community_name) REFERENCES COMMUNITY(community_name) ON UPDATE CASCADE
);
CREATE TABLE COMMENT (
	comment_id      INT unsigned NOT NULL AUTO_INCREMENT,
	post_id         INT unsigned NOT NULL,
    text            VARCHAR(255) NOT NULL,
    username        VARCHAR(255) NOT NULL,
    time_created DATETIME NOT NULL,
    PRIMARY KEY (comment_id),
    FOREIGN KEY (post_id) REFERENCES POST(post_id) ON UPDATE CASCADE,
    FOREIGN KEY (username) REFERENCES USER(username) ON UPDATE CASCADE
);
CREATE TABLE COMMENT_LIKES (
	comment_id      INT unsigned NOT NULL,
    username        VARCHAR(255) NOT NULL,
    PRIMARY KEY (comment_id, username),
    FOREIGN KEY (comment_id) REFERENCES COMMENT(comment_id) ON UPDATE CASCADE,
    FOREIGN KEY (username) REFERENCES USER(username) ON UPDATE CASCADE
);
CREATE TABLE COMMENT_DISLIKES (
	comment_id      INT unsigned NOT NULL,
    username        VARCHAR(255) NOT NULL,
    PRIMARY KEY (comment_id, username),
    FOREIGN KEY (comment_id) REFERENCES COMMENT(comment_id) ON UPDATE CASCADE,
    FOREIGN KEY (username) REFERENCES USER(username) ON UPDATE CASCADE
);
CREATE TABLE CHATROOM (
	chat_id        INT unsigned NOT NULL AUTO_INCREMENT,
	title          VARCHAR(255) NOT NULL,         
    user1          VARCHAR(255) NOT NULL,
    user2          VARCHAR(255) NOT NULL,
    PRIMARY KEY (chat_id),
    FOREIGN KEY (user1) REFERENCES USER(username) ON UPDATE CASCADE,
    FOREIGN KEY (user2) REFERENCES USER(username) ON UPDATE CASCADE
);
CREATE TABLE MESSAGE (
	message_id      INT unsigned NOT NULL AUTO_INCREMENT,
	chat_id         INT unsigned NOT NULL,
    text            VARCHAR(255) NOT NULL,
    username        VARCHAR(255) NOT NULL,
    time_created DATETIME NOT NULL,
    PRIMARY KEY (message_id),
    FOREIGN KEY (chat_id) REFERENCES CHATROOM(chat_id) ON UPDATE CASCADE,
    FOREIGN KEY (username) REFERENCES USER(username) ON UPDATE CASCADE
);
