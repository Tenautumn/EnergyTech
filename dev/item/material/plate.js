ETRecipe.addPlateRecipe = function(output,input){
    ETRecipe.addHammerRecipe(output,[{id:input[0].id,data:input[0].data}]);
    ETRecipe.addCompressorRecipe(output,{id:input[0].id,count:1,data:input[0].data});
}

IDRegistry.genItemID("plateCopper");
Item.createItem("plateCopper","Copper Plate",{name:"copper_plate"});

IDRegistry.genItemID("plateTin");
Item.createItem("plateTin","Tin Plate",{name:"tin_plate"});

IDRegistry.genItemID("plateIron");
Item.createItem("plateIron","Iron Plate",{name:"iron_plate"});

IDRegistry.genItemID("plateSteel");
Item.createItem("plateSteel","Steel Plate",{name:"steel_plate"});

IDRegistry.genItemID("plateGold");
Item.createItem("plateGold","Gold Plate",{name:"gold_plate"});

IDRegistry.genItemID("plateCarbon");
Item.createItem("plateCarbon","Carbon Plate",{name:"carbon_plate"});

IDRegistry.genItemID("plateTungsten");
Item.createItem("plateTungsten","Tungsten Plate",{name:"tungsten_plate"});

IDRegistry.genItemID("plateLeadAntimony");
Item.createItem("plateLeadAntimony","Lead-Antimony Plate",{name:"lead_antimony_plate"});

Callback.addCallback("PreLoaded",function(){
    ETRecipe.addPlateRecipe({id:ItemID.plateCopper      ,count:1,data:0},[{id:ItemID.ingotCopper      ,data:0}]);
    ETRecipe.addPlateRecipe({id:ItemID.plateTin         ,count:1,data:0},[{id:ItemID.ingotTin         ,data:0}]);
    ETRecipe.addPlateRecipe({id:ItemID.plateIron        ,count:1,data:0},[{id:265                     ,data:0}]);
    ETRecipe.addPlateRecipe({id:ItemID.plateSteel       ,count:1,data:0},[{id:ItemID.ingotSteel       ,data:0}]);
    ETRecipe.addPlateRecipe({id:ItemID.plateGold        ,count:1,data:0},[{id:266                     ,data:0}]);
    ETRecipe.addPlateRecipe({id:ItemID.plateCarbon      ,count:1,data:0},[{id:BlockID.blockCarbon     ,data:0}]);
    ETRecipe.addPlateRecipe({id:ItemID.plateTungsten    ,count:1,data:0},[{id:BlockID.blockTungsten   ,data:0}]);
    ETRecipe.addPlateRecipe({id:ItemID.plateLeadAntimony,count:1,data:0},[{id:ItemID.ingotLeadAntimony,data:0}]);
});