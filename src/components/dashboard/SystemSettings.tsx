import { COMPANY } from "@/lib/company";
import Image from "next/image";

export default function SystemSettings() {
  return (
    <div className="bg-white rounded-3xl p-8 border">

      <div className="flex items-center gap-5">

        <Image
          src={COMPANY.logo}
          alt={COMPANY.name}
          width={80}
          height={80}
          className="rounded-2xl"
        />

        <div>

          <h1 className="text-3xl font-bold">
            {COMPANY.name}
          </h1>

          <p>{COMPANY.email}</p>

          <p>{COMPANY.phone}</p>

        </div>

      </div>

    </div>
  );
}