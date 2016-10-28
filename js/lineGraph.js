const WIDTH = 1000;
const HEIGHT = 750;
const MARGIN = 30;
const MAX_LIMIT = 10;
const INNER_HEIGHT = HEIGHT - 2*MARGIN;
var svg, xScale, yScale, g, line, bar;
// var colours = ["steelblue","red","green","blue","black","olive","lime","navy","purple","skyblue"];

var getANumber = function () {
    return Math.floor(Math.random() * 10) + 1;
};

var generateData = function () {
    var data = [];
    for(var i=0; i<MAX_LIMIT; i++) {
        data.push(getANumber());
    }
    return data;
};

var data = generateData();

var createChart = function(loadChart) {
    svg = d3.select('.container').append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT);

    xScale = d3.scaleLinear().domain([0, MAX_LIMIT]).range([0, WIDTH]);
    yScale = d3.scaleLinear().domain([0, 10]).range([HEIGHT, 0]);

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    svg.append('g')
        .attr('transform', 'translate('+MARGIN+', '+(HEIGHT - MARGIN)+')')
        .call(xAxis);

    svg.append('g')
        .attr('transform', 'translate('+MARGIN+', '+MARGIN+')')
        .call(yAxis);

    loadChart(data);
};

var createLineChart = function (data) {
    g = svg.append('g')
        .attr('transform', 'translate('+MARGIN+', '+MARGIN+')');
    var path = g.append('path');
    line = d3.line()
        .curve(d3.curveCardinal)
        .x(function(d, i){return xScale(i)})
        .y(function(d){return yScale(d)});

    path.attr('d', line(data));
};

function updateLineChart() {
    var path = g.selectAll("path")
        // .attr("transform", null)
        // .transition().duration(500)
        .attr("d", line(data));
}

function createBarChart(data) {
    console.log("inside create bar chart");
    var g = svg.append('g')
        .attr('transform', 'translate('+MARGIN+', '+MARGIN+')')
        .classed(".bars", true);
    bar = g.selectAll("rect")
        .data(data);

    //enter
    bar.enter()
        .append("rect")
        .attr("width", 50)
        // .attr("fill", function(d, i) {return colours[i]});
    updateBarChart(data);
}

function updateBarChart(data) {
    var rects = d3.selectAll("rect");

    //update
    rects.data(data)
        .attr("y", yScale)
        .attr("x", function(d, i) { return xScale(i); })
        .attr("height", function(d) { return INNER_HEIGHT-yScale(d); })
        .append("title").text(function(d) {return d;});

    //exit
    rects.exit().remove();
}

setInterval(function() {
    data.pop();
    data.unshift(getANumber());
    updateBarChart(data);
    updateLineChart();
}, 1000);

window.onload = function () {
    createChart(createLineChart);
    createChart(createBarChart);
};