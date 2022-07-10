import Category from "../../components/Page/Home/Category";
import Hero from "../../components/Page/Home/Hero";
import NewBooks from "../../components/Page/Home/NewBooks";
import PopularBooks from "../../components/Page/Home/PopularBooks";

type Props = {};

export default function Home({}: Props) {
  return (
    <div className="space-y-32 md:mt-16">
      <Hero />
      <Category />
      <NewBooks />
      <PopularBooks />
    </div>
  );
}
