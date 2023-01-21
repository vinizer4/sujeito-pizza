import prismaCliente from "../../prisma";

interface ItemRequest {
  item_id: string;
}

class RemoveItemService {
  async execute({ item_id }: ItemRequest) {
    if (!item_id) {
      throw new Error("item_id is required");
    } else {
      const order = await prismaCliente.item.delete({
        where: {
          id: item_id,
        },
      });

      return order;
    }
  }
}

export { RemoveItemService };
