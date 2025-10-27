import { Instagram, Linkedin, X, Globe } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import Link from "next/link";
const LinkedinLink =
  process.env.NEXT_PUBLIC_LINKEDIN || "https://www.linkedin.com/company/synctechx/?viewAsMember=true";
const TwitterLink = process.env.NEXT_PUBLIC_TWITTER || "https://x.com/synctechx";
const TiktokLink = process.env.NEXT_PUBLIC_TIKTOK || "https://www.github.com/";
const InstagramLink = process.env.NEXT_PUBLIC_INSTAGRAM || "https://www.instagram.com/synctechx.mz";

const CardFooter = () => {
  return (
    <div className="pt-4 space-y-2">
      <div className="text-[#B1ACA4] text-[12px]">
        Preocupamo-nos com os seus dados: {" "}
        <Link
          href="https://trilhoacademico.edu.mz/terms"
          className="underline transition-all duration-200 hover:text-black/70"
        >
          Termos e Condições | Política de Privacidade
        </Link>
      </div>
      {/* Social Media */}
      <div className="flex items-center gap-2">
        <Link
          href="https://synctechx.com"
          target="_blank"
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-gray-600 shadow transition duration-200 ease-linear hover:bg-gray-100 hover:text-gray-500 hover:shadow-none"
        >
          <Globe size={22} />
        </Link>
        <Link
          href={LinkedinLink}
          target="_blank"
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-gray-600 shadow transition duration-200 ease-linear hover:bg-gray-100 hover:text-gray-500 hover:shadow-none"
        >
          <Linkedin size={22} />
        </Link>
        <Link
          href={TwitterLink}
          target="_blank"
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-gray-600 shadow transition duration-200 ease-linear hover:bg-gray-100 hover:text-gray-500 hover:shadow-none"
        >
          <X size={22} />
        </Link>
        <Link
          href={InstagramLink}
          target="_blank"
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-gray-600 shadow transition duration-200 ease-linear hover:bg-gray-100 hover:text-gray-500 hover:shadow-none"
        >
          <Instagram size={22} />
        </Link>
         <Link
          href={TiktokLink}
          target="_blank"
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-gray-600 shadow transition duration-200 ease-linear hover:bg-gray-100 hover:text-gray-500 hover:shadow-none"
        >
          <FaTiktok size={22} />
        </Link> 
      </div>

      <div className="text-black text-[12px]">
        Desenvolvido pela {" "}
        <Link
          href="https://synctechx.com"
          className="underline transition-all duration-200 hover:text-black/70"
        >
          SyncTechX
        </Link>
      </div>
    </div>
  );
};

export default CardFooter;
