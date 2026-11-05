import { site } from "@/data/site";
import { WhatsAppIcon } from "./Icons";

export default function WhatsAppFloat() {
  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hi! I'd like to know more about Ready to Feast.")}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-30 grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-lg shadow-black/20 transition-transform hover:scale-110"
    >
      <span aria-hidden className="absolute inset-0 animate-ring rounded-full bg-whatsapp" />
      <WhatsAppIcon className="relative size-8" />
    </a>
  );
}
