const User = require('./../Models/User')
const { StatusCodes } = require('http-status-codes');

const register = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Please provide all the fields !' });
        return;
    }

    let status, resposnse = {};
    try {
        const user = await User.create({ ...req.body })
        const token = user.createJWT()
        status = StatusCodes.CREATED;
        resposnse.user = { name: user.name };
        resposnse.token = token;
        // res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
    } catch (error) {
        console.log(error);
        status = StatusCodes.INTERNAL_SERVER_ERROR;
        resposnse = { error };
        // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:'Internal server error'});
    }
    res.status(status).json(resposnse);

}


const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: `Please provide email and passwaord` });
        return;
    }

    const user = await User.findOne({ email })

    if (!user) {
        res.status(StatusCodes.UNAUTHORIZED).json({ msg: `Invalid Credentials` });
        return;
    }

    const isCorrectPassword = await user.comparePassword(password)

    if (!isCorrectPassword) {
        res.status(StatusCodes.UNAUTHORIZED).json({ msg: `Invalid Password` });
        return;
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

module.exports = {
    register,
    login
}