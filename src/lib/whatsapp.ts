/**
 * Helper untuk generate URL WhatsApp API.
 *
 * Penggunaan:
 *   buildWhatsAppUrl("Halo, saya ingin konsultasi")
 *   // → "https://wa.me/6285179986415?text=Halo%2C%20saya%20ingin%20konsultasi"
 *
 * Nomor WA tujuan HAKASA (satu tempat agar mudah diperbarui).
 * Pesan default untuk tombol CTA umum (Header & Hero).
 */
export const WHATSAPP_NUMBER = "6285179986415";

export const DEFAULT_CONSULTATION_MESSAGE =
  "Halo tim HAKASA, saya ingin konsultasi mengenai layanan Anda.";

/** Base URL WhatsApp click-to-chat. */
const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

/**
 * Bangun URL WhatsApp dengan pesan yang di-encode sesuai standar URL.
 * Fungsi ini membungkus `encodeURIComponent` agar pemanggil tidak perlu
 * memikirkan format spasi / karakter khusus secara manual.
 */
export function buildWhatsAppUrl(message: string): string {
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
}

/**
 * URL WhatsApp untuk konsultasi umum (dipakai Header & Hero).
 */
export const DEFAULT_CONSULTATION_URL = buildWhatsAppUrl(
  DEFAULT_CONSULTATION_MESSAGE,
);

/**
 * Bangun URL WhatsApp dengan pesan khusus untuk satu judul layanan.
 * Pola: "Halo tim HAKASA, saya ingin konsultasi mengenai layanan [Judul]."
 */
export function buildServiceConsultationUrl(serviceTitle: string): string {
  return buildWhatsAppUrl(
    `Halo tim HAKASA, saya ingin konsultasi mengenai layanan ${serviceTitle}.`,
  );
}
