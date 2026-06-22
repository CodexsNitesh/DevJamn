import express from "express"
import cors from "cors"
import authRoutes from "./modules/auth/auth.routes";

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

console.log("Imported auth routes:", authRoutes); 

app.use("/api/auth", authRoutes);



export default app;