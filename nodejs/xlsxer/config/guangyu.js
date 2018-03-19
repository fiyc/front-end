module.exports = {
    sheetMappings:{
        "Sheet1" : "tb_variable"
    },
    columnHanders:{
        "地址 (读取)" : function(hook, value){
            var pre = value.substring(0,2);
            var las = value.substring(2);
            
            var memoryLocation = Number(pre) * 16 + Number(las);

            if(!hook.firstMemoryLocation){
                hook.firstMemoryLocation = memoryLocation;

                return {
                    startBit : 0,
                    endBit : 0
                }
            }else{
                var startBit = memoryLocation - hook.firstMemoryLocation ;
                return{
                    startBit : startBit,
                    endBit : startBit
                }
            }


        },
        "内容" : function(hook, value){
            return{
                content:value,
            }
        }
    }
};