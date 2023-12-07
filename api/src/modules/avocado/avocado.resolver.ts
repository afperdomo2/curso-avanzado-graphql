import { createHash } from 'crypto'
import { baseModelResolver } from '../base/base.resolver'
import type { Avocado, Attributes, PrismaClient } from '@prisma/client'

type ResolverContext = {
  prisma: PrismaClient
}

export function findAll(
  parent: unknown,
  arg: unknown,
  context: ResolverContext
): Promise<Avocado[]> {
  return context.prisma.avocado.findMany()
}

// export function findOne(id: string): Avocado | null {
//   return avos[0]
// }

export const resolver: Record<
  keyof Avocado & { attributes: Attributes },
  (parent: Avocado & { attributes: Attributes }) => unknown
> = {
  id: (parent: any) => parent.id,
  createdAt: (parent: any) => parent.createdAt,
  updatedAt: (parent: any) => parent.updatedAt,
  deletedAt: (parent: any) => parent.deletedAt,
  sku: (parent: any) => parent.sku,
  name: (parent: any) => parent.name,
  price: (parent: any) => parent.price,
  image: (parent: any) => parent.image,
  attributes: (parent: any) => ({
    description: parent.attributes.description,
    shape: parent.attributes.shape,
    hardiness: parent.attributes.hardiness,
    taste: parent.attributes.taste,
  }),
}

// export function createAvo(
//   parent: unknown,
//   {
//     data,
//   }: { data: Pick<Avocado, 'name' | 'price' | 'image'> & Avocado['attributes'] }
// ): Avocado {
//   const currentLength = avos.length
//   const newAvo: Avocado = {
//     id: String(currentLength + 1),
//     sku: createHash('sha256')
//       .update(data.name, 'utf8')
//       .digest('base64')
//       .slice(-6),
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     deletedAt: undefined,
//     name: data.name,
//     price: data.price,
//     image: data.image,
//     attributes: {
//       description: data.description,
//       shape: data.shape,
//       hardiness: data.hardiness,
//       taste: data.taste,
//     },
//   }

//   avos.push(newAvo)
//   return newAvo
// }
