import { useState, useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { Autocomplete, Paper } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

import { useTranslations } from "next-intl";

/*** STATE ***/
import { useStore } from "@/src/state/store";

/*** SUPABASE ***/
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import type { User } from "@/src/utils/supabase";

import Auth from "./auth";
import HeaderDepartments from "@/components/header/header-departments";

import CartButton from "./cart-button";
import LocaleSwitcher from "./locale-switcher";

export default function Header() {
  const { push, isReady, query } = useRouter();
  const t = useTranslations("Header");

  /*** STATE ***/
  const { account, setAccount } = useStore();

  const [searchQuery, setSearchQuery] = useState("");

  const supabase = useSupabaseClient();

  useEffect(() => {
    if (!account?.id) {
      return;
    }

    const channel = supabase
      .channel(`users-updates-${account.id}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "users",
          filter: `id=eq.${account.id}`,
        },
        (payload) => {
          setAccount(payload.new as User);
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [account?.id, setAccount, supabase]);

  useEffect(() => {
    if (isReady && query.q) setSearchQuery(query.q as string);
  }, [isReady, query]);

  return (
    <>
      <header className="shadow-sm">
        <Paper>
          <div className="container mx-auto p-3">
            <div className="my-3 flex items-center justify-between">
              <Link href="/">
                <h1 className="text-4xl font-extrabold">
                  <span className="brand-gradient">
                    liquidavez
                  </span>
                </h1>
              </Link>

              <div className="flex items-center gap-3">
                <LocaleSwitcher />
                <Auth />
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <ul className="flex text-lg">
                <li>
                  <HeaderDepartments />
                </li>
              </ul>

              <div className="flex gap-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    push(`/shop/search?q=${searchQuery}`);
                  }}
                >
                  <Autocomplete
                    size="md"
                    value={searchQuery}
                    onChange={setSearchQuery}
                    onItemSubmit={(item) => {
                      push(`/shop/search?q=${item.value}`);
                    }}
                    placeholder={t("searchPlaceholder")}
                    data={[
                      "Milk",
                      "Bread",
                      "Eggs",
                      "Biscuits",
                      "Butter",
                      "Crackers",
                      "Bananas",
                      "Chips",
                      "Cheese",
                    ]}
                    limit={10}
                    icon={<IconSearch size={20} />}
                  />
                </form>

                <CartButton />
              </div>
            </div>
          </div>
        </Paper>
      </header>
    </>
  );
}
