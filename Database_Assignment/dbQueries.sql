--How many tasks are in the task table?--
select COUNT(*) from task

--How many tasks in the task table do not have a valid due date?--
select COUNT(*) from task where due_date IS NULL

--Find all the tasks that are marked as done.--
select * from task where status_id=3

--Find all the tasks that are not marked as done.--
select title from task where status_id!=3

--Get all the tasks, sorted with the most recently created first.--
select title from task ORDER BY created DESC

--Get the single most recently created task.--
select title from task ORDER BY created DESC LIMIT 1

--Get the title and due date of all tasks where the title or description contains database.--
select title,due_date from task where title LIKE '%database%' OR description LIKE '%database%'

--Get the title and status (as text) of all tasks.--
select task.title, status.name from task JOIN status ON task.status_id=status.id

--Get the name of each status, along with a count of how many tasks have that status.--
select status.name, COUNT(task.id) from status JOIN task ON status.id=task.status_id GROUP BY status.name

--Get the names of all statuses, sorted by the status with most tasks first.--
select status.name, COUNT(task.id) AS task_count from status JOIN task ON status.id=task.status_id
GROUP BY status.name
ORDER BY task_count  DESC