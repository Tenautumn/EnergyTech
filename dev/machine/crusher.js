// [破碎机]Crusher
IDRegistry.genBlockID("crusher");
Block.createBlock("crusher",[
    {name:"Crusher",texture:[["machine_bottom",0],["crusher_top",0],["machine_side",0],["crusher",0],["machine_side",0],["machine_side",0]],inCreative:true}
],"opaque");
TileRenderer.setStandartModel(BlockID.crusher,[["machine_bottom",0],["crusher_top",0],["machine_side",0],["crusher",0],["machine_side",0],["machine_side",0]]);
TileRenderer.registerRotationModel(BlockID.crusher,0 ,[["machine_bottom",0],["crusher_top",0],["machine_side",0],["crusher",0],["machine_side",0],["machine_side",0]]);
TileRenderer.registerRotationModel(BlockID.crusher,4 ,[["machine_bottom",0],["crusher_top",1],["machine_side",0],["crusher",0],["machine_side",0],["machine_side",0]]);
TileRenderer.registerRotationModel(BlockID.crusher,8 ,[["machine_bottom",0],["crusher_top",1],["machine_side",0],["crusher",1],["machine_side",0],["machine_side",0]]);
TileRenderer.registerRotationModel(BlockID.crusher,12,[["machine_bottom",0],["crusher_top",1],["machine_side",0],["crusher",2],["machine_side",0],["machine_side",0]]);

ETMachine.setDrop("crusher",BlockID.machineCasing);
Callback.addCallback("PreLoaded",function(){
	Recipes.addShaped({id:BlockID.crusher,count:1,data:0},[
        "aba",
        "aca",
        "ded"
    ],[
        "a",ItemID.stickIron     ,0,
        "b",ItemID.electricMotor ,0,
        "c",ItemID.circuit       ,0,
        "d",ItemID.plateIron     ,0,
        "e",BlockID.machineCasing,0
    ]);
});

var GuiCrusher = new UI.StandartWindow({
    standart:{
        header:{text:{text:Translation.translate("Crusher")}},
        inventory:{standart:true},
        background:{standart:true}
    },
    drawing:[
        {type:"bitmap",x:900,y:400,bitmap:"logo",scale:GUI_SCALE},
        {type:"bitmap",x:350,y:75,bitmap:"energy_scale_0",scale:GUI_SCALE},
        {type:"bitmap",x:620,y:175 + GUI_SCALE,bitmap:"arrow_0",scale:GUI_SCALE},
		{type:"bitmap",x:700 - GUI_SCALE * 4,y:75 - GUI_SCALE * 4,bitmap:"info_scale_small",scale:GUI_SCALE}
    ],
    elements:{
        "slotInput":{type:"slot",x:350 + GUI_SCALE * 43,y:175,bitmap:"blank_slot",scale:GUI_SCALE},
        "scaleArrow":{type:"scale",x:620,y:175 + GUI_SCALE,direction:0,value:0.5,bitmap:"arrow_1",scale:GUI_SCALE},
        "slotOutput":{type:"slot",x:720,y:175,bitmap:"blank_slot",scale:GUI_SCALE,isValid:function(){return false;}},
        "textEnergy":{type:"text",font:GUI_TEXT,x:700,y:75,width:300,height:30,text:Translation.translate("Energy: ") + "0/0Eu"},
        "scaleEnergy":{type:"scale",x:350 + GUI_SCALE * 6,y:75 + GUI_SCALE * 6,direction:1,value:0.5,bitmap:"energy_scale_1",scale:GUI_SCALE}
    }
});

ETMachine.registerMachine(BlockID.crusher,{
    defaultValues:{
        meta:0,
        tier:2,
        progress:0,
        work_time:320,
        isActive:false,
        energy_consumption:4
    },

    tick:function(){
        var input = this.container.getSlot("slotInput"),
            recipe = ETRecipe.getMachineRecipeOutput("Crusher",input.id,input.data);

        if(recipe && this.data.energy >= this.data.energy_consumption){
            this.data.energy -= this.data.energy_consumption;
            this.data.progress += 1 / this.data.work_time;
            this.setActive(true);
            this.renderer();
            if(this.data.progress.toFixed(3) >= 1){
                this.setOutput("slotOutput",recipe.id,recipe.count,recipe.data),input.count--;
                this.container.validateAll();
                this.data.progress = 0;
            }
        } else if(this.data.progress > 0){
            this.data.progress -= 1 / this.data.work_time;
            this.setActive(false);
        }

        this.container.setScale("scaleEnergy",this.data.energy / this.getEnergyStorage());
        this.container.setScale("scaleArrow",Math.round(this.data.progress / 1 * 22) / 22);
        this.container.setText("textEnergy",Translation.translate("Energy: ") + this.data.energy + "/" + this.getEnergyStorage() + "Eu");
    },

    energyReceive:ETMachine.energyReceive,
    getGuiScreen:function(){return GuiCrusher;},
    getTransportSlots:function(){return {input:["slotInput"],output:["slotOutput"]};},
    renderer:function(){TileRenderer.mapAtCoords(this.x,this.y,this.z,this.id,this.data.meta + (this.data.isActive?(4 * Math.round(this.data.progress / 1 * 2)) + 4:0));},
});
TileRenderer.setRotationPlaceFunction(BlockID.crusher);