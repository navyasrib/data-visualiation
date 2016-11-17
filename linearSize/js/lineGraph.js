const WIDTH = 550;
const HEIGHT = 550;
const MARGIN = 50;

var linePoints = [[0, 5], [1, 9], [2, 7], [3, 5], [4, 3], [6, 4], [7, 2], [8, 3], [9, 2]];

var normalizeCoordinate = function (coordinate) {
    return coordinate / 10;
};

var loadGraph = function (interpolationMethod, typeName) {
    var container = d3.select('body')
        .append('div')
        .classed('container', true)
        .text(typeName)
        .attr('text-align','center');

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

    var graphMargin = 30;
    var verticalMargin = 10;
    svg.append('g')
        .attr('transform', 'translate(' + graphMargin + ',510)')
        .call(xAxis);
    svg.append('g')
        .attr('transform', 'translate(' + graphMargin + ',' + verticalMargin + ')')
        .call(yAxis);
    var line = d3.line()
        .x(function (d) {
            return xScale(normalizeCoordinate(d[0]))
        })
        .y(function (d) {
            return yScale(normalizeCoordinate(d[1]))
        })
        .curve(interpolationMethod);

    var pathEle = svg.append('g')
        .attr('transform', 'translate(' + graphMargin + ',' + verticalMargin + ')')
        .classed('line', true);

    pathEle.append('path')
        .attr('d', line(linePoints))
        .attr('stroke', 'darkred');

    var sineLine = d3.line()
        .x(function (d) {
            return xScale(normalizeCoordinate(d[0]))
        })
        .y(function (d) {
            return yScale(normalizeCoordinate(Math.sin(d[0])) + 0.5)
        })
        .curve(interpolationMethod);

    pathEle.append('path')
        .attr('d', sineLine(linePoints))
        .attr('stroke', 'darkblue');

    var circles = pathEle.selectAll('circle')
        .data(linePoints);

    circles.enter()
        .append('circle')
        .attr('cx', function (d) {
            return xScale(normalizeCoordinate(d[0]))
        })
        .attr('cy', function (d) {
            return yScale(normalizeCoordinate(Math.sin(d[0])) + 0.5)
        })
        .attr('r', 5);

    circles.enter()
        .append('circle')
        .attr('cx', function (d) {
            return xScale(normalizeCoordinate(d[0]))
        })
        .attr('cy', function (d) {
            return yScale(normalizeCoordinate(d[1]))
        })
        .attr('r', 5);

};

window.onload = function () {
    loadGraph(d3.curveLinear, 'curve linear');
    loadGraph(d3.curveLinearClosed, 'curve linear closed');
    loadGraph(d3.curveStepAfter, 'curve step after');
    loadGraph(d3.curveBasis, 'curve basics');
    loadGraph(d3.curveBundle, 'curve bundle');
    loadGraph(d3.curveCardinalClosed, 'curve cardinal closed');
    loadGraph(d3.curveCardinal, 'curve cardinal');
    loadGraph(d3.curveCatmullRom.alpha(0.5), 'curve catmul rom');
};