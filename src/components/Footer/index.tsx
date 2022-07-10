type Props = {};

export default function Footer({}: Props) {
  return (
    <div className="bg-blue-500 px-24">
      <div className="text-white h-16 items-center flex justify-center">
        <p className="text-center">
          Copyright &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
