//Student Manager
const class07Students = [];

function addStudentToClass(studentName) {
  if (!studentName) {
    console.log("You cannot add an empty name to the class ");
    return;
  }

  if (class07Students.includes(studentName)) {
    console.log(`Student ${studentName} is already in the class`);
    return;
  }
  if (studentName === "Queen") {
    class07Students.push(studentName);
    return;
  }
  if (class07Students.length >= 6) {
    console.log("Cannot add more students to class 07");
    return;
  }
  class07Students.push(studentName);
}

function getNumberOfStudents() {
  return class07Students.length;
}
addStudentToClass("Benjamin");
addStudentToClass("Sana");
addStudentToClass("Ahmad");
addStudentToClass("Lars");
addStudentToClass("Ali");
addStudentToClass("Maria");
addStudentToClass("Sara");
addStudentToClass("Benjamin");
addStudentToClass("");

addStudentToClass("Queen");
console.log(getNumberOfStudents());
console.log(class07Students);
