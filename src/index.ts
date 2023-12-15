import app from "./Interfaces/app"

// routes
import authRoutes from './Interfaces/Routes/auth.route';
import userRoutes from './Interfaces/Routes/user.route';

// midlewares
import { authMidleware, authorizationMidleware } from "./Interfaces/Midlewares/authMidleware";


app.get('/', (req, res) => res.send('ok'))
app.use('/auth', authRoutes);
app.use('/user', authMidleware, authorizationMidleware(['Admin']), userRoutes)

app.listen(+process.env.PORT_APP!, () => console.log(`Application Running on PORT ${process.env.PORT_APP}`));