const WIDTH = 1280;
const HEIGHT = 800;
const MARGIN = 30;
const MAX_LIMIT = 10;
const INNER_HEIGHT = HEIGHT - 2*MARGIN;

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

var loadChart = function (data) {
    var svg = d3.select('.container').append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT);

    var xScale = d3.scaleLinear().domain([0,data.length]).range([0, WIDTH]);
    var yScale = d3.scaleLinear().domain([0, 10]).range([HEIGHT, 0]);

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    svg.append('g')
        .attr('transform', 'translate('+MARGIN+', '+(HEIGHT - MARGIN)+')')
        .call(xAxis);

    svg.append('g')
        .attr('transform', 'translate('+MARGIN+', '+MARGIN+')')
        .call(yAxis);

    updateGraph();
    function updateGraph() {
        d3.selectAll('rect').remove();
        var g = svg.append('g')
            .attr('transform', 'translate('+MARGIN+', '+MARGIN+')')
            .classed(".bars", true);
        bars = g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("x", function(d, i) { return xScale(i); })
            .attr("y", yScale)
            .attr("width", 100)
            .attr("height", function(d) { return INNER_HEIGHT-yScale(d); })
            .transition()
            .duration(500)
            .delay(function(d, i) { return i*10 });
    }

    setInterval(function() {
        data.shift();
        data.push(getANumber());
        updateGraph();
    }, 250);

};

window.onload = function () {
    loadChart(generateData());
};


