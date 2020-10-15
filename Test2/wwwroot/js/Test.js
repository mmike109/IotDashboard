$(() => {
    let connection = new signalR.HubConnectionBuilder().withUrl("/signalServer").build();
    connection.start()
    connection.on("refreshBarometric", function () {
        loadData('/Test/GetBarometric');
        loadBatteryData();
        loadHumidityData();
        loadLuminanceData();
        loadTemperatureData();
    })



    loadData('/Test/GetBarometric');
    loadBatteryData();
    loadHumidityData();
    loadLuminanceData();
    loadTemperatureData();
})

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
        url: '/Test/GetBattery',
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
            $("#dataDump6").html(tr)
        },
        error: (error) => { console.log(error) }

    })
}


function loadHumidityData() {
    var tr = ''

    $.ajax({
        url: '/Test/GetHumidity',
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
            $("#dataDump7").html(tr)
        },
        error: (error) => { console.log(error) }

    })
}

function loadLuminanceData() {
    var tr = ''

    $.ajax({
        url: '/Test/GetLuminance',
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
            $("#dataDump8").html(tr)
        },
        error: (error) => { console.log(error) }

    })
}

function loadTemperatureData() {
    var tr = '';
    $.ajax({
        url: '/Test/GetTemperature',
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
            $("#dataDump9").html(tr)
        },
        error: (error) => { console.log(error) }
    })
}

d3.select('h1')

