import { dataStudents } from './dataStudents.js';
import { dataCourses } from './dataCourses.js';
var coursesTbody = document.getElementById('courses');
var studentsTbody = document.getElementById('students');
var btnfilterByName = document.getElementById("button-filterByName");
var btnfilterByCredits = document.getElementById("button-filterByCredits");
var inputSearchBox = document.getElementById("search-box");
var inputSearchBoxMin = document.getElementById("search-box-min");
var inputSearchBoxMax = document.getElementById("search-box-max");
var totalCreditElm = document.getElementById("total-credits");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCredits.onclick = function () { return applyFilterByCredits(); };
renderCoursesInTable(dataCourses);
renderStudentsInTable(dataStudents);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentsInTable(students) {
    console.log('Desplegando estudiantes');
    students.forEach(function (student) {
        var trElement = document.createElement("tr");
        var trElement2 = document.createElement("tr");
        var trElement3 = document.createElement("tr");
        var trElement4 = document.createElement("tr");
        var trElement5 = document.createElement("tr");
        trElement.innerHTML = "<td>Codigo:</td><td>" + student.codigo + "</td>";
        trElement2.innerHTML = "<td>Cedula:</td><td>" + student.cedula + "</td>";
        trElement3.innerHTML = "<td>Edad:</td><td>" + student.edad + "</td>";
        trElement4.innerHTML = "<td>Direccion:</td><td>" + student.direccion + "</td>";
        trElement5.innerHTML = "<td>Telefono:</td><td>" + student.telefono + "</td>";
        studentsTbody.appendChild(trElement);
        studentsTbody.appendChild(trElement2);
        studentsTbody.appendChild(trElement3);
        studentsTbody.appendChild(trElement4);
        studentsTbody.appendChild(trElement5);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
    totalCreditElm.innerHTML = "" + getTotalCredits(coursesFiltered);
}
function applyFilterByCredits() {
    var textMin = inputSearchBoxMin.value;
    var textMax = inputSearchBoxMax.value;
    var min = Number(textMin);
    var max = Number(textMax);
    min = (textMin == null) ? 0 : min;
    max = (textMax == null) ? 100 : max;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCredits(min, max, dataCourses);
    renderCoursesInTable(coursesFiltered);
    totalCreditElm.innerHTML = "" + getTotalCredits(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function searchCourseByCredits(min, max, courses) {
    return '' ? dataCourses : courses.filter(function (c) {
        return c.credits >= min && c.credits <= max;
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
