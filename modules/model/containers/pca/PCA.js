
import {PCA} from "./pca-lib.js"

export async function getPCA(data){    
    let vectors = PCA.getEigenVectors(data);
    console.log(vectors)
    let adData = PCA.computeAdjustedData(data,vectors[0])
    let compressed =  adData.formattedAdjustedData
    console.log(compressed)
    let returnedTable = {
        'columns':[{'PCA' : 'number'}],
        'data' : compressed} 
    return returnedTable
}


export async function getData(table){
    let columns = table['columns']
    let data = table['data']
    let index2remove = []

    //remove any columns that are not number
    for(let i = 0; i < Object.keys(columns).length; i++){
        let value = Object.values(columns[i])[0]
        if (value != 'number'){
            index2remove.push(i)
        }
    }
    
    let aux = 0
    for(index in index2remove){
        data.splice(index - aux,1)
        aux++
    }
    return data
}
