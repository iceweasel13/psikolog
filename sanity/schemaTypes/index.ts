import { type SchemaTypeDefinition } from 'sanity'
import { navbarType } from './navbar'
import { heroType,  } from './hero'
import { aboutType } from './about'
import { servicesType } from './services'
import { educationType } from './education'
import { reviewsType } from './revioews'
import { contactType } from './contact'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [navbarType, heroType, aboutType, servicesType, reviewsType, educationType, contactType,],
}
