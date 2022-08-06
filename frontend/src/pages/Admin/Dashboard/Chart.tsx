import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = { counts: number[] };

export default function Chart({ counts = [] }: Props) {
  const data = {
    labels: ['Buku tersedia', 'Buku dipinjam', "Buku Jatuh Tempo"],
    datasets: [
      {
        label: '# of Loans',
        data: counts,
        backgroundColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(240, 77, 77, 1)',
        ]

      },
    ],
  };
  return (
    <div>
      <Pie data={data} />
    </div>
  );
}
