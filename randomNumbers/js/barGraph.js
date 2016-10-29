var data = [10, 55, 23, 14, 12, 13, 54, 20];

var load = function() {
    var barsDiv = d3.select('.container').append('div').classed("bars", true);
    var bars = barsDiv.selectAll("div").data(data);

    bars.enter()
        .append("div")
        .classed("bar", true)
        .style("height", "30px");

    var bar = d3.selectAll(".bar");
    updateBar(bar);
};

var updateBar = function(bar) {
    bar.style("width", "0px")
        .style("width", function (d) {return d*6+"px"})
        .text(function (d) { return d;})
        .style("background", function(d, i){return d3.rgb(95,143,d+155)});
};

var updateBars = function() {
    console.log(data);
    var bar = d3.selectAll(".bar").data(data);
    updateBar(bar);
    bar.exit().remove();
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
