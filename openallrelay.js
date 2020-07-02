module.exports = function(RED) {

    "use strict";

    function OpenAllRelaysNode(config) {
        RED.nodes.createNode(this,config);

        var node = this
        
        node.on('input', function(msg, send, done) {
            var globalContext = node.context().global;
            var exportMode = globalContext.get("exportMode");
            var currentMode = globalContext.get("currentMode");
            var command = {
                type: "mux_modular_V1.0",
                slot: 1,
                method: "open_all_relays"
            }
            var file = globalContext.get("exportFile")
            var slot = globalContext.get("slot");
            if(currentMode == "test"){file.slots[slot].jig_test.push(command)}
            else{file.slots[slot].jig_error.push(command)}
            globalContext.set("exportFile", file);
            // node.status({fill:"green", shape:"dot", text:"done"}); // seta o status pra waiting
            // msg.payload = command
            send(msg)
        });
        
    }
    RED.nodes.registerType("open_all_relays", OpenAllRelaysNode);

}    