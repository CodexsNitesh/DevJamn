import express from "express"
import cors from "cors"
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/users/users.routes";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Developer Collaboration Hub API"
    })
});


app.use("/api/auth", authRoutes);
app.use("/api/users",  userRoutes)


export default app;