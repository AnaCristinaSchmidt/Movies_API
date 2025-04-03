const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

// getAll
app.get('/', async (req, res) => {
  const data = await prisma.filme.findMany()
  res.status(200).json(data)
})

app.post('/create', async (req, res) =>{
  const data = await prisma.filme.create({
    data: {
      duracao: req.body.duracao,
      anoLancamento: req.body.anoLancamento,
      titulo: req.body.titulo,
      diretor: req.body.diretor,
      genero: req.body.genero,
      sinopse: req.body.sinopse
    }
  })
  res.status(201).json(data)
})

app.delete('/delete/:id', async (req, res) => {
  const data = await prisma.filme.delete({
    where: {
      id: Number(req.params.id)
    }
  })
  res.status(200).json(data)
})

app.patch('/atualizar/:id', async (req, res) => {
  const id = Number(req.params.id);
  
  const filmeAtualizado = await prisma.filme.update({
  
    where: { id:id},
      data: {
      duracao: req.body.duracao,
      anoLancamento: req.body.anoLancamento,
      titulo: req.body.titulo,
      diretor: req.body.diretor,
      genero: req.body.genero,
      sinopse: req.body.sinopse
      },
    });

    res.status(200).json(filmeAtualizado);
  
});
  
app.listen(port, ()=> {
  console.log('Rodando')
})