
var Action={
    tokens(msg){
        return{
            type:"TOKEN",
            text:msg
        }
    },
    name(msg){
        return{
            type:"NAME",
            text:msg
        }
    },
    ids(msg){
        return{
            type:"IDS",
            text:msg
        }
    },
    userid(msg){
        return{
            type:"USER",
            text:msg
        }
    },
}

export default Action;