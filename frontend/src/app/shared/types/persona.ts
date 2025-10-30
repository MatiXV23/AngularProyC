export type Persona = {
  id_persona: number,
  username: string,
  roles: string[]
}

export type PersonaSinId = Omit<Persona, 'id_persona'>