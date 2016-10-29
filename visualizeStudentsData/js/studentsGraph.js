var studentsData = [
    {name:'ramesh',subject:'maths',score:87},
    {name:'suresh',subject:'maths',score:45},
    {name:'pokemon',subject:'english',score:65},
    {name:'mary',subject:'kannada',score:44},
    {name:'riya',subject:'science',score:72},
    {name:'katie',subject:'social studies',score:82},
    {name:'katie',subject:'maths',score:98},
    {name:'ramesh',subject:'bengali',score:25},
    {name:'suresh',subject:'science',score:55},
    {name:'riya',subject:'tamil',score:75},
    {name:'pokemon',subject:'sports',score:95},
    {name:'pokemon',subject:'social studies',score:32}
];
var subjectsInfo = ['maths','english','kannada','science','social studies','bengali','tamil','sports'];
colors = d3.scaleOrdinal(d3.schemeCategory10).domain(subjectsInfo);

var loadInitialChart = function() {
    var studentsInfo = d3.select('.container').append('div').classed("all-students-info", true);
    var students = studentsInfo.selectAll("div").data(studentsData);

    students.enter()
        .append("div")
        .classed("student", true)
        .style("height", "30px");

    var student = d3.selectAll(".student");
    student.style("width", function(s) {return s.score * 6+"px"})
        .text(function(s) {return s.name + " " + s.score})
        .style("background-color", function(s,i) { return colors(s.subject); });
};

var sortByScore = function() {
    var student = d3.selectAll(".student");
    student.sort(function (s1, s2) { return s1.score - s2.score})
};

var sortBySubject = function() {
    var student = d3.selectAll(".student");
    student.sort(function(s1, s2) {return s1.subject.localeCompare(s2.subject)});
};

var sortByName = function() {
    var student = d3.selectAll(".student");
    student.sort(function(s1, s2) {return s1.name.localeCompare(s2.name)});
};

var showSubjects = function() {
    var subjects = d3.select('.subjects').append('div').classed("all-subjects", true);
    subjects.selectAll('div').data(subjectsInfo)
        .enter()
        .append('div')
        .classed('subject',true)
        .text(function(s){return s})
        .style('background-color', function (s) { return colors(s)});
};

window.onload = function() {
    loadInitialChart();
    showSubjects();
};

