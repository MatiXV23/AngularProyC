import fastifyPlugin from "fastify-plugin";
import fastifyJWT from "@fastify/jwt";
import type { FastifyJwtNamespace, FastifyJWTOptions } from "@fastify/jwt";
import type { FastifyReply, FastifyRequest } from "fastify";
import type { Persona } from "../model/persona.ts";
import { UcuNoAdmin, UcuNoAutenticado } from "../model/errors.ts";

export default fastifyPlugin(async function (fastify) {
  const secret = process.env.FASTIFY_SECRET;

  const jwtOptions: FastifyJWTOptions = {
    secret: secret || "",
  };

  fastify.register(fastifyJWT, jwtOptions);

  fastify.decorate(
    "checkToken",
    async function (request: FastifyRequest, reply: FastifyReply) {
      await request.jwtVerify();
    }
  );
  fastify.decorate(
    "checkIsAdmin",
    async function (request: FastifyRequest, reply: FastifyReply) {
      await request.jwtVerify();
      if (!request.user) throw new UcuNoAutenticado();
      if (!request.user.roles.includes("admin")) throw new UcuNoAdmin("");
    }
  );

  // No me gusta ponerlo aca pero por el bien de la trama queda
  fastify.decorate(
    "checkIfIsSameUser",
    async function (request: any, reply: FastifyReply) {
      await request.jwtVerify();
      if (!request.user) throw new UcuNoAutenticado();
      if (request.user.id_persona !== request.params.id_persona) throw new UcuNoAdmin("");
    }
  );
});

declare module "fastify" {
  interface FastifyInstance
    extends FastifyJwtNamespace<{ namespace: "security" }> {
    checkToken(request: FastifyRequest, reply: FastifyReply): Promise<void>;
    checkIsAdmin(request: FastifyRequest, reply: FastifyReply): Promise<void>;
    checkIfIsSameUser(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: Persona;
    user: Persona;
  }
}
