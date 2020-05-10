import 'dotenv/config'
import server from './server'

const port: number | string = process.env.PORT || 8000

server.listen(port, () =>
  console.log(`\n🚀 Server listening on port: ${port} 🚀\n`)
)
