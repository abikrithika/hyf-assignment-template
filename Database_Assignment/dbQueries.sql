--How many tasks are in the task table?--
select COUNT(*) from task

--How many tasks in the task table do not have a valid due date?--
select COUNT(*) from task where due_date IS NULL

--Find all the tasks that are marked as done.--
select title from task where status_id=3

--Find all the tasks that are not marked as done.--
select title from task where status_id IN(1,2)

--Get all the tasks, sorted with the most recently created first.--
select title from task ORDER BY created DESC

--Get the single most recently created task.--
select title from task ORDER BY created DESC LIMIT 1

--Get the title and due date of all tasks where the title or description contains database.--
select title from task where title LIKE '%database%' OR description LIKE '%database%'

--Get the title and status (as text) of all tasks.--
select task.title, status.name from task JOIN status ON task.status_id=status.id