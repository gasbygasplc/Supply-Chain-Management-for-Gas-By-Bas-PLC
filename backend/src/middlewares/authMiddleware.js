import jwt from 'jsonwebtoken'; //import jwt to generate token

//============================================== Admin authendication middleware =============================================

const AuthAdmin = async(req , res , next) => {

    try 
    {

        const {atoken} = req.headers; //get the token from the headers

        if(!atoken) 
        {

            return res.json({success: false , message: "Access Denied"}); //if no token is provided then return this message

        }

        const tokenDecode = jwt.verify(atoken , process.env.JWT_SECRET); //verify the token

        if(tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD)
        {

            return res.json({success: false , message: "Invalid Token"}); //if token is invalid then return this message

        }

        next(); //if token is valid then call the next middleware
        
    } catch (error) 
    {

        console.log(error);

        res.json({success: false , message: error.message}); 
        
    }
}

export default AuthAdmin; //export the middleware