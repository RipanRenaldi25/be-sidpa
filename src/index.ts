import app from "./Interfaces/app"

// routes
import authRoutes from './Interfaces/Routes/auth.route';
import userRoutes from './Interfaces/Routes/user.route';
import requestRouter from "./Interfaces/Routes/request.route";
import { userRepositoryConcrete } from "./Interfaces/Controllers/auth.controller";
import UserController from "./Interfaces/Controllers/user.controller";

// midlewares
import { authMidleware } from "./Interfaces/Midlewares/authMidleware";


const init = async () => {
    app.get('/', (req, res) => res.send('ok'))
    app.use('/auth', authRoutes);
    app.use('/user', authMidleware, userRoutes)
    app.use('/users', authMidleware, UserController.getUsers);
    app.use('/requests', authMidleware, requestRouter)

    await userRepositoryConcrete.seed({
        name: 'Admin',
        nik: '123',
        phoneNumber: '08123123123',
        roleId: '2',
        username: 'admin1',
        password: process.env.ADM_PW!
    });

    app.listen(+process.env.PORT_APP!, () => console.log(`Application Running on Port ${process.env.PORT_APP!}`));
};

init();