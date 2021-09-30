import {Student} from './student.js';
import { Course } from './course.js';

import { dataStudents } from './dataStudents.js';
import { dataCourses } from './dataCourses.js';


let coursesTbody: HTMLElement = document.getElementById('courses')!;
let studentsTbody: HTMLElement = document.getElementById('students')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnfilterByCredits: HTMLElement = document.getElementById("button-filterByCredits")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const inputSearchBoxMin: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box-min")!;
const inputSearchBoxMax: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box-max")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;

btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCredits.onclick = () => applyFilterByCredits();

renderCoursesInTable(dataCourses);
renderStudentsInTable(dataStudents);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
 
function renderStudentsInTable(students: Student[]): void {
    console.log('Desplegando estudiantes');
    students.forEach((student) => { 
        let trElement = document.createElement("tr");
        let trElement2 = document.createElement("tr");
        let trElement3 = document.createElement("tr");
        let trElement4 = document.createElement("tr");
        let trElement5 = document.createElement("tr");
        trElement.innerHTML = `<td>Codigo:</td><td>${student.codigo}</td>`;
        trElement2.innerHTML = `<td>Cedula:</td><td>${student.cedula}</td>`;
        trElement3.innerHTML = `<td>Edad:</td><td>${student.edad}</td>`;
        trElement4.innerHTML = `<td>Direccion:</td><td>${student.direccion}</td>`;
        trElement5.innerHTML = `<td>Telefono:</td><td>${student.telefono}</td>`;
      studentsTbody.appendChild(trElement);
      studentsTbody.appendChild(trElement2);
      studentsTbody.appendChild(trElement3);
      studentsTbody.appendChild(trElement4);
      studentsTbody.appendChild(trElement5);
    });
  }
 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered)
  totalCreditElm.innerHTML = `${getTotalCredits(coursesFiltered)}`;
}

function applyFilterByCredits() { 
    let textMin = inputSearchBoxMin.value;
    let textMax = inputSearchBoxMax.value;
    let min = Number(textMin);
    let max = Number(textMax)
    min = (textMin == null) ? 0 : min;
    max = (textMax == null) ? 100 : max;
    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByCredits(min, max, dataCourses);
    renderCoursesInTable(coursesFiltered)
    totalCreditElm.innerHTML = `${getTotalCredits(coursesFiltered)}`;
  }

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

function searchCourseByCredits(min: number, max:number,  courses: Course[]) {
    return '' ? dataCourses : courses.filter( c => 
      c.credits >= min && c.credits <= max);
  }

function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}