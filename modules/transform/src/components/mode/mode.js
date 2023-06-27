import { Oid } from '/lib/oidlib-dev.js'
import { ValidateMode } from './validateMode.js'
import { TransformWeb } from '../transform.js'

export class ModeWeb extends TransformWeb {

    constructor(){
        super()
    }
    
    // Função para calcular a moda
    calcularModa(arr) {
        let frequencia = {}
        let moda = []
        let max_frequencia = 0
        
        for (let i = 0; i < arr.length; i++) {
            const valor = arr[i]
            frequencia[valor] = (frequencia[valor] || 0) + 1
    
            if (frequencia[valor] > max_frequencia) {
                max_frequencia = frequencia[valor];
            }
        }
    
        for (const valor in frequencia) {
            if (frequencia[valor] === max_frequencia) {
                moda.push(Number(valor))
            }
        }
    
        return moda
    }


    mode(){
        this.value = this.calcularModa(this.df.column(this.column).values)
        this.toSingleValue(this.value,"Moda",this.column) 
        this.status = true
        this._notify('modeResult', this.result)
    }

    handleMode (topic, message) {  
        
 
        if(message.hasOwnProperty("value")){
            this.table = JSON.parse(message.value)
        } else {
            this.table = message
        }
        this.toDataFrame()        
        this.file_id = message.file_id

        let validator = new ValidateMode()
        
        let validation = validator.validate(this.columns, this.column)
        if(validation.isValid){
            this.mode()
        } else {
            this.status = false
            this._notify('modeError', validation.result)
        }
    }
    
}

Oid.component(
{
  id: 'ts:mode',
  element: 'mode-oid',
  properties: {
    column: {default: null},
    json_result: {default: null},
  },
  receive: {mode: 'handleMode'},
  implementation: ModeWeb
})