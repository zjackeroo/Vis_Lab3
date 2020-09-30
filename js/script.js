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

d3.csv('./data/cities.csv', d3.autoType).then(data=>{
    EUdata = data.filter(d => d.eu === true);
    cityCount = 0
    EUdata.forEach(d=>(cityCount++));
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
        .attr('fill', 'salmon')
    svg.selectAll('text.title')
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
        .attr('fill', 'darkslategray')
        .attr('text-anchor', 'start')
})

buildings_data = d3.csv('./data/buildings.csv', d3.autoType).then(buildings_data=>{
    sorted_buildings = buildings_data.sort((a,b)=>(b.height_m-a.height_m));
    console.log(sorted_buildings)

    const width = 1500;
    const height = 500;
    const svg = d3.select('.buildings-plot').append('svg').attr('width', width).attr('height', height)
    svg.selectAll('rect')
        .data(sorted_buildings)
        .enter()
        .append('rect')
        .attr('width', d=>d.height_px)
        .attr('height', 30)
        .attr('x', 250)
        .attr('y', (d,i)=>10+(i*40))
        .attr('fill', 'orange')
    svg.selectAll('text.name')
        .data(sorted_buildings)
        .enter()
        .append('text')
        .text(d=>d.building)
        .attr('x', 0)
        .attr('y', (d,i)=>30+(i*40))
        .attr('font-size', 15)
        .attr('text-anchor', 'start')
        .attr('fill', 'darkslategray')
    svg.selectAll('text.height')
        .data(sorted_buildings)
        .enter()
        .append('text')
        .text(d=>{
            return (d.height_ft + ' ft')
        })
        // .attr('dx', 200)
        .attr('x', d=>240+d.height_px)
        .attr('y', 0)
        .attr('dy', (d,i)=>30+(i*40))
        .attr('font-size', 15)
        .attr('fill', 'white')
        .attr('text-anchor', 'end')
})
