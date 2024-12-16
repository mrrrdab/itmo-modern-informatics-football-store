import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addProductToCart } from '@/api';
import type { ApiError, AddProductToCartDTO } from '@/api';

export const useAddProductsToCartMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void[], ApiError, AddProductToCartDTO[]>({
    mutationKey: ['cart'],
    mutationFn: (data: AddProductToCartDTO[]) => Promise.all(data.map(productData => addProductToCart(productData))),
    retry: 3,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
