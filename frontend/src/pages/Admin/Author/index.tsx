import { useEffect } from "react";
import useStore from "../../../../store/store";

type Props = {};

export default function Author({}: Props) {
  const { setIsLoading } = useStore();

  useEffect(() => {
    setIsLoading(false);
  }, []);
  return <div>Author</div>;
}
