import {combineReducers} from "redux";
import Tokens from "./Tokens"
import Name from "./Name"
import User from "./User"


var Reducer=combineReducers({
    token:Tokens,
    username:Name,
    userid:User,
})

export default Reducer;