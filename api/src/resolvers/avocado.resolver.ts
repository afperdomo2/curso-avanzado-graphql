import type { Attributes, Avocado, PrismaClient, Prisma } from '@prisma/client'

type ResolverContext = {
  prisma: PrismaClient
}

export function findAll(
  parent: unknown,
  arg: { skip?: number; take?: number; where: Prisma.AvocadoWhereInput },
  context: ResolverContext
): Promise<Avocado[]> {
  return context.prisma.avocado.findMany({
    skip: arg.skip,
    take: arg.take,
    where: arg.where,
    include: { attributes: true },
  })
}

export function findOne(
  parent: unknown,
  args: { id: string },
  context: ResolverContext
): Promise<Avocado | null> {
  return context.prisma.avocado.findUnique({
    where: { id: parseInt(args.id, 10) },
    include: { attributes: true },
  })
}

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
