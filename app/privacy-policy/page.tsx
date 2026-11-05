import type { Metadata } from "next";
import { site } from "@/data/site";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects and uses your details when you place an order.`,
  alternates: { canonical: "/privacy-policy/" },
};

// TODO(owner): have this reviewed before launch.
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="5 November 2026"
      intro={`${site.name} respects your privacy. This policy explains what information we collect when you use this website, and how we use it. We keep it simple: we only ask for what we need to deliver your order.`}
      sections={[
        {
          title: "What we collect",
          body: [
            "When you place an order, we collect:",
            ["Your name", "Your mobile / WhatsApp number", "Your delivery address, area and pincode", "Any notes you add to the order", "The products and quantities you order"],
            "We do not have user accounts, and we do not collect payment card or bank details on this website.",
          ],
        },
        {
          title: "How we use it",
          body: [
            "We use your details only to:",
            ["Confirm and deliver your order", "Contact you about your order on WhatsApp or by phone", "Share payment details (such as a UPI link) for your order", "Respond to your questions or complaints"],
            "We do not sell or rent your information, and we will not send you marketing messages unless you ask us to.",
          ],
        },
        {
          title: "Who we share it with",
          body: [
            "Your order details are sent to us through these services:",
            [
              "Web3Forms, which emails your order to us",
              "WhatsApp (Meta), when you choose to send your order on WhatsApp",
              "Our delivery partner, who receives your name, number and address to deliver your order",
            ],
            "We may also share information if the law requires it.",
          ],
        },
        {
          title: "Cookies and storage",
          body: [
            "This website does not use advertising or tracking cookies. Your cart is saved in your own browser (local storage) so it is still there if you come back. You can clear it at any time by clearing your browser data.",
          ],
        },
        {
          title: "How long we keep it",
          body: ["We keep order details only as long as needed to deliver your order, handle any issue with it, and meet accounting and legal requirements."],
        },
        {
          title: "Your choices",
          body: [`You can ask us to see, correct or delete your details at any time. Email ${site.email} or message us on WhatsApp at +${site.whatsapp}.`],
        },
        {
          title: "Changes to this policy",
          body: ["We may update this policy from time to time. The latest version will always be on this page, with the date at the top."],
        },
        {
          title: "Contact us",
          body: [`Questions about your privacy? Email ${site.email} or WhatsApp +${site.whatsapp}.`],
        },
      ]}
    />
  );
}
