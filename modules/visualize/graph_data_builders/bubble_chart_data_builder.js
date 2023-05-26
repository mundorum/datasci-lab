export function buildBubbleChartData(rawData, fields){
    let data = {
        datasets: [
            {
                label: 'TODO',
                data: [
                ]
            }
        ]
    };
    rawData['data'].forEach(row => {
        let bubble = {
            x: row[fields['x']],
            y: row[fields['y']],
            r: row[fields['r']],
        };
        console.log(bubble)
        data['datasets'][0]['data'].push(bubble);
    });
    return data;
}