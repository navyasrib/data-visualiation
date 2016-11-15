const WIDTH = 550;
const HEIGHT = 550;
const MARGIN = 50;
var loadGraph = function() {
    var container = d3.select('body')
        .append('div')
        .classed('container', true);

    var svg = container.append('svg')
        .attr('height', HEIGHT)
        .attr('width', WIDTH);

    var xScale = d3.scaleLinear()
        .domain([0,10])
        .range([0,WIDTH-MARGIN]);
    var yScale = d3.scaleLinear()
        .domain([0,10])
        .range([HEIGHT-MARGIN, 0]);

    var xAxis = d3.axisBottom(xScale).ticks(12);
    var yAxis = d3.axisLeft(yScale).ticks(10);

    svg.append('g')
        .attr('transform','translate(20,510)')
        .call(xAxis);
    svg.append('g')
        .attr('transform','translate(20,10)')
        .call(yAxis)
};

window.onload = loadGraph;