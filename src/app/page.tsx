import Image from "next/image";

import { logo } from "@/assets/images";
import TipCalculator from "@/features/calculator/components/tip-calculator";
export default function Home() {
  return (
    <main className="tablet:mb-[10%] mt-[clamp(2.5rem,-6.643rem+19.05vw,10.5rem)] space-y-[clamp(2.563rem,-0.795rem+6.99vw,5.5rem)]">
      <header>
        <Image alt="" src={logo} className="mx-fit mx-auto" />
      </header>
      <TipCalculator />
    </main>
  );
}
