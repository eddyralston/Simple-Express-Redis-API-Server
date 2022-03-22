import { createClient } from 'redis';
import express from 'express'
import cors from 'cors'


const redis = createClient({ url: 'redis://localhost:6379' });
await redis.connect();

const server = express();

server.use(cors())
server.use(express.json())
server.use(express.static('public'))

server.use('/api', ((api) => {

   api.get('/:key', async (req, res) => {
      var { key } = req.params
      const value = await redis.get(key);
      res.send(value)
   })

   api.post('/:key', async (req, res) => {
      var { key } = req.params
      await redis.set( key , JSON.stringify(req.body) );
      res.send({[key]:req.body})
   })

   api.put('/:key', async (req, res) => {
      var { key } = req.params
      var value = JSON.parse(await redis.get(key))
      if (Array.isArray(value)){
         value.push(req.body)
         await redis.set( key , JSON.stringify(value) );
      } else {
         await redis.set( key , JSON.stringify([]) );
      }
      res.send({[key]:value})
   })
   return api

})(express.Router()));


server.listen(3000, function () {
   console.log("listening on port " + this.address().port)
})