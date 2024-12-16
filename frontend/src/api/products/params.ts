import type { GetAgeDTO, GetGenderDTO, GetCategoryDTO } from '@/api';

export type GetProductsQueryParams = {
  category: GetCategoryDTO;
  age: GetAgeDTO;
  gender: GetGenderDTO;
};
