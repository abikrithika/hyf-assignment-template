-- ============================================================
-- Week 2 Assignment — Databases

-- ============================================================
-- Part A
-- ============================================================

-- Part A, Question 1:

SELECT COUNT(*) FROM task;

-- Part A, Question 2:

SELECT user.name, COUNT(task.id)
FROM user
LEFT JOIN task ON user.id = task.user_id
GROUP BY user.id, user.name;

-- Part A, Question 3:

SELECT status.name, COUNT(task.id)
FROM status
LEFT JOIN task ON status.id = task.status_id
GROUP BY status.id, status.name;

-- Part A, Question 4:

SELECT user.name, COUNT(task.id) AS task_count
FROM user
LEFT JOIN task ON user.id = task.user_id
GROUP BY user.id
ORDER BY task_count DESC
LIMIT 1;

-- Part A, Question 5:

SELECT AVG(task_count)
FROM (
  SELECT COUNT(*) AS task_count
  FROM task
  GROUP BY user_id
);


-- Part A, Question 6:

SELECT MIN(due_date), MAX(due_date)
FROM task;

-- Part A, Question 7:

SELECT category.name, COUNT(task_category.task_id) AS total
FROM category
LEFT JOIN task_category ON category.id = task_category.category_id
GROUP BY category.id
ORDER BY total DESC;


-- Part A, Question 8:

SELECT user.name, COUNT(task.id) AS total
FROM user
JOIN task ON user.id = task.user_id
GROUP BY user.id
HAVING COUNT(task.id) > 2;

-- ============================================================
-- Part B
-- ============================================================

-- Part B.1:

-- If userName = ' OR '1'='1
-- The query becomes:
-- SELECT * FROM task WHERE user_id = (SELECT id FROM user WHERE name = '' OR '1'='1')
--
-- '1'='1' is always true, so the subquery returns all users.
-- This can expose unintended data and confirms the query is injectable.

-- Malicious input:
-- '; DELETE FROM task; --
--
-- This closes the string, runs DELETE, and comments out the rest.
-- Result: all tasks are deleted.

-- Part B.2:

-- Safe version using placeholders:

-- function getTasksByUser(userName) {
--   const query = `
--     SELECT * FROM task
--     WHERE user_id = (
--       SELECT id FROM user WHERE name = ?
--     )
--   `;
--   db.all(query, [userName], (err, rows) => console.log(rows));
-- }

-- This prevents SQL injection because user input is treated as data, not SQL code.

-- ============================================================
-- Part C
-- ============================================================

-- Part C, Question 1:

BEGIN TRANSACTION;

UPDATE task
SET user_id = 2  
WHERE user_id = 1; 

DELETE FROM user
WHERE id = 1;

COMMIT;

-- Part C, Question 2:

BEGIN TRANSACTION;

UPDATE task
SET user_id = 2
WHERE user_id = 1;


INSERT INTO task (title, status_id)
VALUES ('Broken Task', 9999);

ROLLBACK;

-- ============================================================
-- Part D
-- ============================================================

-- Part D, Question 1:

BEGIN TRANSACTION;

INSERT INTO category (name)
VALUES ('Urgent');

INSERT INTO task_category (task_id, category_id)
SELECT task.id, category.id
FROM task
JOIN status ON task.status_id = status.id
JOIN category ON category.name = 'Urgent'
WHERE status.name IN ('To Do', 'In Progress');

COMMIT;

-- If any error occurs, the transaction should be rolled back


-- Part D, Question 2:

SELECT
  (SELECT COUNT(*) FROM task) AS total_tasks,

  (SELECT COUNT(*)
   FROM task
   JOIN status ON task.status_id = status.id
   WHERE status.name = 'Done') AS completed_tasks,

  (SELECT COUNT(*)
   FROM task
   WHERE due_date < DATE('now')) AS overdue_tasks,

  (SELECT COUNT(DISTINCT user_id)
   FROM task) AS active_users;