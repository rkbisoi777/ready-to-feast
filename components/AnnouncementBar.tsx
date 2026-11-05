import { site } from "@/data/site";

export default function AnnouncementBar() {
  return (
    <div className="bg-ember px-4 py-2 text-center font-display text-sm font-semibold uppercase tracking-wider text-white sm:text-base">
      {site.announcement}
    </div>
  );
}
