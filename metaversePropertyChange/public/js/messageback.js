var WEBSOCKET_PING_URL = "8082 websocket server";
var TEST_MESSAGE = "Hello edited";

print("Create WebSocket");
var webSocket = new WebSocket(WEBSOCKET_PING_URL);

webSocket.onmessage = function(data) {
    print("Message received:", data.data);
	if(data.data === 'create'){
		var entityID1 = Entities.findEntitiesByName("ScriptBox",MyAvatar.position, 10, false);
		if(entityID1.length>0){
			webSocket.send("Entity with the name ScriptBox already exists ");
		}
		else{
			var position = Vec3.sum(MyAvatar.position, Quat.getFront(MyAvatar.orientation));
			var properties = {
				type: "Box",
				name: "ScriptBox",
				position: position,
				color: { red: 255, green: 255, blue: 255 }
			};
			var entityID = Entities.addEntity(properties);
			print("Entity color: " + JSON.stringify(properties.color));
			webSocket.send("created the object");
		}
	}
	if(data.data === 'red'){
		var entityID1 = Entities.findEntitiesByName("ScriptBox",MyAvatar.position, 10, false);
		print("Number of entities with the name ScriptBox: " + entityID1.length);
		var currentColor = Entities.getEntityProperties(entityID1[0], ["color"]).color;
		if (currentColor.red === 255 && currentColor.green === 0 && currentColor.blue === 0) {
			print("Entity is already red.");
			webSocket.send("Entity is already red.");
		}else{
			Script.setTimeout(function () { // Wait for the entity to be created before editing.
				Entities.editEntity(entityID1[0], {
					color: { red: 255, green: 0, blue: 0 }
				});
				print(entityID1);
				var properties = Entities.getEntityProperties(entityID1[0], ["color"]);
				print("Entity color: " + JSON.stringify(properties.color));
				webSocket.send("Now the object color is changed to red");
			}, 50);	
		}	
	}
	if(data.data === 'blue'){
		var entityID1 = Entities.findEntitiesByName("ScriptBox",MyAvatar.position, 10, false);
		print("Number of entities with the name ScriptBox: " + entityID1.length);
		var currentColor = Entities.getEntityProperties(entityID1[0], ["color"]).color;
		if (currentColor.red == 0 && currentColor.green == 0 && currentColor.blue == 255) {
			print("Entity is already blue.");
			webSocket.send("Entity is already blue.");
		}else{
			Script.setTimeout(function () { // Wait for the entity to be created before editing.
				Entities.editEntity(entityID1[0], {
					color: { red: 0, green:0 , blue: 255 }
				});
				print(entityID1);
				var properties = Entities.getEntityProperties(entityID1[0], ["color"]);
				print("Entity color: " + JSON.stringify(properties.color));
				webSocket.send("Now the object color is changed to blues");
			}, 50);	
		}
	}
	if(data.data === 'green'){
		var entityID1 = Entities.findEntitiesByName("ScriptBox",MyAvatar.position, 10, false);
		print("Number of entities with the name ScriptBox: " + entityID1.length);
		var currentColor = Entities.getEntityProperties(entityID1[0], ["color"]).color;
		if (currentColor.red === 0 && currentColor.green === 255 && currentColor.blue === 0) {
			print("Entity is already green.");
			webSocket.send("Entity is already green.");
		}else{
			Script.setTimeout(function () { // Wait for the entity to be created before editing.
				Entities.editEntity(entityID1[0], {
					color: { red: 0, green: 255, blue: 0 }
				});
				print(entityID1);
				var properties = Entities.getEntityProperties(entityID1[0], ["color"]);
				print("Entity color: " + JSON.stringify(properties.color));
				webSocket.send("Now the object color is changed to green");
			}, 50);	
		}	
	}
	if(data.data === 'delete'){
		var entityID1 = Entities.findEntitiesByName("ScriptBox",MyAvatar.position, 10, false);
		if(entityID1.length>0){
			Entities.deleteEntity(entityID1[0]);
			webSocket.send("Entity with the name ScriptBox Deleted ");
		}
		else{
			webSocket.send("Entity with the name ScriptBox doesnot exists for deletion ");
		}
	}
};

