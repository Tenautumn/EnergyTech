Block.createSpecialType({
    base:5,
    opaque:false,
    destroytime:1
},"scaffold");

Renderer.renderScaffoldModel = function(id,data){
    var model = new BlockRenderer.Model();
    model.addBox(0,0.8125,0,1,1,1,id,data);
    model.addBox(0.0625,0.1875,0.0625,0.9375,0.8125,0.9375,id,data);
    model.addBox(0,0,0,1,0.1875,1,id,data);
    Renderer.registerRenderModel(id,0,model);

    var model = new BlockRenderer.Model();
    model.addBox(0,0.8125,0,1,1,1,id,data);
    model.addBox(0.0625,0,0.0625,0.9375,0.8125,0.9375,id,data);
    Renderer.registerRenderModel(id,1,model);
    
    var model = new BlockRenderer.Model();
    model.addBox(0.0625,0,0.0625,0.9375,1,0.9375,id,data);
    Renderer.registerRenderModel(id,2,model);
    
    var model = new BlockRenderer.Model();
    model.addBox(0.0625,0.1875,0.0625,0.9375,1,0.9375,id,data);
    model.addBox(0,0,0,1,0.1875,1,id,data);
    Renderer.registerRenderModel(id,3,model);

    Item.addCreativeGroup("scaffold",Translation.translate("Scaffold"),[id]);
}

// 木脚手架
IDRegistry.genBlockID("scaffoldWood");
Block.createBlock("scaffoldWood",[
    {name:"Wood Scaffold",texture:[["scaffold_wood_bottom",0],["scaffold_wood_top",0],["scaffold_wood_side",0]],inCreative:true}
],"scaffold");
Renderer.renderScaffoldModel(BlockID.scaffoldWood,0);

Machine.registerPrototype(BlockID.scaffoldWood,{
    defaultValues:{
        meta:0
    },

    tick:function(){
        this.deactive();

        var bottom = World.getBlock(this.x,this.y - 1,this.z).id;
        if(bottom == 0){World.destroyBlock(this.x,this.y,this.z,true);}
    },

    deactive:function(){
        var top = World.getBlock(this.x,this.y + 1,this.z).id,bottom = World.getBlock(this.x,this.y - 1,this.z).id;
        if(top != this.id && bottom != this.id){this.data.meta = 0;}
        if(top != this.id && bottom == this.id){this.data.meta = 1;}
        if(top == this.id && bottom == this.id){this.data.meta = 2;}
        if(top == this.id && bottom != this.id){this.data.meta = 3;}
        Renderer.mapAtCoords(this.x,this.y,this.z,this.id,this.data.meta);
    },

    destroy:function(){
        this.deactive();
        BlockRenderer.unmapAtCoords(this.x,this.y,this.z);
    }
});

// 铁脚手架
IDRegistry.genBlockID("scaffoldIron");
Block.createBlock("scaffoldIron",[
    {name:"Iron Scaffold",texture:[["scaffold_iron_bottom",0],["scaffold_iron_top",0],["scaffold_iron_side",0]],inCreative:true}
],"scaffold");
Renderer.renderScaffoldModel(BlockID.scaffoldIron,0);

Machine.registerPrototype(BlockID.scaffoldIron,{
    defaultValues:{
        meta:0
    },

    tick:function(){
        this.deactive();

        var bottom = World.getBlock(this.x,this.y - 1,this.z).id;
        if(bottom == 0){World.destroyBlock(this.x,this.y,this.z,true);}
    },

    deactive:function(){
        var top = World.getBlock(this.x,this.y + 1,this.z).id,bottom = World.getBlock(this.x,this.y - 1,this.z).id;
        if(top != this.id && bottom != this.id){this.data.meta = 0;}
        if(top != this.id && bottom == this.id){this.data.meta = 1;}
        if(top == this.id && bottom == this.id){this.data.meta = 2;}
        if(top == this.id && bottom != this.id){this.data.meta = 3;}
        Renderer.mapAtCoords(this.x,this.y,this.z,this.id,this.data.meta);
    },

    destroy:function(){
        this.deactive();
        BlockRenderer.unmapAtCoords(this.x,this.y,this.z);
    }
});

Callback.addCallback("PreLoaded",function(){
    Recipes.addShaped({id:BlockID.scaffoldWood,count:16,data:0},["aaa","bbb","aaa"],["a",5               ,-1,"b",280             ,0]);
    Recipes.addShaped({id:BlockID.scaffoldIron,count:16,data:0},["aaa","bbb","aaa"],["a",ItemID.plateIron,0 ,"b",ItemID.stickIron,0]);
});