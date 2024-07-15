export const initialState = {
    user : null
};

export const actions ={
    SET_USER : "SET_USER"
}

const reducer = (state,action) =>{

    switch (action.type){
        case actions.SET_USER:
            return{
                user : action.user
            };
        default :
           return state ;
    }
};


export default reducer;