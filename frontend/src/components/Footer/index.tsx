type Props = {};

export default function Footer({}: Props) {
  return (
    <div className="bg-blue-500 px-24">
      <div className="text-white h-16 items-center flex justify-center">
        <p className="text-center">
          Copyright &copy; {new Date().getFullYear()} - SDN Pacet 1 x{" "}
          <a href="https://narotama.ac.id/">Universitas Narotama</a>
        </p>
      </div>
    </div>
  );
}
