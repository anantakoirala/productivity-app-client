import ThemeSwitcher from "@/components/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <ThemeSwitcher />
      <h1>This is homepage</h1>
      <p>This is page content</p>
    </div>
  );
}
