import dotenv from "dotenv"
import { app } from "./express"

dotenv.config()

const port: number = parseInt(process.env.PORT as string, 10) || 3000


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})