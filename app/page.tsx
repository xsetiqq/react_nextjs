import Banner from "@/components/shared/Banner";
import CardList from "@/components/shared/CardList"; // клиентский
import CartDrawer from "@/components/shared/CartDrawer";
import CartHandler from "@/components/shared/CartHandler";

export default function Home() {
  return (
    <>
      <CartHandler />
      <CartDrawer />
      <Banner />
      <CardList />
    </>
  );
}
