var numbers = [1,2,3,4,5,6,7,8,9,10];
const WIDTH = 600;
const HEIGHT = 600;
const MARGIN = 50;
var list = [{name:'min', value: d3.min},{name:'max', value: d3.max}];

console.log(d3.extent(numbers, function(d) { return d; }),'--');

var createButton = function(div, type) {
    var chart = div.append('button')
        .text(type.name);
    chart.on('click', function() {
        representChart(type.value(numbers));
    });
};

var module = function() {
    var buttons = d3.select('body').append('div').classed('dropDown', true);
    list.forEach(function (type) {
        createButton(buttons, type);
    });
};

var representChart = function(sample) {
    d3.select('svg').remove();
    var container = d3.select('body')
        .append('div')
        .classed('container', true);

    var svg = container.append('svg')
        .attr('height', HEIGHT)
        .attr('width', WIDTH);

    var xScale = d3.scaleLinear()
        .domain([0, 10])
        .range([0, WIDTH - MARGIN]);

    var yScale = d3.scaleLinear()
        .domain([10, 0])
        .range([HEIGHT - MARGIN, 0]);

    var rectangles = svg.selectAll('rect')
        .data(numbers)
        .enter()
        .append('rect')
        .attr('x',function(d,i){return xScale(i)})
        .attr('y',function (d) {return HEIGHT-yScale(d)})
        .attr("width",50)
        .attr("height",function(d){return yScale(d)});

    rectangles.attr('fill',function(d){
        if(d==sample)
            return 'steelblue';
        return 'black';
    });
};

window.onload = function () {
    module();
    representChart();
};
