const LIMIT = 10;
var titles = ['Title', 'n', 'n square', 'log(n)', 'log(n) rounded'];
var generateValues = function(limit){
    return [...new Array(limit)].map((d,i)=>i+1);
};

var header = ['Title', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var numberScale = d3.scaleLinear().domain([1, 10]).range([1, 10]);
var powerScale = d3.scalePow().exponent(2);
var logScale = function (d) {
    return d3.scaleLog()(d).toFixed(4);
};
var roundedLogScale = d3.scaleLog().rangeRound([0, 1]);

var tableContent;

var loadTable = function () {
    var table = d3.select('.container').append('table');
    var tableHead = table.append('thead');
    tableContent = table.append('tbody');

    tableHead.append('tr')
        .selectAll('th')
        .data(header).enter()
        .append('th')
        .text(function (d) {
            return d;
        });
};

var generateRows = function (data, scale) {
    var rows = tableContent.append('tr');

    rows.selectAll('td')
        .data(function () { return data.map((ele)=>isNaN(scale(ele)) ? ele : scale(ele)) })
        .enter()
        .append('td')
        .text(function (d) {
            return d;
        })
};

window.onload = function () {
    loadTable();

    var values = generateValues(LIMIT);
    values.unshift(titles[1]);
    generateRows(values, numberScale);

    values.shift();
    values.unshift(titles[2]);
    generateRows(values, powerScale);

    values.shift();
    values.unshift(titles[3]);
    generateRows(values, logScale);

    values.shift();
    values.unshift(titles[4]);
    generateRows(values, roundedLogScale);
};
