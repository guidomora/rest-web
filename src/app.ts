import { envs } from "./config/envs"
import { Server } from "./presentation/server"

(()=> {
    main()
})()

function main() {
    console.log('Hello World')
    const server = new Server({
        port: envs.PORT,
        public_path: envs.PUBLIC_PATH
    })

    server.start()
}