function runSequentially(tasks, finalCallback) {
  let index = 0;

  function runNext() {
    if (index === tasks.length) {
      finalCallback();
      return;
    }

    const task = tasks[index];

    index++;

    task(() => {
      runNext();
    });
  }

  runNext();
}

const tasks = [
  (done) =>
    setTimeout(() => {
      console.log("Task 1");
      done();
    }, 300),

  (done) =>
    setTimeout(() => {
      console.log("Task 2");
      done();
    }, 200),

  (done) =>
    setTimeout(() => {
      console.log("Task 3");
      done();
    }, 100),
];

runSequentially(tasks, () => {
  console.log("All tasks complete!");
});
