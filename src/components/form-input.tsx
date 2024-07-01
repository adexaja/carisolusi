"use client";

import { useState } from "react";
import { Button, buttonVariants } from "@sangpencerah/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@sangpencerah/components/ui/card";
import { Input } from "@sangpencerah/components/ui/input";
import { Label } from "@sangpencerah/components/ui/label";
import { Textarea } from "@sangpencerah/components/ui/textarea";
import { CornerDownLeft, LoaderIcon, Terminal } from "lucide-react";
import { OpenAI } from "openai-streams";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { cn } from "@sangpencerah/lib/utils";
import { AyatType } from "@sangpencerah/types/ayat";

export function FormInput() {
  const [response, setResponse] = useState("");
  const [solution, setSolution] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const hitEndpoint = async (solution: string) => {
    setResponse("");
    setIsLoading(true);
    const stream = await OpenAI(
      "chat",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are problem solver, psikolog, a friend, a parent, or someone who user can trust. When user input something, find their problem then find in hadith and quran. So when user input something related or solution in qur'an or on hadith. The hadith book is limited to book hadith of Muslim, Bukhari, Tirmidzi, Nasai, Abu Daud, Ibnu Majah, Imam Ahmad, Darimi, Imam Malik. The hadith must be related to the quran output. Give response based on their language. Give sharia based on salaf sharia. `,
          },
          {
            role: "user",
            content: solution,
          },
        ],
      },
      {
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API,
      }
    );

    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let solusi = "";

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;
      const chunk = decoder.decode(value, { stream: true });
      setResponse((prev) => prev + chunk);
    }
    // pengembangan berikut nya bisa menampilkan suara dan mendengarkan ayatnya
    // try {
    //   let solusiJson = JSON.parse(solusi);

    //   const staticData = await fetch(
    //     `https://equran.id/api/v2/surat/${solusiJson.quran.surah}`,
    //     { cache: "force-cache" }
    //   );
    //   const staticDataJson = await staticData.json();

    //   const quranAyah = staticDataJson.data.ayat.filter(
    //     (ayah: AyatType) =>
    //       ayah.nomorAyat >= solusiJson.quran.ayah &&
    //       ayah.nomorAyat <= solusiJson.quran.toayah
    //   );

    //   let solusiAyat = "";
    //   quranAyah.forEach((ayah: AyatType) => {
    //     solusiAyat +=
    //       "Ayat No. " + ayah.nomorAyat + " : " + ayah.teksIndonesia + "\n";
    //   });
    //   setResponse(solusiAyat);
    // } catch (e) {
    //   console.error(e);
    //   setResponse(solusi);
    // }

    setIsLoading(false);
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Cari Solusi</CardTitle>
        <CardDescription>
          Cari solusi permasalahan yang kamu temui.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
          <Textarea
            id="message"
            placeholder="Type your message here..."
            className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
            onChange={(e) => setSolution(e.target.value)}
            value={solution}
          />
          <div className="flex items-center p-3 pt-0">
            <div className="ml-auto gap-2">
              <Button
                size="sm"
                className={cn(
                  "gap-1.5 bg-background text-primary" +
                    buttonVariants({ variant: "outline" })
                )}
                onClick={(e) => setSolution("")}
              >
                Reset Text
              </Button>
              <Button
                size="sm"
                className="ml-2 gap-1.5"
                onClick={() => hitEndpoint(solution)}
                disabled={isLoading}
              >
                {!isLoading ? (
                  <>
                    {" "}
                    Cari Solusi
                    <CornerDownLeft className="size-3.5" />
                  </>
                ) : (
                  <>
                    Loading.. <LoaderIcon className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardContent className="grid gap-4">
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Apa ya kira kira solusinya?</AlertTitle>
          <AlertDescription>
            {response && <>{response}</>}

            {!response && "Masukkan sesuatu pada input di atas"}
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
