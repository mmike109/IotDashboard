$(() => {
    let connection = new signalR.HubConnectionBuilder().withUrl("/signalServer").build();
    connection.start()
    connection.on("refreshBarometric", function () {
        loadData('/SmartBuild/GetBarometric');
        loadBatteryData();
        loadHumidityData();
        loadLuminanceData();
        loadTemperatureData();
    })
   


    loadData('/SmartBuild/GetBarometric');
    loadBatteryData();
    loadHumidityData();
    loadLuminanceData();
    loadTemperatureData();
})

    //const svg = select('#barometricChart');

    //const width = +svg.attr('width');
    //const height = +svg.attr('height');

    //const render = data => {
    //    const title = "Barometric Pressure";
    //    const xValue = d => d.time;
    //    const xAxisLabel = 'Time';

    //    const yValue = d => d.value;
    //    const circleRadius = 6;
    //    const yAxisLabel = 'Value';

    //    const colorValue = d => d.city;
    //    const margin = { top: 30, right: 20, bottom: 30, left: 50 };

    //    const innerWidth = width - margin.left - margin.right;
    //    const innerHeight = height - margin.top - margin.bottom;

    //    const xScale = scaleTime()
    //        .domain(extent(data, xValue))
    //        .range([0, innerWidth])
    //        .nice();

    //    const yScale = scaleLinear()
    //        .domain(extent(data, yValue))
    //        .range([innerHeight, 0])
    //        .nice()

    //    const colorScale = scaleOrdinal(schemeCategory10);

    //    const g = svg.append('g')
    //        .attr('transform',
    //            `translate(${margin.left},${margin.top})`);

    //    const xAxis = axisBottom(xScale)
    //        .tickSize(-innerHeight)
    //        .tickPadding(15);

    //    const yAxis = axisLeft(yScale)
    //        .tickSize(-innerWidth)
    //        .tickPadding(10);

    //    const yAxisG = g.append('g').call(yAxis);
    //    yAxisG.selectAll('.domain').remove();

    //    yAxisG.append('text')
    //        .attr('class', 'axis-label')
    //        .attr('y', -60)
    //        .attr('x', -innerHeight / 2)
    //        .attr('fill', 'black')
    //        .attr('transform', `rotate(-90)`)
    //        .attr('text-anchor', 'middle')
    //        .text(yAxisLabel);

    //    const xAxisG = g.append('g').call(xAxis)
    //        .attr('transform', `translate(0,${innerHeight})`);

    //    xAxisG.select('.domain').remove();

    //    xAxisG.append('text')
    //        .attr('class', 'axis-label')
    //        .attr('y', 80)
    //        .attr('x', innerWidth / 2)
    //        .attr('fill', 'black')
    //        .text(xAxisLabel);

    //    const lineGenerator = line()
    //        .x(d => xScale(xValue(d)))
    //        .y(d => yScale(yValue(d)))
    //        .curve(curveBasis);

    //    const lastYValue = d => yValue(d.values[d.values.length - 1])
    //    const nested = nest()
    //        .key(colorValue)
    //        .entries(data)
    //        .sort((a, b) =>
    //            descending(lastYValue(a), lastYValue(b)));

    //    colorScale.domain(nested.map(d => d.key));

    //    g.selectAll('.line-path').data(nested)
    //        .enter().append('path')
    //        .attr('class', 'line-path')
    //        .attr('d', d => lineGenerator(d.values))
    //        .attr('stroke', d => colorScale(d.key));
    //    g.append('text')
    //        .attr('class', 'title')
    //        .attr('y', -10)
    //        .text(title);

    //    svg.append('g')
    //        .attr('transform', `translate(790,121)`)
    //        .call(colorLegend, {
    //            colorScale,
    //            circleRadius: 13,
    //            spacing: 30,
    //            textOffset: 15

    //        });
    //};


    //const margin = { top: 30, right: 20, bottom: 30, left: 50 },
    //    width = 600 - margin.left - margin.right,
    //    height = 270 - margin.top - margin.bottom;

    //var svg = d3.select("#barometricChart")
    //    .append("svg")
    //    .attr("width", width + margin.left + margin.right)
    //    .attr("height", height + margin.top + margin.bottom)
    //    .append("g")
    //    .attr("transform",
    //        "translate(" + margin.left + "," + margin.top + ")");

    ////var parseDate = d3.timeHour.floor();
    //var x = d3.scaleLinear().range([0, width]);
    //var xAxis = d3.axisBottom().scale(x);
    //svg.append("g")
    //    .attr("transform", "translate(0," + height + ")")
    //    .attr("class", "myXaxis")

    //var y = d3.scaleLinear().range([height, 0]);
    //var yAxis = d3.axisLeft().scale(y);
    //svg.append("g")
    //.attr("class","myYaxis")

    //var valueLine = d3.svg.line()
    //    .x(function (d) { return x(d.time); })
    //    .y(function (d) { return y(d.value); });


    //function update(data) {
    //    x.domain([0, d3.max(data, function (d) { return d.time })]);
    //    svg.selectAll(".myXaxis").transition().duration(3000).call(xAxis);

    //    y.domain([0, d3.max(data, function (d) { return d.value })]);
    //    svg.selectAll("myYaxis").transition().duration(3000).call(yAxis);

    //    var u = svg.selectAll(".lineTest")
    //        .data([data], function (d) { return d.value })

    //    u.enter()
    //        .append("path")
    //        .attr("class", "lineTest")
    //        .merge(u)
    //        .transition()
    //        .duration(3000)
    //        .attr("d", d3.line()
    //            .x(function (d) { return x(d.time); })
    //            .y(function (d) { return y(d.value); }))
    //        .attr("fill", "none")
    //        .attr("stroke", "steelblue")
    //        .attr("stroke-width", 2.5)
    //}


