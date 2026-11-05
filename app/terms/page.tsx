import type { Metadata } from "next";
import { site } from "@/data/site";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms for ordering from ${site.name}: delivery areas, payment, cancellations and refunds.`,
  alternates: { canonical: "/terms/" },
};

// TODO(owner): confirm delivery, cancellation and refund rules, and have this reviewed before launch.
export default function TermsPage() {
  const areas = site.serviceAreas.join(", ").replace(/, ([^,]*)$/, " and $1");
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="5 November 2026"
      intro={`By placing an order on this website, you agree to these terms. Please read them before ordering from ${site.name}.`}
      sections={[
        {
          title: "Orders",
          body: [
            "Placing an order on this website is a request to buy. Your order is confirmed only when we confirm it with you on WhatsApp or by phone.",
            "We may decline or cancel an order, for example if a product is unavailable or the address is outside our delivery area. If you have already paid, we will refund you in full.",
          ],
        },
        {
          title: "Delivery area",
          body: [`We currently deliver only in ${areas}. We will share the expected delivery date and time when we confirm your order.`],
        },
        {
          title: "Prices and payment",
          body: [
            "All prices are in Indian Rupees (₹) and include taxes. Any delivery charge will be told to you before we confirm your order.",
            "Payment is made after confirmation, by UPI or cash on delivery, as agreed with you. We do not take payments on this website.",
          ],
        },
        {
          title: "Cancellations",
          body: ["You can cancel your order free of charge before it is dispatched. Message us on WhatsApp as early as possible. Because our products are fresh and perishable, orders cannot be cancelled once they are out for delivery."],
        },
        {
          title: "Returns and refunds",
          body: [
            "For food safety reasons we cannot accept returns. If your order arrives damaged, leaking, not cold, or with the wrong items, please message us on WhatsApp within 24 hours of delivery with a photo. We will replace the item or refund you.",
            "Approved refunds are paid back to your original payment method within 5–7 working days.",
          ],
        },
        {
          title: "Storage and safe use",
          body: [
            "Our products are raw marinated chicken and must be handled correctly:",
            [
              "Refrigerate at -2 to 4°C as soon as you receive your order.",
              "Use within 12 days of manufacture, and within 2 days of opening.",
              "Cook thoroughly before eating, following the instructions on the pack.",
            ],
            "We are not responsible for problems caused by incorrect storage or cooking after delivery.",
          ],
        },
        {
          title: "Allergens",
          body: ["Some products contain dairy, nuts, peanuts or mustard. Allergen details are listed on each product page and pack. Please check before ordering if you have an allergy."],
        },
        {
          title: "Website content",
          body: ["Product photos are for illustration; the actual product and serving may look different. All content on this website belongs to " + site.name + " and may not be copied without permission."],
        },
        {
          title: "Governing law",
          body: ["These terms are governed by the laws of India. Any dispute is subject to the courts of Mumbai, Maharashtra."],
        },
        {
          title: "Contact us",
          body: [`Questions about an order? Email ${site.email} or WhatsApp +${site.whatsapp}.`],
        },
      ]}
    />
  );
}
