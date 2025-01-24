import jwt from 'jsonwebtoken';

const userMiddleWare = async(req  , res , next ) => {

    const {token} = req.body;

    if(!token)
    {

        return res.json({success: false , message: "Access Denied"});

    }

    try 
    {

        const decode = jwt.verify(token , process.env.JWT_SECRET);

        req.body.userId = decode.id;

        next()


    } catch (error) 
    {

        console.log(error);

        res.json({success:false , message:"Error"});
        
    }

}

export default userMiddleWare