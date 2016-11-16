const WIDTH = 550;
const HEIGHT = 550;
const MARGIN = 50;

var linePoints = [[0, 5], [1, 9], [2, 7], [3, 5], [4, 3], [6, 4], [7, 2], [8, 3], [9, 2]];
var loadGraph = function () {
    var container = d3.select('body')
        .append('div')
        .classed('container', true);

    var svg = container.append('svg')
        .attr('height', HEIGHT)
        .attr('width', WIDTH);

    var xScale = d3.scaleLinear()
        .domain([0, 1])
        .range([0, WIDTH - MARGIN]);
    var yScale = d3.scaleLinear()
        .domain([0, 1])
        .range([HEIGHT - MARGIN, 0]);

    var xAxis = d3.axisBottom(xScale).ticks(12);
    var yAxis = d3.axisLeft(yScale).ticks(10);

    var graphMargin = 20;
    var verticalMargin = 10;
    svg.append('g')
        .attr('transform', 'translate(' + graphMargin + ',510)')
        .call(xAxis);
    svg.append('g')
        .attr('transform', 'translate(' + graphMargin + ',' + verticalMargin + ')')
        .call(yAxis);
    var line = d3.line()
        .x(function (d) {
            return xScale(d[0]/10)
        })
        .y(function (d) {
            return yScale(d[1]/10)
        });

    var pathEle = svg.append('g')
        .attr('transform', 'translate(' + graphMargin + ',' + verticalMargin + ')')
        .classed('line', true);
    pathEle.append('path')
        .attr('d', line(linePoints));

    var sineLine = d3.line()
        .x(function (d) {
            return xScale(d[0]/10)
        })
        .y(function (d) {
            return yScale(Math.sin(d[0])/10+0.5)
        });

    pathEle.append('path')
        .attr('d', sineLine(linePoints));
};

window.onload = loadGraph;