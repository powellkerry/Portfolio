var spending = {
    diameter: 940,
    currentFilter: null,
    data: [],
    agencyData: [],
    bureauData: [],
    accountData: [],
    color: function () {
        var colors = spending.generateColors();
        return d3.scale.quantize().range(colors);
    },
    generateColors: function () {
        var darkRed = new Color('#5A030E'),
            white = new Color("#6F5FF5"),
            darkRedRGB = darkRed.toRGBArray(),
            whiteRGB = white.toRGBArray(),
            colors = [],
            color = [],
            c,
            i,
            k,
            fac;

        for (i = 0; i < 50; i += 1) {
            fac = i / (50 - 1);
            color = [];
            for (k = 0; k < 3; k += 1) {
                if (darkRedRGB[k] && whiteRGB[k]) {
                    color.push(whiteRGB[k] * (1 - fac) + darkRedRGB[k] * fac);
                }
            }
            c = new Color();
            c.setRGB(color[0], color[1], color[2]);
            colors.push('#' + c.toString());
        }
        return colors;
    },
    textColor: function () {
        return d3.scale.quantize().range(["#FFF"]);
    },
    pack: function () {
        return d3.layout.pack()
            .sort(function (a, b) {
                if (a.amount > b.amount) {
                    return 1;
                }
                if (a.amount < b.amount) {
                    return -1;
                }
                return 0;
            })
            .size([this.diameter, this.diameter])
            .value(function (d) {

                return d.amount > 0 ? (d.amount / spending.diameter) : false;
            })
            .padding(5);
    },
    svg: function () {
        return d3.select("body").append("svg")
            .attr("width", this.diameter)
            .attr("height", this.diameter);
    },
    format: function (value) {
        value = value * 1000;
        value = value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        return '$' + value;
    },
    render: function (type) {
        if (!type) {
            type = spending.currentFilter;
        } else {
            spending.currentFilter = type;
        }
        d3.select("svg")
            .remove();
        var pack = spending.pack(),
            nodes = pack.nodes({children: spending[type]}).slice(1),
            color = spending.color(),
            textColor = spending.textColor(),
            svg = spending.svg(),
            circle;
        color.domain(d3.extent(nodes, function (d) {
            return d.value;
        }));
        textColor.domain(d3.extent(nodes, function (d) {
            return d.value;
        }));
        circle = svg.selectAll('circle')
            .data(nodes)
            .enter().append('circle');
        circle.attr("r", function (d) {
            return d.r;
        });
        circle.attr("cx", function (d) {
            return d.x;
        });
        circle.attr("cy", function (d) {
            return d.y;
        });
        circle.style("fill", function (d) {
            return color(d.value);
        });
        circle.style('stroke', 'white');
        circle.append("title")
            .text(function (d) {
                return d.name + ' - ' + spending.format(d.amount);
            });
        svg.selectAll('text')
            .data(nodes)
            .enter().append('text')
            .text(function (d) {
                return d.abbr;
            })
            .attr("x", function (d) {
                var val;
                if (this.offsetWidth > ((d.r * 2) - 5)) {
                    val = -500;
                } else {
                    val = d.x - (this.offsetWidth / 2);
                }
                return val;
            })
            .attr('y', function (d) {
                var val;
                if (this.offsetHeight > ((d.r * 2) - 5)) {
                    val = -500;
                } else {
                    val = d.y + (this.offsetHeight / 4);
                }
                return val;
            })
            .style('fill', function (d) {
                return textColor(d.value);
            })
            .append("title").text(function (d) {
                return d.name + ' - ' + spending.format(d.amount);
            });

        d3.select(self.frameElement).style("height", spending.diameter + "px");
    }
};



