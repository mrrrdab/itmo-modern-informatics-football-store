/* eslint-disable max-len */
import React, { useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { FOOTBALL_CLUBS, FOOTBALL_CLUBS_LABELS } from '@/constants';
import type { ApiError, GetAgeDTO, GetCategoryDTO, GetGenderDTO, GetProductsQueryParams } from '@/api';
import { useGetCartQuery, useGetProductsQuery } from '@/hooks';
import {
  ErrorMessage,
  FiltersSection,
  ProductCard,
  ProductSizeChoiceModal,
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components';

export const CatalogPage = () => {
  const location = useLocation();
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const initialFilters = useMemo(
    () => ({
      category: (queryParams.get('category') as GetCategoryDTO) || DEFAULT_FILTERS.category,
      age: (queryParams.get('age') as GetAgeDTO) || DEFAULT_FILTERS.age,
      gender: (queryParams.get('gender') as GetGenderDTO) || DEFAULT_FILTERS.gender,
    }),
    [queryParams],
  );

  const [filters, setFilters] = useState<GetProductsQueryParams>(initialFilters);

  const { data: products, isLoading: isLoadingProducts, error: errorProducts } = useGetProductsQuery(filters);

  const { data: cart, isLoading: isLoadingCart, isError: isErrorCart } = useGetCartQuery();

  const handleFilterChange = useCallback((data: GetProductsQueryParams) => {
    setFilters(prevState => ({
      ...prevState,
      ...data,
    }));
  }, []);

  return (
    <React.Fragment>
      <div className="flex gap-6 p-4 flex-col lg:flex-row">
        <div className="lg:w-1/3 xl:w-1/4">
          <FiltersSection
            category={filters.category}
            age={filters.age}
            gender={filters.gender}
            onFilterChange={handleFilterChange}
            onResetFilters={() => setFilters(DEFAULT_FILTERS)}
          />
        </div>
        <div className="flex-1">
          <Tabs defaultValue={FOOTBALL_CLUBS[0]}>
            <TabsList className="mb-5 w-full overflow-auto">
              {FOOTBALL_CLUBS.map(club => (
                <TabsTrigger key={club} value={club}>
                  <span className="uppercase">{FOOTBALL_CLUBS_LABELS[club]}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            {FOOTBALL_CLUBS.map(club => (
              <TabsContent key={club} value={club}>
                {isLoadingProducts || isLoadingCart ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {Array.from({ length: 7 }).map((_, index) => (
                      <Skeleton key={index} className="h-[300px] rounded-lg" />
                    ))}
                  </div>
                ) : errorProducts || isErrorCart || !products || !cart ? (
                  (errorProducts as ApiError)?.status === 404 ? (
                    <div className="flex justify-center items-center mt-2 lg:mt-10">
                      <p className="text-zinc-400 text-lg">No Products found matching these Criteria</p>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center mt-2 lg:mt-10">
                      <ErrorMessage size="lg">Server Error</ErrorMessage>
                    </div>
                  )
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {products
                      .filter(product => product.club === club)
                      .map(product => (
                        <ProductCard
                          key={product.id}
                          id={product.id}
                          category={product.category}
                          image={product.imageUrl}
                          name={product.name}
                          description={product.description}
                          price={product.price}
                          variants={product.variants}
                          isInCart={!!cart.orderItems.find(orderItem => orderItem.productId === product.id)}
                        />
                      ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
      <ProductSizeChoiceModal />
    </React.Fragment>
  );
};

const DEFAULT_FILTERS: GetProductsQueryParams = {
  category: 'UPPER_CLOTHING',
  age: 'ADULT',
  gender: 'MEN',
};
