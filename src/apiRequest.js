const apiRequest = async (url = '',optionsObj = null ,errMsg = null) => {
    try{
        const res = await fetch(url,optionsObj)
        if(!res.ok) throw Error("Please Reload the page")
        //const listitems = await res.json();
    }
    catch(err){
        errMsg = err.message
    }
    finally{
        return errMsg
    }
}
export default apiRequest