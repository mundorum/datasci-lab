import { Oid } from '/lib/oidlib-dev.js'
import { ValidateStddev } from './validateStddev.js'
import { TransformWeb } from '../transform.js'

export class StddevWeb extends TransformWeb {

    constructor(){
        super()
    }

    stddev(){
        this.value = this.df.column(this.column).std()
        let json = this.toSingleValue(this.value)
        this.status = true
        console.log(this.value, this.status)
        this._notify('stddevResult', json)
    }

    handleStddev (topic, message) {  //handle with notice
        
        //topic: stddev
        //message: stddevInput
 
        this.table = message
        this.toDataFrame()        //TODO add this as non-oid attributes
        this.file_id = message.file_id

        
        let validator = new ValidateStddev()

        let result = validator.validate(this.columns, this.column)
        if(result.isValid){
            this.stddev()
        } else {
            //return error message
            this.status = false
            this._notify('stddevError', result.result)
        }
    }
}

Oid.component(
{
  id: 'ts:stddev',
  element: 'stddev-oid',
  properties: {
    column: {default: null},
  },
  receive: {stddev: 'handleStddev'},
  implementation: StddevWeb
})