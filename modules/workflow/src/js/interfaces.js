import { Oid } from "../../../../lib/oidlib-dev.js";

Oid.cInterface ({
    id: 'itf:node-view',
    operations: ['getPosition', 'setPosition', 'getUserFields','getInputParameterValue','setInputParameterValue'],
    cardinality: '1:1',
    response: false
});
    /*Interfaces:

    ISpaceTransform 
    'handleGetPosition', 'hangleSetPosition'

    IHasUserFields
    'handleGetUserFields'
    
    IUserInputFields
    'handleGetInputParameterValue','handleSetInputParameterValue'

    IConnectableComponent
    'handleMakeConnectionTo' , 'handleReceiveConnectionFrom' , 'handleGetParentComponentType'

    */

Oid.cInterface ({
    id: 'itf:component-provider',
    operations: ['getAllComponents', 'getComponentInfo'],
    cardinality: '1:n',
    response: true
});
