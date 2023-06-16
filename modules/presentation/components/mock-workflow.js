import { Oid, OidUI } from "/lib/oidlib-dev.js";

const mockGraph = {
  nodes: [
    {
      id: 0,
      type: "template1-oid",
      region: "template",
      attributes: {},
    },
    {
      id: 1,
      type: "mock-component-oid",
      region: "region1",
      attributes: {},
    },
    {
      id: 2,
      type: "mock-component-oid",
      region: "region2",
      attributes: {},
    },
    {
      id: 3,
      type: "mock-component-oid",
      region: "region3",
      attributes: {},
    },
    {
      id: 4,
      type: "mock-component-oid",
      region: "region4",
      attributes: {},
    },
  ],
  edges: [
    [1, 3],
    [2, 3],
  ],
};

export class MockWorkflowComponent extends OidUI {
  handleTabChanged(_, message) {
    if (message.value == "presentation") {
      this._notify("returnJSONHTML", { value: mockGraph });
    }
  }
}

Oid.component({
  id: "presentation:mock-workflow",
  element: "mock-workflow-oid",
  receive: ["tabChanged"],
  implementation: MockWorkflowComponent,
});
