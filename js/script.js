// data = d3.csv('./data/cities.csv', d=>{
//     return {
//         ...d,
//         eu: d.eu==='true',
//         population: +d.population,
//         x: +d.x,
//         y: +d.y
//     }
// }).then(data=>{
//     console.log('cities', data)
// })

data = d3.csv('./data/cities.csv', d3.autoType).then(data=>{
    EUdata = data.filter(d => d.eu === true);
    cityCount = 0
    EUdata.forEach(function(d) {
        cityCount++;
    });
    console.log('EU cities', EUdata)
    d3.select('.city-count').text('Number of cities in EU: ' + cityCount)

    const width = 700;
    const height = 550;
    const svg = d3.select('.population-plot').append('svg').attr('width', width).attr('height', height)
    svg.selectAll('circle')
        .data(EUdata)
        .enter()
        .append('circle')
        .attr('cx', d=>d.x)
        .attr('cy', d=>d.y)
        .attr('r', d=>d.population>1000000?8:4)
        .attr('fill', 'red')
    svg.selectAll('text')
        .data(EUdata)
        .enter()
        .append('text')
        .attr('x', d=>d.x)
        .attr('y', d=>d.y)
        .attr('dx', -8)
        .attr('dy', -9)
        .text(d=>{
            return (d.city + ', ' + d.country)
        })
        .attr('font-size', d=>d.population>1000000?11:0)
        .attr('text-anchor', middle)
})
