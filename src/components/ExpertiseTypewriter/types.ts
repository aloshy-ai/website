export type ExpertiseContent = {
  frontend: string
  backend: string
  development: string
}

export type NicheType = keyof ExpertiseContent

export type TechColor = {
  [key: string]: string
}
