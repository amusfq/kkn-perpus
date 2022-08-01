export default function generateArrayOfYears(start: number) {
  var end = new Date().getFullYear();
  var years: any[] = [];

  for (var i = end; i >= start; i--) {
    years.push({ label: i.toString(), value: i });
  }
  return years;
}
