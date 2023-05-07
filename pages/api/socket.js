import { Server } from "socket.io";

import prisma from "@/prisma/client";

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);

  res.socket.server.io = io;

  io.on("connection", (socket) => {
    socket.on("create", async (room) => {
      socket.join(room);

      const data = await prisma.match.findUnique({
        where: {
          id: room,
        },
      });

      if (!data) {
        return;
      }
      socket.on("send-message", (obj) => {
        console.log(obj);
        io.to(room).emit("receive-message", obj);
      });
    });

    //return data;
  });

  console.log("Setting up");
  res.end();
}
