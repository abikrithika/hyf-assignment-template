-- Part 1, Q1 
INSERT INTO user (name, email, phone)
VALUES ('Abirame', 'abikrithika@gmail.com', '1234567890');

SELECT * FROM user;
SELECT * FROM status;

-- Part 1, Q2 (Insert task)
INSERT INTO task (title, description, created, updated, due_date, status_id)
VALUES (
  'Learn SQL',
  'Practice database queries',
  datetime('now'),
  datetime('now'),
  datetime('now', '+7 days'),
  (SELECT id FROM status WHERE name = 'In Progress' LIMIT 1)
);

SELECT * FROM task;

-- Assign task to user
INSERT INTO user_task (user_id, task_id)
VALUES (
  (SELECT id FROM user WHERE email = 'abikrithika@gmail.com' LIMIT 1),
  (SELECT id FROM task WHERE title = 'Learn SQL' LIMIT 1)
);

SELECT * FROM user_task;

-- Part 1, Q3
UPDATE task
SET 
  title = 'Master SQL Basics',
  updated = datetime('now')
WHERE title = 'Learn SQL';

-- Part 1, Q4
UPDATE task
SET 
  due_date = datetime('now', '+14 days'),
  updated = datetime('now')
WHERE title = 'Master SQL Basics';

-- Part 1, Q5
UPDATE task
SET 
  status_id = (SELECT id FROM status WHERE name = 'Done' LIMIT 1),
  updated = datetime('now')
WHERE title = 'Master SQL Basics';

-- Part 1, Q6
-- First delete from user_task to avoid orphan records
DELETE FROM user_task
WHERE task_id = 1;

DELETE FROM task
WHERE id = 1; 

-- Part 2, Q1 (Use LEFT JOIN instead of NOT EXISTS)
SELECT u.*
FROM user u
LEFT JOIN user_task ut ON u.id = ut.user_id
WHERE ut.user_id IS NULL;

-- Part 2, Q2
SELECT t.*
FROM task t
JOIN status s ON t.status_id = s.id
WHERE s.name = 'Done';

-- Part 2, Q3
SELECT *
FROM task
WHERE due_date < datetime('now');

-- Part 3, Q1 (Keep only ONE priority column definition)
ALTER TABLE task
ADD COLUMN priority TEXT DEFAULT 'Medium'
CHECK(priority IN ('Low', 'Medium', 'High'));

-- Part 3, Q2
UPDATE task SET priority = 'High' WHERE id = 1;
UPDATE task SET priority = 'Medium' WHERE id = 2;
UPDATE task SET priority = 'Low' WHERE id = 3;

-- Part 3, Q3
CREATE TABLE category (
  id INTEGER PRIMARY KEY,
  name TEXT,
  color TEXT
);

-- Part 3, Q4
CREATE TABLE task_category (
  task_id INTEGER,
  category_id INTEGER,
  FOREIGN KEY (task_id) REFERENCES task(id),
  FOREIGN KEY (category_id) REFERENCES category(id)
);

-- Part 3, Q5
INSERT INTO category (name, color) VALUES ('Work', 'red');
INSERT INTO category (name, color) VALUES ('Personal', 'blue');
INSERT INTO category (name, color) VALUES ('Study', 'green');

-- Part 3, Q6
INSERT INTO task_category (task_id, category_id) VALUES (1, 1);
INSERT INTO task_category (task_id, category_id) VALUES (2, 2);
INSERT INTO task_category (task_id, category_id) VALUES (3, 3);
INSERT INTO task_category (task_id, category_id) VALUES (4, 1);
INSERT INTO task_category (task_id, category_id) VALUES (5, 2);

-- Part 4, Q1
SELECT t.*
FROM task t
JOIN task_category tc ON t.id = tc.task_id
JOIN category c ON tc.category_id = c.id
WHERE c.name = 'Work';

-- Part 4, Q2
SELECT *
FROM task
ORDER BY 
  CASE priority
    WHEN 'High' THEN 1
    WHEN 'Medium' THEN 2
    WHEN 'Low' THEN 3
  END,
  due_date ASC;

-- Part 4, Q3
SELECT c.name, COUNT(*) AS task_count
FROM category c
JOIN task_category tc ON c.id = tc.category_id
GROUP BY c.id
ORDER BY task_count DESC
LIMIT 1;

-- Part 4, Q4
SELECT t.*
FROM task t
JOIN status s ON t.status_id = s.id
WHERE t.priority = 'High'
AND s.name IN ('In Progress', 'To Do');

-- Part 4, Q5
SELECT u.name
FROM user u
JOIN user_task ut ON u.id = ut.user_id
JOIN task_category tc ON ut.task_id = tc.task_id
GROUP BY u.id
HAVING COUNT(DISTINCT tc.category_id) > 1;