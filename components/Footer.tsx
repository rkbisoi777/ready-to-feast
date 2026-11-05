import Link from "next/link";
import { site } from "@/data/site";
import Logo from "./Logo";
import { InstagramIcon, MailIcon, WhatsAppIcon } from "./Icons";

export default function Footer() {
  return (
    <footer id="contact" className="bg-maroon-dark text-white/80">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo light />
          <p className="mt-4 max-w-sm">Marinated, fresh and ready to cook. High-protein chicken breasts in eight flavours, delivered across Mumbai, Navi Mumbai and Thane.</p>
        </div>
        <div>
          <h2 className="text-xl text-white">Shop</h2>
          <ul className="mt-4 space-y-2">
            <li><Link href="/products/" className="hover:text-white">All flavours</Link></li>
            <li><Link href="/#how-it-works" className="hover:text-white">How it works</Link></li>
            <li><Link href="/#faq" className="hover:text-white">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl text-white">Contact</h2>
          <ul className="mt-4 space-y-3">
            <li>
              <a href={`https://wa.me/${site.whatsapp}`} className="inline-flex items-center gap-2 hover:text-white" target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="size-5" /> +{site.whatsapp}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 hover:text-white">
                <MailIcon /> {site.email}
              </a>
            </li>
            <li>
              <a href={site.instagram} className="inline-flex items-center gap-2 hover:text-white" target="_blank" rel="noopener noreferrer">
                <InstagramIcon /> Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-sm sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>FSSAI Lic. No. {site.fssai}</p>
        </div>
      </div>
    </footer>
  );
}
