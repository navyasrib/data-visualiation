// var shapes;
// var colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(['line','circle','square','triangle']);
// var createShape = function(shape, symbol, size) {
//     shapes.append('svg').classed(shape, true)
//         .attr('height', 150)
//         .attr('width', 150);
//
//     var path = shapes.select('.'+shape)
//         .append('g')
//         .attr('transform', 'translate(75,75)')
//         .append('path');
//
//     path.attr('d', d3.symbol().type(symbol).size(size)).attr('stroke', colorScale(shape));
//
// };
//
// var loadShapes = function () {
//     shapes = d3.select('.container');
//
//     var svg = shapes.append('svg').classed('line',true)
//         .attr('height', 150)
//         .attr('width', 150)
//         .append('g')
//         .attr('transform', 'translate(20,20)');
//
//     svg.append('line')
//         .attr('x1', 0)
//         .attr('y1', 100)
//         .attr('x2', 100)
//         .attr('y2', 0)
//         .attr('stroke', colorScale('line'));
//
//     createShape('circle', d3.symbolCircle, 7850);
//     createShape('square', d3.symbolSquare, 10000);
//     createShape('triangle', d3.symbolTriangle, 5000);
// };

var drawLine = function (svg, dimensions) {
    svg.append('line')
        .attr('x1', dimensions.x1)
        .attr('x2', dimensions.x2)
        .attr('y1', dimensions.y1)
        .attr('y2', dimensions.y2)
        .attr('stroke', 'grey');
};

function translate(xTranslate) {
    return 'translate(' + xTranslate + ',0)';
}

function drawCircle(svg, dimensions, xTranslate) {
    svg.append('circle')
        .attr('transform', translate(xTranslate))
        .attr('cx', dimensions.cx)
        .attr('cy', dimensions.cy)
        .attr('r', dimensions.r)
        .attr('stroke', 'red');
}
function drawSquare(svg, dimensions, xTranslate) {
    svg.append('rect')
        .attr('transform', translate(xTranslate))
        .attr('x', dimensions.x)
        .attr('y', dimensions.y)
        .attr('width', dimensions.size)
        .attr('height', dimensions.size)
        .attr('rx', dimensions.rx)
        .attr('stroke', 'steelblue');
}
function drawTriangle(svg, points, xTranslate) {
    svg.append('polygon')
        .attr('transform', translate(xTranslate))
        .attr('points', points)
        .attr('stroke', 'green');
}
var createShapes = function () {
    var allShapes = d3.select('body').append('div').classed('shapes', true);
    var svg = allShapes.append('svg').attr('height', 150).attr('width', 600);
    drawLine(svg, shapeDimensions.line);
    drawCircle(svg, shapeDimensions.circle, 50);
    drawSquare(svg, shapeDimensions.square, 100);
    drawTriangle(svg, shapeDimensions.triangle, 150);
    drawTriangle(svg, shapeDimensions.triangle, 150);
};

var shapeDimensions = {
    line: {x1: 10, x2: 110, y1: 110, y2: 10},
    circle: {cx: 160, cy: 60, r: 50},
    square: {x: 210, y: 10, size: 100, rx: 5},
    triangle: "310,110 360,10 410,110"
};

window.onload = createShapes;