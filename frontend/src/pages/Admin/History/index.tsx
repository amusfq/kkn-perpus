import { useEffect } from "react";
import useStore from "../../../../store/store";

type Props = {};

export default function History({}: Props) {
  const { setIsLoading } = useStore();

  useEffect(() => {
    setIsLoading(false);
  }, []);
  return <div>Siswa</div>;
}
