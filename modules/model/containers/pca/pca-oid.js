import { html, Oid, OidUI  } from '/lib/oidlib-dev.js'
import {getPCA1dReduction, getPCA2dReduction, getData} from './PCA.js'


export class PcaOid extends OidUI {
  async applyPCA (topic, message) {
    let table = JSON.parse(JSON.stringify(message));
    this.data = await getData(table)
    if(this.target_dimension == 1){
      this.result = await getPCA1dReduction(this.data)
    }
    else{
      this.result = await getPCA2dReduction(this.data)
    }
    console.log('this.result que sera publicado: ', this.result)
    this._notify("transformed", this.result);
  }
  
}

Oid.component(
{
  id: 'ml:apply-pca',
  element: 'ml-apply-pca',
  properties: {
    data: {default:  [[40,50,60],[50,70,60],[80,70,90],[50,60,80]]},
    target_dimension: {default: 1}
  },
  receive: {transform: 'applyPCA'},
  template: html`<h1>data returned: {{this.result}} </h1>`,
  implementation: PcaOid,
});