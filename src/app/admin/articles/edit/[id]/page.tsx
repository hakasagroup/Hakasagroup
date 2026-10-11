import EditArticleClient from "./EditArticleClient";

// Halaman dinamis karena komponen client membaca parameter URL saat runtime.
export const instant = false;

export default function EditArticlePage() {
  return <EditArticleClient />;
}