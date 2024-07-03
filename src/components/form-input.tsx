"use client";

import { useState } from "react";
import { Button, buttonVariants } from "@sangpencerah/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@sangpencerah/components/ui/card";
import { Textarea } from "@sangpencerah/components/ui/textarea";
import { CornerDownLeft, LoaderIcon, Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { cn } from "@sangpencerah/lib/utils";

export function FormInput() {
  const [response, setResponse] = useState("");
  const [solution, setSolution] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const hitEndpoint = async (solution: string) => {
    setIsLoading(true);

    const response: Response = await fetch("/ai/chat", {
      method: "POST",

      body: JSON.stringify({
        messages: solution,
      }),

      next: { revalidate: 0 },
    });

    /// procees the stream
    const reader = response
      .body! // .pipeThrough(new TextDecoderStream())
      .getReader();

    /// procees the stream
    const decoder = new TextDecoder();
    let done = false;
    let solusi = "";

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      if (value) {
        solusi += decoder.decode(value, { stream: true });
      }
      done = readerDone;
      setResponse(solusi);
    }

    // pengembangan berikut nya bisa menampilkan suara dan mendengarkan ayatnya
    // agar hati menjadi lebih tentram

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
