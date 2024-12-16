import { useNavigate } from 'react-router-dom';

import { APP_ROUTER } from '@/constants';
import type { ApiError } from '@/api';
import { useGetOrdersQuery } from '@/hooks';
import { Button, ErrorMessage, OrderCard, Skeleton } from '@/components';

export const OrdersPage: React.FC = () => {
  const navigate = useNavigate();

  const { data: orders, isLoading: isLoadingOrders, error: errorOrders } = useGetOrdersQuery();

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">My Orders</h2>
        <p className="font-semibold text-zinc-500">{orders?.length} Orders</p>
      </div>
      <div className="flex flex-col gap-6">
        {isLoadingOrders ? (
          Array.from({ length: 5 }).map((_, index) => <Skeleton key={index} className="h-32" />)
        ) : errorOrders || !orders ? (
          (errorOrders as ApiError)?.status === 404 ? (
            <div className="flex flex-col gap-4 justify-center items-center mt-10">
              <p className="text-zinc-400 text-lg">You do not have orders yet</p>
              <Button type="button" variant="secondary" onClick={() => navigate(APP_ROUTER.CATALOG)}>
                Catalog
              </Button>
            </div>
          ) : (
            <div className="flex justify-center items-center mt-2 lg:mt-10">
              <ErrorMessage size="lg">Server Error</ErrorMessage>
            </div>
          )
        ) : (
          orders?.map(order => (
            <OrderCard
              key={order.id}
              id={order.id}
              total={order.total}
              quantity={order.quantity}
              status={order.status}
              orderItems={order.orderItems}
              createdAt={order.createdAt}
            />
          ))
        )}
      </div>
    </div>
  );
};
