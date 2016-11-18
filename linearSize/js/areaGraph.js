const WIDTH = 550;
const HEIGHT = 550;
const MARGIN = 50;

var xValues = [0,1,2,3,4,5,6,7,8,9,10];
var data = xValues.map(function(num) { return {x: num, y: (3*Math.sin(num))+5}});

var loadGraph = function (interpolationMethod, typeName) {
    var container = d3.select('body')
        .append('div')
        .classed('container', true);

    var svg = container.append('svg')
        .attr('height', HEIGHT)
        .attr('width', WIDTH);

    svg.append('text')
        .attr('x',WIDTH/2)
        .attr('y',MARGIN-20)
        .text(typeName)
        .attr('font-size', 'larger');

    var xScale = d3.scaleLinear()
        .domain([0, 10])
        .range([0, WIDTH - MARGIN]);
    var yScale = d3.scaleLinear()
        .domain([0, 10])
        .range([HEIGHT - MARGIN, 0]);

    var xAxis = d3.axisBottom(xScale).ticks(10).tickFormat(function (d) {return (d/10).toFixed(1);});
    var yAxis = d3.axisLeft(yScale).ticks(10).tickFormat(function (d) {return (d/10).toFixed(1);});

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
            return xScale(d.x)
        })
        .y(function (d) {
            return yScale(d.y)
        })
        .curve(interpolationMethod);

    var pathEle = svg.append('g')
        .attr('transform', 'translate(' + graphMargin + ',' + verticalMargin + ')')
        .classed('line', true);

    var area = d3.area()
        .x(function(d) {return xScale(d.x)})
        .y0(HEIGHT-MARGIN)
        .y1(function(d) {return yScale(d.y)})
        .curve(interpolationMethod);

    pathEle.append('path')
        .attr('d', line(data))
        .classed('line1', true);

    pathEle.append('path')
        .data([data])
        .attr('d', area)
        .classed('area', true);

    var circles = pathEle.selectAll('circle')
        .data(data);

    circles.enter()
        .append('circle')
        .attr('cx', function (d) {
            return xScale(d.x)
        })
        .attr('cy', function (d) {
            return yScale(d.y)
        })
        .attr('r', 5);
};

window.onload = function () {
    loadGraph(d3.curveLinear, 'curve linear');
    loadGraph(d3.curveLinearClosed, 'curve linear closed');
};