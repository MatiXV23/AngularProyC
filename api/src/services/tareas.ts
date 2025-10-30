import { UcuNoEncontrado } from "../model/errors.ts";
import {Tarea } from "../model/tarea.ts";


const tareas:Tarea[] = [
  {
    id_tarea: 1,
    id_persona: 3,
    titulo: "Pasear perro",
  },
  {
    id_tarea: 2,
    id_persona: 3,
    titulo: "Cocinar",
  },
  {
    id_tarea: 3,
    id_persona: 4,
    titulo: "Ir al gim",
  },
  {
    id_tarea: 4,
    id_persona: 4,
    titulo: "Bañarse",
  },
];
let nuevoIdTarea = 5

export function getNuevoIdTarea() {
  return nuevoIdTarea
}
export const findTareasById = async function (id: number){
  const tareasDeUsuario: Tarea[] = []

  tareas.forEach((t)=> {
    if (t.id_persona === id) tareasDeUsuario.push(t)
  })

  if (tareasDeUsuario.length === 0) throw new UcuNoEncontrado(`Tareas para el usuario ${id}`)
  return tareasDeUsuario
}


export const updateTareaById = async function (id: number, upadted:Tarea){
  const tareaIdx = tareas.findIndex((t)=>t.id_tarea===id)

  if (tareaIdx === -1) throw new UcuNoEncontrado(`Tarea de id: ${id}`)
  tareas[tareaIdx] = upadted
}

export const createTarea = async function (created:Tarea){
  tareas.push(created)
  nuevoIdTarea++
}


export const deleteTareaById = async function (id: number){
  const tareaIdx = tareas.findIndex((t)=>t.id_tarea===id)

  if (tareaIdx === -1) throw new UcuNoEncontrado(`Tarea de id: ${id}`)
  tareas.splice(tareaIdx, 1)
}