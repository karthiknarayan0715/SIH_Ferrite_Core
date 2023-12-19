
//FINDING A Object WITH AN ID OF id IN THE ARRAY data
const FindById = (data, id)=>{
    let ret = null
    data.forEach(element => {
        if(element.id === id){
            ret = data[data.indexOf(element)]
        }
    });
    return ret
}
//ADDS THE ELEMENT TO THE data ARRAY
const Add = (data, element)=>{
    data.push(element)
}

//REMOVES THE element FROM THE data ARRAY
const Remove = (data, e)=>{
    data.forEach(element => {
        if(element === e){
            data.splice(data.indexOf(e), 1)
            return data.indexOf(e)
        }
    });
    return -1
}


module.exports = {FindById, Add, Remove}