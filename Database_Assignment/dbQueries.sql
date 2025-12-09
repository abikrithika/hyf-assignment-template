--How many tasks are in the task table?--
select COUNT(*) from task

--How many tasks in the task table do not have a valid due date?--
select COUNT(*) from task where due_date IS NULL

--Find all the tasks that are marked as done.--
select title from task where status_id=3