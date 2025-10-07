import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

import { Skeleton } from "@mantine/core";
import { Carousel } from "@mantine/carousel";

import ProductsLayout from "@/components/products/products";
import ProductDetails from "@/components/product/product-details";

import capitalize from "@/src/utils/capitalize";
import type { Database } from "@/types/supabase";
import {
  getProduct,
  getProductImages,
  type ProductDetails as ProductDetailsData,
  type Storage,
} from "@/src/utils/supabase";

type StorageObject = NonNullable<Storage>[number];

type ProductPageProps = {
  sku: string | string[] | undefined;
  product: ProductDetailsData;
  images: StorageObject[];
};

export const getServerSideProps: GetServerSideProps<ProductPageProps> = async (
  ctx
) => {
  const { sku } = ctx.query;

  const supabase = createServerSupabaseClient<Database>(ctx);

  const { data: product, error } = await getProduct(supabase, sku);

  if (error || !product) {
    return {
      notFound: true,
    };
  }

  const { data: images } = await getProductImages(
    supabase,
    sku as string | undefined
  );

  return {
    props: {
      sku,
      product: JSON.parse(JSON.stringify(product)) as ProductDetailsData,
      images: (images ?? []) as StorageObject[],
    },
  };
};

export default function Product({
  product,
  images,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  /*** QUERIES ***/
  const productName = product.name ?? "";
  const shelf = product.shelf?.[0];
  const aisle = product.aisle?.[0];
  const department = product.department?.[0];

  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <Head>
        <title>{"Buy " + capitalize(productName)}</title>
      </Head>
      <ProductsLayout.Breadcrumbs>
        {department?.slug && department?.name && (
          <Link href={`/shop/browse/${department.slug}`}>{department.name}</Link>
        )}
        {department?.slug && aisle?.slug && aisle?.name && (
          <Link href={`/shop/browse/${department.slug}/${aisle.slug}`}>
            {aisle.name}
          </Link>
        )}
        {department?.slug && aisle?.slug && shelf?.slug && shelf?.name && (
          <Link
            href={`/shop/browse/${department.slug}/${aisle.slug}/${shelf.slug}`}
          >
            {shelf.name}
          </Link>
        )}
        <Link href="#" className="capitalize">
          {productName}
        </Link>
      </ProductsLayout.Breadcrumbs>

      <div className="mt-5 grid gap-10 md:grid-cols-2">
        <div>
          <Carousel
            mx="auto"
            loop
            withIndicators
            classNames={{ root: "border border-gray-400 shadow-lg" }}
            styles={{
              indicator: {
                background: "#15aabf",
              },
            }}
          >
            {images.map((image) => (
              <Carousel.Slide key={image.name}>
                <div className="mx-auto w-full bg-white py-10">
                  <Skeleton
                    width={500}
                    height={500}
                    radius={0}
                    className={"mx-auto"}
                    visible={!imageLoaded}
                  >
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_SUPABASE_BUCKET
                          ? `${process.env.NEXT_PUBLIC_SUPABASE_BUCKET.replace(/\/$/, '')}/${(image.name ?? '').toString().replace(/^\//, '')}`
                          : '/no-image.png'
                      }
                      width={500}
                      height={500}
                      alt={image.name ?? 'Product image'}
                      className={`mx-auto ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                      } transition-opacity duration-500`}
                      onLoadingComplete={() => setImageLoaded(true)}
                    />
                  </Skeleton>
                </div>
              </Carousel.Slide>
            ))}

            {!images.length && (
              <Carousel.Slide>
                <div className="mx-auto w-full bg-white py-10">
                  <Skeleton
                    width={500}
                    height={500}
                    radius={0}
                    className={"mx-auto"}
                    visible={!imageLoaded}
                  >
                    <Image
                      src={`/no-image.png`}
                      width={500}
                      height={500}
                      alt="No image found"
                      className={`mx-auto ${
                        imageLoaded ? "opacity-100" : "opacity-0"
                      } transition-opacity duration-500`}
                      onLoadingComplete={() => setImageLoaded(true)}
                    />
                  </Skeleton>
                </div>
              </Carousel.Slide>
            )}
          </Carousel>
        </div>

        <div className="space-y-5">
          <ProductDetails product={product} />
        </div>
      </div>
    </>
  );
}
