var User=(state='',action)=>{
    switch (action.type) {
        case "USER":
            let userid=''
            userid=action.text
            return userid
        default:
            return state
    }
}


export default User;