var WEBSOCKET_PING_URL = "8080 webscoket Url";
var TEST_MESSAGE = "Hello edited";

print("Create WebSocket");
var webSocket = new WebSocket(WEBSOCKET_PING_URL);

webSocket.onmessage = function(data) {
    print("Message received:", JSON.stringify(data.data));
	const jsonString =data.data;
	

	const parsedData = JSON.parse(jsonString);
	const exitData = parsedData.data.data;
	console.log("exit data is " + exitData)
	
	if(exitData === 'pass'){
		 var properties = Entities.findEntitiesByName("quizbrowsertest",MyAvatar.position, 20, false);
		 print(properties[0]);
            if (properties[0]) {
				userData="hifi://upb-ddi/-57.8852,1.24982,-14.6115/0,0.604237,0,0.796804";
                var portalDestination = properties[0].userData;
				print("portalDestination" + portalDestination)
                Window.location = "hifi://upb-ddi/-73.27,9.50195,-19.2313/0,-0.0273965,0,0.999625";
            }
			
	}
	if(exitData === 'exit'){
		 var properties = Entities.findEntitiesByName("quizbrowsertest",MyAvatar.position, 20, false);
		 print(properties[0]);
            if (properties[0]) {
				userData="hifi://upb-ddi/-57.8852,1.24982,-14.6115/0,0.604237,0,0.796804";
                var portalDestination = properties[0].userData;
				print("portalDestination" + portalDestination)
				//Window.location = "hifi://upb-ddi/-73.27,9.50195,-19.2313/0,-0.0273965,0,0.999625";
                Window.location = "hifi://upb-ddi/-57.8852,1.24982,-14.6115/0,0.604237,0,0.796804";
            }
			
	}
};