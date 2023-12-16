import app from "./Interfaces/app"

// routes
import authRoutes from './Interfaces/Routes/auth.route';
import userRoutes from './Interfaces/Routes/user.route';
import requestRouter from "./Interfaces/Routes/request.route";

// midlewares
import { authMidleware } from "./Interfaces/Midlewares/authMidleware";


app.get('/', (req, res) => res.send('ok'))
app.use('/auth', authRoutes);
app.use('/user', authMidleware, userRoutes)
app.use('/requests', authMidleware, requestRouter)

app.listen(+process.env.PORT_APP!, () => console.log(`Application Running on PORT ${process.env.PORT_APP}`));