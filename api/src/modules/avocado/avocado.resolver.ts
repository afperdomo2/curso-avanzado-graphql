import type { Attributes, Avocado, PrismaClient } from '@prisma/client'

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

export function createAvo(
  parent: unknown,
  { data }: { data: Pick<Avocado, 'name' | 'price' | 'image'> & Attributes },
  context: ResolverContext
): Promise<Avocado> {
  console.log('data:', data)
  const { name, price, image, ...attributes } = data

  return context.prisma.avocado.create({
    data: {
      name,
      price,
      image,
      sku: new Date().getTime().toString(),
      attributes: {
        create: {
          ...attributes,
        },
      },
    },
    include: { attributes: true },
  })
}
