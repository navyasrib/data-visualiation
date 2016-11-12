var titles = ['Title', 'n', 'n square', 'log(n)', 'log(n) rounded'];
var numberScale = d3.scaleLinear().domain([1, 10]).range([1, 10]);
var powerScale = d3.scalePow().exponent(2);
var logScale = function (d) {
    return d3.scaleLog()(d).toFixed(4);
};
var roundedLogScale = d3.scaleLog().rangeRound([0, 1]);
var tableContent;

var getNumbersWithTitle = function (title) {
    var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    numbers.unshift(title);
    return numbers;
};

var loadTable = function (headerData) {
    var table = d3.select('.container').append('table');
    var tableHead = table.append('thead');
    tableContent = table.append('tbody');
    tableHead.append('tr')
        .selectAll('th')
        .data(headerData).enter()
        .append('th')
        .text(function (d) {
            return d;
        });
};

var generateRows = function (data, scale) {
    var rows = tableContent.append('tr');
    rows.selectAll('td')
        .data(function () {
            return data.map((ele) => isNaN(scale(ele)) ? ele : scale(ele))
        })
        .enter()
        .append('td')
        .text(function (d) {
            return d;
        })
};

window.onload = function () {
    loadTable(getNumbersWithTitle(titles[0]));
    generateRows(getNumbersWithTitle(titles[1]), numberScale);
    generateRows(getNumbersWithTitle(titles[2]), powerScale);
    generateRows(getNumbersWithTitle(titles[3]), logScale);
    generateRows(getNumbersWithTitle(titles[4]), roundedLogScale);
};
