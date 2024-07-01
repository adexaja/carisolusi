import { FormInput } from "@sangpencerah/components/form-input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@sangpencerah/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center gap-4 py-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl">About</CardTitle>
            <CardDescription>Tentang Cari Solusi.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <p>
              {" "}
              Berawal dari merasa insecure sama diri sendiri atau kadang
              impostor syndrome. Pengen curhat sama temen takut dikira kurang
              bersyukur. Jadi kalau di realnya saya sering buka Al-Quran, random
              aja di halaman tertentu kemudian baca artinya. wkwk berharap dapat
              petunjuk, tapi asli itu ngawur ga boleh ditiru.{" "}
            </p>
            <p>
              {" "}
              Jadi bikin sebuah app pakai Open AI untuk curhat, isinya nanti
              nyampur saran dan ada beberapa rujukan al-quran dan hadits.
              Berikut sample mungkin yang bisa di tanyakan, terserah apapun bisa
              ditanyakan. Jika udah down banget terus pengen curhat disini juga
              boleh.
            </p>
            <img src="1.png" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
