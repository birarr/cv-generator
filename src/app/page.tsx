import { cn } from "@/lib/utils";
import Image from "next/image";
import Logo from "@/assets/afri-cola-studio.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  description: "A free and easy way to use resumes generator",
};

export default function Home() {
  return (
    <main className="w-full h-screen bg-gradient-to-tl from-muted flex flex-col md:justify-center p-6 overflow-x-hidden">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col md:flex-row gap-8 md:gap-12">
        <div>
          <Logo className="w-full max-w-[100px] mb-8" />

          <h1 className="font-title font-bold text-5xl max-w-[500px]">
            A free and easy way to use resumes generator
          </h1>
          <p className="text-muted-foreground text-lg mt-2">
            Start creating your resumes with an easy an fast app
          </p>

          <Link href={"/dashboard/resumes"} passHref>
            <Button className="mt-4">Start now</Button>
          </Link>
        </div>
        <div className="flex-1 relative h-full">
          <Image
            src="/images/dashboard.webp"
            alt="Dashboard"
            width={1200}
            height={800}
            className={cn(
              "md:absolute md:top-1/2 md:-translate-y-1/2 md:left-0 md:min-w-[80vw]",
              "rounded-lg overflow-hidden border-2 border-muted"
            )}
          />
        </div>
      </div>
    </main>
  );
}
