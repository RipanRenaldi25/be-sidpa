import app from "./Interfaces/app"

// authentication routes
import authRoutes from './Interfaces/Routes/auth.route';
app.get('/', (req, res) => res.send('ok'))
app.use('/auth', authRoutes);

app.listen(+process.env.PORT_APP!, () => console.log(`Application Running on PORT ${process.env.PORT_APP}`));