import { Prisma } from '@prisma/client';
import { IProductFilterStrategy } from '../../types';

export class ProductStandardStrategy implements IProductFilterStrategy {
  public generateSQLFilter(whereConditions?: string): Prisma.Sql {
    whereConditions = whereConditions ? ('AND ' + whereConditions) : '';
    return Prisma.sql`
      SELECT
        p.id,
        p.name,
        p.description,
        p.price,
        p.club,
        p.category,
        p.age,
        p.gender,
        CASE
          WHEN c.id IS NOT NULL THEN JSON_AGG(JSON_BUILD_OBJECT('size', c.size, 'stockQuantity', c."stockQuantity"))
          WHEN f.id IS NOT NULL THEN JSON_AGG(JSON_BUILD_OBJECT('size', f.size, 'stockQuantity', f."stockQuantity"))
          WHEN a.id IS NOT NULL THEN JSON_AGG(JSON_BUILD_OBJECT('stockQuantity', a."stockQuantity"))
          ELSE '[]'::json
        END AS variants
      FROM
        public."Product" p
      LEFT JOIN
        public."Clothing" c ON p.id = c."productId"
      LEFT JOIN
        public."Footwear" f ON p.id = f."productId"
      LEFT JOIN
        public."Accessory" a ON p.id = a."productId"
      WHERE (c.id IS NOT NULL OR f.id IS NOT NULL OR a.id IS NOT NULL) ${Prisma.raw(whereConditions)}
      GROUP BY
        p.id, p.name, p.description, p.price, p.club, p.category, p.age, p.gender, c.id, f.id, a.id
    `;
  }
}
