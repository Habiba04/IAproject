create database Chat;
use Chat

create table messages (
id int primary key Identity, 
senderName varchar(100),
recieverName varchar(100),
content varchar(400),
senderID varchar(250),
recieverID varchar(250));

Drop table messages



	INSERT INTO messages ( senderName, recieverName, content, senderID, recieverID) VALUES
	( 'Alice', 'Bob', 'Hey Bob!', '101', '201'),
	( 'Charlie', 'Bob', 'Whats up?', '102', '201'),
	( 'Alice', 'Dave', 'Hello Dave', '101', '202'),
	( 'Eve', 'Bob', 'Hi there!', '103', '201'),
	( 'Charlie', 'Eve', 'Meeting at 5', '102', '203'),
	( 'Alice', 'Bob', 'Follow up...', '101', '201'),
	( 'Frank', 'Bob', 'Ping!', '104', '201'),
	( 'Eve', 'Dave', 'Quick update', '103', '202'),
	( 'Alice', 'Eve', 'Checking in', '101', '203'),
	( 'Frank', 'Eve', 'All good?', '104', '203');


CREATE FUNCTION GetDistinctSenders (@receiverID VARCHAR(255))
RETURNS TABLE
AS
RETURN
(
    SELECT DISTINCT senderID, senderName
    FROM messages
    WHERE recieverID = @receiverID
);

SELECT * FROM GetDistinctSenders('201');

CREATE FUNCTION GetMessages (@receiverID varchar(250), @senderID varchar(250))
RETURNS TABLE
AS
RETURN
(
    SELECT *
    FROM messages
    WHERE (recieverID = @receiverID and senderID = @senderID) or (recieverID = @senderID and senderID = @receiverID)
);

drop function GetMessages

truncate table messages

SELECT * FROM GetMessages('201','104');