const width = 960;
const height = 500;
const margin = 5;
const padding = 5;
const adj = 30;
const adj2 = 40;

const svg = d3.select("#barometricChart").append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox",
        `-${adj2} -${adj} ${(width + adj * 3)} ${(height + adj * 3)}`,
    )
    .style("padding", padding)
    .style("margin", margin)
    .classed("svg-content", true);

svg.append("text")
    .attr("x", (width / 2))
    .attr("y", 0 - (margin / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("text-decoration", "underline")
    .text("Barometric Pressure (hPa)");
// ——— DATA —————————————————————————————————————————————————————————
function loadData(url) {
    d3.json(url).then(function (data) {
        // Parse the data
        let dataSorted = categorizeBy(data, 'sensor_number');

        // ——— SCALES ————————————————————————————————————————————————————————
        const xScale = d3.scaleTime().range([0, width]);
        const yScale = d3.scaleLinear().rangeRound([height, 0]);

        xScale.domain(d3.extent(data, (d) =>
            new Date(removeDigits(d.time, 6))
        ));

        yScale.domain(
            [(985), d3.max(dataSorted, (c) =>
                d3.max(c.values, (d) => d.value + 3)
            )],
        );

        // ——— AXES ——————————————————————————————————————————————————————————
        const yaxis = d3.axisLeft()
            .ticks(dataSorted[0].values.length)
            .scale(yScale);

        const xaxis = d3.axisBottom()
            .ticks(12)
            .tickFormat(d3.timeFormat('%I:%M %p'))
            .scale(xScale);


        // ——— DRAW AXES —————————————————————————————————————————————————————
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xaxis);
        svg.append("g")
            .attr("class", "axis")
            .call(yaxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("dy", ".75em")
            .attr("y", 6)
            .style("text-anchor", "end")
            .text("");


        // ——— LINES —————————————————————————————————————————————————————————
        // The lines will be using the date property from dataSorted.
        const line = d3.line()
            .x((d) => xScale(d.date))
            .y((d) => yScale(d.value));

        // Creates line 1-5
        let key = 0;
        const ids = () => `line-${key++}`;


        // ——— DRAW LINES ————————————————————————————————————————————————————
        const lines = svg.selectAll('lines')
            .data(dataSorted)
            .enter()
            .append('g')

        lines.append('path')
            .attr('class', ids)
            .attr('d', (d) => line(d.values));

    });
}



// ——— UTILITY ——————————————————————————————————————————————————————
function removeDigits(x, n) {
    return (x - (x % Math.pow(10, n))) / Math.pow(10, n);
}

function categorizeBy(data, type) {
    // destructure so the sensor_number = key, and get the value/time
    return data.reduce((arr, { [type]: key, value, time }) => {
        // uses the suffix (01-05) to get the index in the array.. hacky
        const index = (Number(key.slice(-2)) - 1);
        // object that we're inserting
        const values = { value, date: new Date(removeDigits(time, 6)) };
        // uses the existing array (arr[index].values) or a new empty one
        const target = arr[index] && arr[index].values || [];
        // add the values to the proper object in the array
        arr[index] = { key, values: target.concat(values) }
        return arr;
    }, []);
}   
  

    function loadBatteryData() {
        var tr = ''

        $.ajax({
            url: '/SmartBuild/GetBattery',
            method: 'GET',
            success: (result) => {
                $.each(result, (k, v) => {
                    tr = tr + `<tr>
                    <td>${v.time}</td>
                    <td>${v.name}</td>
                    <td>${v.sensor_number}</td>
                    <td>${v.sensor_type}</td>
                    <td>${v.value}</td>
                    </tr >`
                })
                $("#dataDump2").html(tr)
            },
            error: (error) => { console.log(error) }

        })
    }


    function loadHumidityData() {
        var tr = ''

        $.ajax({
            url: '/SmartBuild/GetHumidity',
            method: 'GET',
            success: (result) => {
                $.each(result, (k, v) => {
                    tr = tr + `<tr>
                    <td>${v.time}</td>
                    <td>${v.name}</td>
                    <td>${v.sensor_number}</td>
                    <td>${v.sensor_type}</td>
                    <td>${v.value}</td>
                    </tr >`
                })
                $("#dataDump3").html(tr)
            },
            error: (error) => { console.log(error) }

        })
    }

    function loadLuminanceData() {
        var tr = ''

        $.ajax({
            url: '/SmartBuild/GetLuminance',
            method: 'GET',
            success: (result) => {
                $.each(result, (k, v) => {
                    tr = tr + `<tr>
                    <td>${v.time}</td>
                    <td>${v.name}</td>
                    <td>${v.sensor_number}</td>
                    <td>${v.sensor_type}</td>
                    <td>${v.value}</td>
                    </tr >`
                })
                $("#dataDump4").html(tr)
            },
            error: (error) => { console.log(error) }

        })
    }

    function loadTemperatureData() {
        var tr = '';
        $.ajax({
            url: '/SmartBuild/GetTemperature',
            method: 'GET',
            success: (result) => {
                $.each(result, (k, v) => {
                    tr = tr + `<tr>
                    <td>${v.time}</td>
                    <td>${v.name}</td>
                    <td>${v.sensor_number}</td>
                    <td>${v.sensor_type}</td>
                    <td>${v.value}</td>
                    </tr >`
                });
                $("#dataDump5").html(tr)
            },
            error: (error) => { console.log(error) }
        })
    }

    d3.select('h1')

    