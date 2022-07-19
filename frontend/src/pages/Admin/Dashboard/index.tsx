import { useEffect } from "react";
import useStore from "../../../../store/store";

type Props = {};

export default function Dashboard({}: Props) {
  const { setIsLoading } = useStore();

  useEffect(() => {
    setIsLoading(false);
  }, []);
  return <div>Dashboard</div>;
}
