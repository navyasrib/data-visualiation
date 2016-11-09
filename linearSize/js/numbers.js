var numbersToRepresent = [0,1,2,3,4,5,6,7,8,9,10];
var fontScaleWidth = d3.scaleLinear().domain([0,10]).range([12,120]);
var fontScaleHeight = d3.scaleLinear().domain([0,10]).range([30,180]);

var loadNumbers = function() {
    var numbersDiv = d3.select('.container').append('div').classed('numbers',true);
    var numbers = numbersDiv.selectAll("div").data(numbersToRepresent);
    numbers.enter()
        .append('div')
        .classed('number', true)
        .text(function(n) { return n })
        .style('font', function(n) { return 'italic bold '+fontScaleWidth(n)+'px/'+fontScaleHeight(n)+'px Georgia'; });
};

window.onload = function() {
    loadNumbers();
};
