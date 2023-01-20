export type MyEvent = {
    age: number
    score: number
    title: string
    text: string
  }
  
  export type MyHistory = {
    title: string
    events: MyEvent[]
  }
  
  export type Member = {
    id: string
    name: string
    email: string
    profile: string
    created: string
    updated: string
  }
  
  export type MyImage = {
    title: string
    pass: string
  }

  export type MyLink = {
    title: string
    pass: string
    url: string
  }