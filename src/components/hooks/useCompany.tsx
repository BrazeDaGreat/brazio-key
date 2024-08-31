const Logos: { [key: string]: string } = {
  Facebook:
    "https://upload.wikimedia.org/wikipedia/commons/c/cd/Facebook_logo_%28square%29.png",
};

const logoType: string | undefined = "yourLogoURL" as string | undefined;

export default function useCompany(str: string) {
  // split the string using dots to get the website name
  let strArr: string[] = str.split(".");
  let name: string = strArr[0];
  // further clean name by removing any /s or http
  name = name.replace("http", "");
  name = name.replace("https", "");
  name = name.replace(":", "");
  name = name.replace("/", "");
  name = name.replace("/", "");
  // capitalize the first letter
  name = name.charAt(0).toUpperCase() + name.slice(1);

  let logo: string | undefined =
    "https://static.vecteezy.com/system/resources/previews/007/126/739/non_2x/question-mark-icon-free-vector.jpg";
  if (Logos[name as keyof typeof Logos]) {
    logo = Logos[name as keyof typeof Logos];
  }
  return [name, logo];
}
