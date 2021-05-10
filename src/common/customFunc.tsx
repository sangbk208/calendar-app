
export const convertDate=(date:any)=> {
    return date.year+'-'+date.month+'-'+date.date;
}

export const dateToStringInModal=(date:any, type:string)=> {
    const mMonth = date.month+1 <10 ? '0'+(date.month+1):(date.month+1).toString();
    if (type==='month'){
        return date.year+'-'+mMonth;
    }
    const mDate = date.date <10 ? '0'+(date.date):(date.date).toString();
    return date.year+'-'+mMonth+'-'+mDate;
}

export const convertTime=(date:any)=> {
    const hours = date.getHours()<10?'0'+date.getHours():date.getHours().toString();
    const minutes = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes().toString();
    return hours+':'+minutes;
}

export const convertDataInRedux=(date:string)=> {
    const array = date.split('-');
    const month = Number(array[1]) -1;
    return Number(array[0])+'-'+month+'-'+Number(array[2]);
}

export const uniqueID =()=> {
    return Math.floor(Math.random() * Date.now())
}

export const getIndex =(array:any, id:number)=> {
    return array.map((item:any)=>item.id).indexOf(id)
}