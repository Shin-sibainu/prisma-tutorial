const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

app.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(user);
});

app.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.create({
    data: {
      username: username,
      password: password,
    },
  });

  res.json(user);
});

// app.post("/createUsers", async (req, res) => {
//   const { userList } = req.body;
//   const users = await prisma.user.createMany({
//     data: userList,
//   });
//   res.json(users);
// });

app.put("/", async (req, res) => {
  const { id, username } = req.body;
  const updatedUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      username: username,
    },
  });
  res.json(updatedUser);
});

app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deletedUser = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(deletedUser);
});

app.listen(8000, () => {
  console.log("server running on 8000");
});
