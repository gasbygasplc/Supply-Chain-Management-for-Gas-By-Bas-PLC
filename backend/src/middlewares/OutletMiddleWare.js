import jwt from 'jsonwebtoken';

const authOutlet = async(req , res , next) => {

    try 
    {

        const Otoken = req.headers;

        if(!Otoken)
        {

            return res.json({success:false , message: "Not Authorized Login Again"});

        }

        const tokenDecode = jwt.verify(Otoken, process.env.JWT_SECRET);

        req.body.outletId = tokenDecode.id;

        next();
        
    } catch (error) 
    {
        
        console.log(error);

        res.json({success: false , message: error.message});

    }

}

export default authOutlet;