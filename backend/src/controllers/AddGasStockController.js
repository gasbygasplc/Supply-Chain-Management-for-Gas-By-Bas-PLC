

const addStock = async(req, res) => {

    try 
    {

        const {type , weightKG , price , totalStock , stockHistroy} = req.body;

        const imageFile = req.file;

        console.log({type , weightKG , price , totalStock , stockHistroy}, imageFile)


        
    } catch (error) 
    {


        
    }

}

export {addStock}