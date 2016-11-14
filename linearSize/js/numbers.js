var numbersToRepresent = [0,1,2,3,4,5,6,7,8,9,10];
var fontScale = d3.scaleLinear().domain([0,10]).range(["italic bold 12px/30px Georgia, serif","italic bold 120px/180px Georgia, serif"]);

var loadNumbers = function() {
    var numbersDiv = d3.select('.container').append('div').classed('numbers',true);
    var numbers = numbersDiv.selectAll("div").data(numbersToRepresent);
    numbers.enter()
        .append('div')
        .classed('number', true)
        .text(function(n) { return n })
        .style('font', function(n) { return fontScale(n); });
};

window.onload = function() {
    loadNumbers();
};
