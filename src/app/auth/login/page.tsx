import Image from "next/image";
import Logo from "@/assets/afri-cola-studio.svg";
import { ModeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { Chrome, Github } from "lucide-react";
import { signIn } from "@/lib/auth";

type ProvidersPros = "github" | "google";

export default function LoginPage() {
  const handleLogin = async (form: FormData) => {
    "use server";

    const provider = form.get("provider") as ProvidersPros;

    await signIn(provider, { redirectTo: "/dashboard/resumes" });
  };
  return (
    <div className="grid grid-cols-[1.5fr,1fr] h-screen">
      <aside>
        <Image
          width={1000}
          height={800}
          src="/images/auth-bg.webp"
          alt="Office with cvs on desks"
          className="w-full h-full object-cover"
        />
      </aside>

      <form className="p-10 flex justify-center flex-col" action={handleLogin}>
        <div className="flex items-center justify-between mb-10">
          <Logo className="max-w-[90px]" />

          <ModeToggle />
        </div>

        <h1 className="text-2xl font-title font-bold">Access your account</h1>
        <p>
          In case you do not have an account, it&apos;ll be automatically
          created
        </p>

        <div className="flex flex-col gap-4 mt-6">
          <Button
            variant="outline"
            className="w-full gap-2"
            type="submit"
            name="provider"
            value="github"
          >
            <Github size={20} />
            Enter with GitHub
          </Button>
          <Button
            className="w-full gap-2"
            type="submit"
            name="provider"
            value="google"
          >
            <Chrome size={20} />
            Enter with Google
          </Button>
        </div>
      </form>
    </div>
  );
}
