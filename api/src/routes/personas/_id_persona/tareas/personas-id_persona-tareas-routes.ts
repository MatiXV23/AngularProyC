import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@fastify/type-provider-typebox";
import { Persona } from "../../../../model/persona.ts";
import { findTareasById, createTarea, deleteTareaById, getNuevoIdTarea } from "../../../../services/tareas.ts";
import { Tarea } from "../../../../model/tarea.ts";

const personasRoutes: FastifyPluginAsyncTypebox = async function (fastify) {
  fastify.get(
      "/",
      {
        schema: {
          tags: ["personas", "tareas"],
          params: Type.Pick(Tarea, ["id_persona"]),
          response: {
            200: Type.Array(Tarea),
          },
          security: [
                { bearerAuth: [] }
          ]
        },
        preHandler: fastify.checkIfIsSameUser
      },
      async function (req, rep) {
        return findTareasById(req.params.id_persona);
      }
    );

  fastify.post(
      "/",
      {
        schema: {
          tags: ["personas", "tareas"],
          params: Type.Pick(Tarea, ["id_persona"]),
          body: Type.Pick(Tarea, ["titulo"]),
          response: {
            204: Type.Null(),
          },
          security: [
                { bearerAuth: [] }
          ]
        },
        preHandler: fastify.checkIfIsSameUser
      },
      async function (req, rep) {
        const tarea:Tarea = {
          id_persona: req.params.id_persona,
          id_tarea: getNuevoIdTarea(),
          titulo: req.body.titulo
        }
      
        createTarea(tarea);
        rep.code(204).send()
      }
    );
  
  fastify.delete(
      "/:id_tarea",
      {
        schema: {
          tags: ["personas", "tareas"],
          params: Type.Pick(Tarea, ["id_persona", "id_tarea"]),
          response: {
            204: Type.Null(),
          },
          security: [
                { bearerAuth: [] }
          ]
        },
        preHandler: fastify.checkIfIsSameUser
      },
      async function (req, rep) {
        deleteTareaById(req.params.id_tarea);
        rep.code(204).send()
      }
    );
};

export default personasRoutes;
