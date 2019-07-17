var Name=(state='',action)=>{
    switch (action.type) {
        case "NAME":
            let name=''
            name=action.text
            return name
        case "IDS":
            let ids=''
            ids=action.text
            return ids
        default:
            return state
    }
}


export default Name;