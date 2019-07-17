
var Tokens=(state=[],action)=>{
        switch (action.type) {
            case "TOKEN":
                let arr=[...state]
                arr.push(action.text)
                return arr
            default:
                return state
        }
    }


export default Tokens;