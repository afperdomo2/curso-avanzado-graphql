import * as avo from './avocado.resolver'
import * as scalars from './scalars'

export default {
  ...scalars,
  Query: {
    avos: avo.findAll,
    avo: avo.findOne,
  },
  Mutation: {
    createAvo: avo.createAvo,
  },
  Avocado: avo.resolver,
}
