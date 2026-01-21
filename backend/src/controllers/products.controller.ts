import type { Request, Response } from "express";
import { products } from "../data/prodcts";

export async function listProductsController(_req: Request, res: Response) {
  return res.status(200).json({
    products: products.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      image: p.image,
      price: p.unit_price,
      category: p.category,
    })),
  });
}
