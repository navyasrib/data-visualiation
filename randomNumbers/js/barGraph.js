var data = [10, 55, 23, 14, 12, 13, 54, 20];
var colors = ["#1C86EE", "#60AFFE", "#499DF5", "#C6E2FF", "#7AA9DD", "#B9D3EE", "#1D7CF2", "#7EB6FF", "#BCD2EE", "#3A66A7"];

var load = function() {
    barsDiv = d3.select('.container').append('div').classed("bars", true);
    var bars = barsDiv.selectAll("div")
        .data(data);

    bars.enter()
        .append("div")
        .classed("bar", true)
        .style("height", "30px");

    var bar = d3.selectAll(".bar");
    bar.style("width", "0px")
        .transition().duration(500)
        .style("width", function (d) {return d*6+"px"})
        .text(function (d) { return d;})
        .style("background", function(d, i){return colors[d%10]});
};

var updateBars = function() {
    console.log(data);
    var bar = d3.selectAll(".bar").data(data);
    bar.style("width", "0px")
        .style("width", function (d) {return d*6+"px"})
        .text(function (d) { return d;})
        .style("background", function(d, i){return colors[d%10]});
};

function randomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}
setInterval(function () {
    var num = data.shift();
    data.push(randomNumber());
    updateBars();
},1000);

window.onload = function () {
    load();
};
