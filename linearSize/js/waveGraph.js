const WIDTH = 550;
const HEIGHT = 550;
const MARGIN = 50;

var xValues = [0,1,2,3,4,5,6,7,8,9];
var loadGraph = function (interpolationMethod, typeName) {
    var container = d3.select('body')
        .append('div')
        .classed('container', true);

    var svg = container.append('svg')
        .attr('height', HEIGHT)
        .attr('width', WIDTH);

    svg.append('text')
        .attr('x',WIDTH/2)
        .attr('y',MARGIN)
        .text(typeName)
        .attr('font-size', 'larger');

    var xScale = d3.scaleLinear()
        .domain([0, 10])
        .range([0, WIDTH - MARGIN]);
    var yScale = d3.scaleLinear()
        .domain([0, 1])
        .range([HEIGHT - MARGIN, 0]);

    var xAxis = d3.axisBottom(xScale).ticks(10);
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
            return xScale(d)
        })
        .y(function (d) {
            return yScale((Math.sin(3*d)+1)/2)
        })
        .curve(interpolationMethod);

    var pathEle = svg.append('g')
        .attr('transform', 'translate(' + graphMargin + ',' + verticalMargin + ')')
        .classed('line', true);

    pathEle.append('path')
        .attr('d', line(xValues));

    var circles = pathEle.selectAll('circle')
        .data(xValues);

    circles.enter()
        .append('circle')
        .attr('cx', function (d) {
            return xScale(d)
        })
        .attr('cy', function (d) {
            return yScale((Math.sin(3*d)+1)/2)
        })
        .attr('r', 5);
};

window.onload = function () {
    loadGraph(d3.curveLinear, 'curve linear');
};
