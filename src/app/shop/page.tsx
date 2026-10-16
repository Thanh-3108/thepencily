"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { usePencily } from "@/context/PencilyContext";

export { type ShopItem, SHOP_ITEMS } from "@/components/DashboardShop";

export default function ShopRedirectPage() {
  const router = useRouter();
  const { language } = usePencily();
  const isVi = language === "vi";

  useEffect(() => {
    router.replace("/dashboard?tab=shop");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#FFF9EF] text-[#0F2747] flex items-center justify-center p-4">
      <div className="bg-white rounded-md border-2 border-[#0F2747] p-8 max-w-sm w-full text-center space-y-4 shadow-md">
        <div className="w-12 h-12 mx-auto rounded-sm bg-amber-100 border-2 border-amber-400 flex items-center justify-center font-black text-amber-900 text-base">
          PP
        </div>
        <div className="space-y-1">
          <h2 className="font-poppins font-black text-base text-[#0F2747]">
            {isVi ? "Cửa Hàng Pencily Points" : "The Pencily Points Shop"}
          </h2>
          <p className="text-xs text-slate-500">
            {isVi
              ? "Đang chuyển bạn vào khu vực Cửa Hàng PP trong Dashboard..."
              : "Redirecting to PP Shop inside Dashboard..."}
          </p>
        </div>
        <div className="flex items-center justify-center pt-2">
          <Loader2 className="w-5 h-5 animate-spin text-[#4F7ECB]" />
        </div>
      </div>
    </div>
  );
}
