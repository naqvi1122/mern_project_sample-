import User from '../models/user.js';
import bcrypt from 'bcrypt'
async function userLogin  (req){
    const{name,email,password}=req.body

    console.log('function is clicked ')




    let checkuser=await User.findOne({email:email})
    if(checkuser){
        return {
            status: false,
            message: `user is already register `,
           
        }
   }
    
   console.log(name)
   const hashedpass=await bcrypt.hash(password,10);
   const createuser = User({
       name: name,
       email: email,
       password: hashedpass,
      
   })
   await createuser.save()
    return {
        status: true,
        message: `Administrator logged in successfully`,
        data: {createuser}
    }
}

export{userLogin}