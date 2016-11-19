const WIDTH = 600;
const HEIGHT = 600;
var values = [1, 1, 2, 2, 1, 2, 1];
var colors = d3.scaleOrdinal(d3.schemeCategory20);
var container = d3.select('body').append('container');

var data = [
    {name:'PieChart', innerRadius:250, outerRadius:0, angleRatio:1},
    {name:'Half PieChart', innerRadius:250, outerRadius:0, angleRatio:2},
    {name:'DonutChart', innerRadius:250, outerRadius:125, angleRatio:1},
    {name:'Half DonutChart', innerRadius:250, outerRadius:125, angleRatio:2}
];

var createButton = function(dropDown, specifications) {
    var chart = dropDown.append('button')
        .text(specifications.name);
    chart.on('click', function(){
        var iradius = document.getElementById('iradius').value;
        var oradius = document.getElementById('oradius').value;
        specifications.innerRadius = iradius? iradius : specifications.innerRadius;
        specifications.outerRadius = oradius? oradius : specifications.outerRadius;
        loadChart(specifications);
    });
};

var module = function() {
    var dropDown = container.append('div').classed('dropDown', true);
    data.forEach(function(chart){
       createButton(dropDown, chart);
    });
};

var loadChart = function(circleSpec) {
    container.select('svg').remove();
    var svg = container.append('svg');

    var g = svg.attr('width', WIDTH)
        .attr('height', HEIGHT)
        .append('g')
        .attr('transform', 'translate(300,300)');

    var pie = d3.pie()
        .sort(null)
        .value(function(d) { return d; });
    var arc = d3.arc()
        .outerRadius(circleSpec.outerRadius)
        .innerRadius(circleSpec.innerRadius)
        .startAngle(function(d) {return d.startAngle/circleSpec.angleRatio})
        .endAngle(function(d) {return d.endAngle/circleSpec.angleRatio});

    g.selectAll('path')
        .data(pie(values))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill',function(d,i){return colors(i)});
};

window.onload = function() {
    module();
};