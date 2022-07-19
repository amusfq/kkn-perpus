import { useEffect } from "react";
import useStore from "../../../../store/store";

type Props = {};

export default function Publisher({}: Props) {
  const { setIsLoading } = useStore();

  useEffect(() => {
    setIsLoading(false);
  }, []);
  return <div>Publisher</div>;
}
