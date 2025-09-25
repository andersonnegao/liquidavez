'use client';

import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  price,
  image_url,
  className,
}) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart({ id, name, price, image_url });
  };

  const formattedPrice = price ? price.toFixed(2) : '0.00';

  return (
    <div
      className={`transitionEffect bg-white relative rounded-2xl p-3 shadow-md ${className}`}
    >
      <div className="h-[250px] w-full bg-gray-200 overflow-hidden rounded-2xl lg:h-[220px] 2xl:h-[300px]">
        <Image
          src={image_url}
          alt={name}
          className="h-full w-full object-cover object-bottom"
          width={400}
          height={400}
        />
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{name}</h3>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-neutral-500">{description}</p>
          <p className="text-lg font-medium text-primary">${formattedPrice}</p>
        </div>
      </div>
      <div className="mt-4">
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full transition-colors duration-200"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
