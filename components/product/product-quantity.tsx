import { useState, useEffect, useRef } from "react";

import { Button, NumberInput, Group, NumberInputHandlers } from "@mantine/core";

import { useStore } from "@/src/state/store";

import { type products } from "@prisma/client";

export default function Quantity({ product }: { product: products }) {
  /*** STATE ***/
  const cart = useStore((state) => state.cart);

  const { addToCart, addQuantity, subtractQuantity } = useStore();

  const [quantity, setQuantity] = useState(0);
  const handlers = useRef<NumberInputHandlers>();

  useEffect(() => {
    const item = cart.find((item) => item.sku === product.sku);

    if (item) {
      setQuantity(item.cart_quantity);
    } else {
      setQuantity(0);
    }
  }, [cart, product.sku]);

  return (
    <>
      {quantity === 0 ? (
        <Button
          onClick={() => addToCart(product)}
          color="fire"
          fullWidth
          radius="xl"
        >
          Adicionar ao carrinho
        </Button>
      ) : (
        <Group spacing={0} noWrap>
          <NumberInput
            hideControls
            value={quantity}
            onChange={(val) => setQuantity(val!)}
            handlersRef={handlers}
            max={10}
            min={0}
            step={1}
            styles={{
              input: { width: "full", borderRadius: "32px 0px 0px 32px" },
            }}
          />
          <Button
            onClick={() => subtractQuantity(product)}
            color="fire"
            px={14}
            radius={0}
          >
            &#8211;
          </Button>
          <Button
            onClick={() => addQuantity(product)}
            color="fire"
            px={14}
            styles={{
              root: { borderRadius: "0px 32px 32px 0px" },
            }}
          >
            +
          </Button>
        </Group>
      )}
    </>
  );
}
