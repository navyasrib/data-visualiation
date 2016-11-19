const WIDTH = 600;
const HEIGHT = 600;
var values = [1, 1, 2, 2, 1, 2, 1];
var colors = d3.scaleOrdinal(d3.schemeCategory20);

var container = d3.select('body').append('container');

var loadChart = function(outerRadius, innerRadius,angleRatio) {
    var svg = container.append('svg');

    var g = svg.attr('width', WIDTH)
        .attr('height', HEIGHT)
        .append('g')
        .attr('transform', 'translate(300,300)');

    var pie = d3.pie()
        .sort(null)
        .value(function(d) { return d; });
    var arc = d3.arc()
        .outerRadius(outerRadius)
        .innerRadius(innerRadius)
        .startAngle(function(d) {return d.startAngle/angleRatio})
        .endAngle(function(d) {return d.endAngle/angleRatio});

    g.selectAll('path')
        .data(pie(values))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill',function(d,i){return colors(i)});
};

window.onload = function() {
    loadChart(250, 0, 1);
    loadChart(250, 125, 1);
    loadChart(250, 0, 2);
    loadChart(250, 125, 2);
};