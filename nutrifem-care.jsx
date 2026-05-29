import { useState, useEffect, useRef } from "react";

const COLORS = {
  primary: "#0E9F6E",
  primaryLight: "#D1FAE5",
  primaryDark: "#065F46",
  teal: "#0891B2",
  tealLight: "#E0F2FE",
  accent: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  dangerLight: "#FEE2E2",
  bg: "#F0FDF4",
  white: "#FFFFFF",
  gray: "#6B7280",
  grayLight: "#F9FAFB",
  dark: "#1F2937",
};

const NAV_ITEMS = ["Beranda", "Tentang Anemia", "Cek Risiko", "Edukasi Gizi", "Konsultasi", "Profil"];

const FOOD_DATA = [
  { name: "Bayam", icon: "🥬", iron: "2.7 mg/100g", benefit: "Kaya zat besi non-heme dan vitamin C yang membantu penyerapan zat besi.", color: "#065F46" },
  { name: "Hati Ayam", icon: "🍗", iron: "9 mg/100g", benefit: "Sumber zat besi heme terbaik, mudah diserap tubuh hingga 30%.", color: "#92400E" },
  { name: "Daging Sapi", icon: "🥩", iron: "2.6 mg/100g", benefit: "Mengandung zat besi heme dan vitamin B12 untuk produksi sel darah merah.", color: "#B91C1C" },
  { name: "Telur", icon: "🥚", iron: "1.2 mg/100g", benefit: "Sumber protein dan zat besi yang terjangkau dan mudah diolah.", color: "#D97706" },
  { name: "Ikan Tuna", icon: "🐟", iron: "1.3 mg/100g", benefit: "Kaya omega-3 dan zat besi untuk kesehatan darah dan otak.", color: "#1D4ED8" },
  { name: "Kacang Merah", icon: "🫘", iron: "5.2 mg/100g", benefit: "Sumber zat besi nabati tinggi, cocok untuk vegetarian.", color: "#9F1239" },
];

const ARTICLES = [
  { title: "Kenapa Remaja Putri Lebih Rentan Anemia?", desc: "Menstruasi, pertumbuhan cepat, dan pola makan yang kurang baik membuat remaja putri 3x lebih berisiko anemia dibanding remaja putra.", tag: "Edukasi", color: COLORS.primary },
  { title: "Zat Besi: Nutrisi Kunci yang Sering Terlupakan", desc: "Tubuh membutuhkan 15-18 mg zat besi per hari. Pelajari sumber terbaik dan cara memaksimalkan penyerapannya dalam makanan sehari-hari.", tag: "Gizi", color: COLORS.teal },
  { title: "Tablet Tambah Darah: Kapan dan Bagaimana Meminumnya?", desc: "Program TTD mingguan terbukti efektif menurunkan risiko anemia. Simak panduan lengkap cara minum yang benar agar manfaatnya optimal.", tag: "Kesehatan", color: COLORS.accent },
  { title: "Pola Makan Gizi Seimbang untuk Remaja Aktif", desc: "Isi piringku, porsi makan tepat, dan kombinasi makanan cerdas untuk mendukung energi belajar dan aktivitas sehari-hari remaja putri.", tag: "Nutrisi", color: "#7C3AED" },
];

const FAQ_DATA = [
  { q: "Apa itu anemia?", a: "Anemia adalah kondisi di mana kadar hemoglobin (Hb) dalam darah berada di bawah normal (< 12 g/dL pada remaja putri). Akibatnya, tubuh kekurangan oksigen sehingga menyebabkan rasa lemas, pusing, dan pucat." },
  { q: "Apa makanan tinggi zat besi?", a: "Makanan tinggi zat besi antara lain: hati ayam/sapi, daging merah, ikan, bayam, kacang-kacangan, tahu, dan tempe. Konsumsi bersama vitamin C (jeruk, tomat) untuk meningkatkan penyerapan." },
  { q: "Bagaimana cara mencegah anemia?", a: "Konsumsi makanan kaya zat besi setiap hari, minum Tablet Tambah Darah (TTD) 1x seminggu, hindari minum teh/kopi saat makan, dan rutin periksa kadar Hb minimal 6 bulan sekali." },
  { q: "Kenapa tubuh sering terasa lemas?", a: "Rasa lemas bisa disebabkan anemia, kurang tidur, dehidrasi, atau gula darah rendah. Jika disertai pusing dan wajah pucat, kemungkinan besar karena anemia. Segera lakukan pemeriksaan Hb." },
  { q: "Berapa kadar Hb normal untuk remaja putri?", a: "Kadar Hb normal untuk remaja putri (usia 12-18 tahun) adalah ≥ 12 g/dL. Nilai 10-11.9 g/dL termasuk anemia ringan, 8-9.9 g/dL anemia sedang, dan < 8 g/dL anemia berat." },
];

function LoadingScreen({ onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2000); return () => clearTimeout(t); }, [onDone]);
  return (
    <div style={{ position: "fixed", inset: 0, background: "linear-gradient(135deg, #0E9F6E 0%, #0891B2 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 9999 }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ width: 80, height: 80, background: "rgba(255,255,255,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>💚</div>
      </div>
      <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 700, fontFamily: "'Poppins', sans-serif", margin: "0 0 8px" }}>NutriFem Care</h1>
      <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, fontFamily: "'Poppins', sans-serif", margin: "0 0 32px" }}>Cegah Anemia, Jaga Kesehatan Remaja Putri</p>
      <div style={{ width: 200, height: 4, background: "rgba(255,255,255,0.2)", borderRadius: 99, overflow: "hidden" }}>
        <div style={{ height: "100%", background: "#fff", borderRadius: 99, animation: "loadBar 2s ease-in-out forwards" }} />
      </div>
      <style>{`@keyframes loadBar { from { width: 0% } to { width: 100% } } @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');`}</style>
    </div>
  );
}

function Navbar({ active, setActive, darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 100, background: darkMode ? "#1F2937" : "#fff", boxShadow: "0 1px 12px rgba(0,0,0,0.08)", padding: "0 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setActive("Beranda")}>
          <div style={{ width: 36, height: 36, background: "linear-gradient(135deg, #0E9F6E, #0891B2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>💚</div>
          <span style={{ fontWeight: 700, fontSize: 18, color: COLORS.primary, fontFamily: "'Poppins', sans-serif" }}>NutriFem<span style={{ color: COLORS.teal }}>Care</span></span>
        </div>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }} className="nav-desktop">
          {NAV_ITEMS.map(item => (
            <button key={item} onClick={() => setActive(item)} style={{ background: active === item ? COLORS.primaryLight : "transparent", color: active === item ? COLORS.primaryDark : darkMode ? "#D1FAE5" : COLORS.gray, border: "none", padding: "8px 14px", borderRadius: 8, cursor: "pointer", fontWeight: active === item ? 600 : 400, fontSize: 13.5, fontFamily: "'Poppins', sans-serif", transition: "all 0.2s" }}>
              {item}
            </button>
          ))}
          <button onClick={() => setDarkMode(!darkMode)} style={{ background: darkMode ? "#374151" : "#F3F4F6", border: "none", width: 36, height: 36, borderRadius: 8, cursor: "pointer", fontSize: 16, marginLeft: 8 }}>
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", fontSize: 24, cursor: "pointer" }} className="nav-mobile">☰</button>
      </div>
      {menuOpen && (
        <div style={{ background: darkMode ? "#1F2937" : "#fff", padding: "12px 24px", borderTop: `1px solid ${COLORS.primaryLight}` }}>
          {NAV_ITEMS.map(item => (
            <button key={item} onClick={() => { setActive(item); setMenuOpen(false); }} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "10px 0", color: darkMode ? "#D1FAE5" : COLORS.dark, fontFamily: "'Poppins', sans-serif", fontSize: 14, cursor: "pointer", fontWeight: active === item ? 600 : 400 }}>
              {item}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function HomePage({ setActive, darkMode }) {
  const bg = darkMode ? "#111827" : COLORS.bg;
  const card = darkMode ? "#1F2937" : "#fff";
  const text = darkMode ? "#F9FAFB" : COLORS.dark;
  const sub = darkMode ? "#9CA3AF" : COLORS.gray;

  const features = [
    { icon: "🔬", title: "Deteksi Dini", desc: "Kenali risiko anemia sebelum gejalanya memperburuk kesehatanmu" },
    { icon: "🥗", title: "Panduan Gizi", desc: "Rekomendasi makanan tinggi zat besi yang lezat dan terjangkau" },
    { icon: "📊", title: "Analisis Kesehatan", desc: "Hasil pemeriksaan lengkap dengan grafik dan indikator visual" },
    { icon: "💬", title: "Konsultasi AI", desc: "Chatbot gizi siap menjawab pertanyaanmu kapan saja" },
  ];

  return (
    <div style={{ background: bg, minHeight: "100vh" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #0E9F6E 0%, #0891B2 100%)", padding: "80px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, background: "rgba(255,255,255,0.06)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: -40, left: -40, width: 140, height: 140, background: "rgba(255,255,255,0.05)", borderRadius: "50%" }} />
        <div style={{ maxWidth: 700, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.15)", borderRadius: 99, padding: "6px 16px", marginBottom: 20, fontSize: 13, color: "#fff" }}>
            ✨ Aplikasi Kesehatan Remaja Putri
          </div>
          <h1 style={{ color: "#fff", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 700, fontFamily: "'Poppins', sans-serif", margin: "0 0 16px", lineHeight: 1.2 }}>
            Cegah Anemia,<br />Jaga Kesehatanmu 💚
          </h1>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 17, margin: "0 0 32px", lineHeight: 1.7, fontFamily: "'Poppins', sans-serif" }}>
            Deteksi risiko anemia secara mandiri melalui pemeriksaan sederhana berbasis data kesehatan dan gejala. Gratis, akurat, dan mudah digunakan.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setActive("Cek Risiko")} style={{ background: "#fff", color: COLORS.primaryDark, border: "none", padding: "14px 28px", borderRadius: 12, fontWeight: 600, fontSize: 15, cursor: "pointer", fontFamily: "'Poppins', sans-serif", boxShadow: "0 4px 14px rgba(0,0,0,0.15)" }}>
              🔍 Mulai Pemeriksaan
            </button>
            <button onClick={() => setActive("Tentang Anemia")} style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.4)", padding: "14px 28px", borderRadius: 12, fontWeight: 500, fontSize: 15, cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>
              Pelajari Anemia
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginTop: -30, position: "relative", zIndex: 1 }}>
          {[["23%", "Remaja putri di Indonesia menderita anemia"], ["50%", "Kasus anemia dapat dicegah dengan gizi baik"], ["3x", "Lebih berisiko dibanding remaja putra"], ["12 g/dL", "Kadar Hb normal remaja putri"]].map(([num, label]) => (
            <div key={num} style={{ background: card, borderRadius: 16, padding: "20px 16px", textAlign: "center", boxShadow: "0 4px 16px rgba(0,0,0,0.07)", border: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}` }}>
              <div style={{ fontSize: 26, fontWeight: 700, color: COLORS.primary, fontFamily: "'Poppins', sans-serif" }}>{num}</div>
              <div style={{ fontSize: 12, color: sub, marginTop: 4, lineHeight: 1.4, fontFamily: "'Poppins', sans-serif" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div style={{ padding: "60px 0 40px" }}>
          <h2 style={{ textAlign: "center", fontSize: 26, fontWeight: 700, color: text, fontFamily: "'Poppins', sans-serif", margin: "0 0 8px" }}>Fitur Unggulan</h2>
          <p style={{ textAlign: "center", color: sub, marginBottom: 36, fontFamily: "'Poppins', sans-serif" }}>Semua yang kamu butuhkan untuk menjaga kesehatan ada di sini</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {features.map(f => (
              <div key={f.title} style={{ background: card, borderRadius: 16, padding: "28px 20px", border: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`, textAlign: "center", transition: "transform 0.2s", cursor: "default" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                <div style={{ fontSize: 36, marginBottom: 14 }}>{f.icon}</div>
                <h3 style={{ fontWeight: 600, fontSize: 16, color: text, margin: "0 0 8px", fontFamily: "'Poppins', sans-serif" }}>{f.title}</h3>
                <p style={{ color: sub, fontSize: 13, lineHeight: 1.6, margin: 0, fontFamily: "'Poppins', sans-serif" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div style={{ background: "linear-gradient(135deg, #0E9F6E15, #0891B215)", border: `1.5px solid ${COLORS.primaryLight}`, borderRadius: 20, padding: "40px 32px", textAlign: "center", marginBottom: 60 }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🩺</div>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: COLORS.primaryDark, margin: "0 0 10px", fontFamily: "'Poppins', sans-serif" }}>Sudah tahu kondisi kesehatanmu?</h3>
          <p style={{ color: sub, marginBottom: 20, fontFamily: "'Poppins', sans-serif" }}>Lakukan pemeriksaan risiko anemia sekarang. Hanya butuh 3 menit!</p>
          <button onClick={() => setActive("Cek Risiko")} style={{ background: COLORS.primary, color: "#fff", border: "none", padding: "14px 32px", borderRadius: 12, fontWeight: 600, fontSize: 15, cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>
            Mulai Sekarang →
          </button>
        </div>
      </div>
    </div>
  );
}

function TentangAnemia({ darkMode }) {
  const bg = darkMode ? "#111827" : COLORS.bg;
  const card = darkMode ? "#1F2937" : "#fff";
  const text = darkMode ? "#F9FAFB" : COLORS.dark;
  const sub = darkMode ? "#9CA3AF" : COLORS.gray;

  const symptoms = ["Sering pusing dan sakit kepala", "Mudah lelah dan tidak bertenaga", "Wajah, kulit, dan kuku tampak pucat", "Sulit berkonsentrasi saat belajar", "Jantung berdebar lebih cepat", "Sesak napas saat aktivitas ringan", "Nafsu makan berkurang", "Menstruasi yang lebih banyak dari biasanya"];
  const causes = [{ icon: "🩸", title: "Menstruasi", desc: "Kehilangan darah setiap bulan mengurangi cadangan zat besi tubuh" }, { icon: "🥗", title: "Kurang Zat Besi", desc: "Asupan makanan rendah zat besi seperti daging merah dan sayuran hijau" }, { icon: "📚", title: "Pertumbuhan Cepat", desc: "Masa remaja membutuhkan lebih banyak zat besi untuk pertumbuhan" }, { icon: "🧬", title: "Gangguan Absorpsi", desc: "Kondisi tertentu menghambat penyerapan zat besi di usus halus" }];
  const impacts = ["Prestasi belajar menurun drastis", "Daya tahan tubuh melemah", "Gangguan tumbuh kembang", "Risiko komplikasi saat hamil", "Produktivitas sehari-hari berkurang", "Gangguan emosi dan mood"];

  return (
    <div style={{ background: bg, minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(135deg, #0E9F6E, #0891B2)", padding: "60px 24px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: 36, fontWeight: 700, fontFamily: "'Poppins', sans-serif", margin: "0 0 12px" }}>Mengenal Anemia 🩺</h1>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 16, fontFamily: "'Poppins', sans-serif", maxWidth: 560, margin: "0 auto" }}>Pahami anemia lebih dalam agar kamu bisa mencegah dan mengatasinya sejak dini</p>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 24px" }}>
        {/* Definisi */}
        <div style={{ background: card, borderRadius: 20, padding: "32px", marginBottom: 32, border: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}` }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
            <div style={{ width: 60, height: 60, background: `${COLORS.primaryLight}`, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0 }}>🩸</div>
            <div>
              <h2 style={{ fontWeight: 700, fontSize: 20, color: text, margin: "0 0 12px", fontFamily: "'Poppins', sans-serif" }}>Apa Itu Anemia?</h2>
              <p style={{ color: sub, lineHeight: 1.8, margin: 0, fontFamily: "'Poppins', sans-serif", fontSize: 15 }}>
                Anemia adalah kondisi medis di mana kadar <strong style={{ color: COLORS.primary }}>hemoglobin (Hb)</strong> dalam darah berada di bawah nilai normal. Hemoglobin adalah protein dalam sel darah merah yang bertugas mengangkut oksigen ke seluruh tubuh. Pada remaja putri, kadar Hb normal adalah <strong style={{ color: COLORS.primary }}>≥ 12 g/dL</strong>. Jika di bawah angka tersebut, tubuh tidak mendapatkan cukup oksigen dan kamu akan merasa lemas, pucat, serta sulit berkonsentrasi.
              </p>
            </div>
          </div>
        </div>

        {/* Penyebab */}
        <h2 style={{ fontWeight: 700, fontSize: 22, color: text, margin: "0 0 20px", fontFamily: "'Poppins', sans-serif" }}>Penyebab Anemia pada Remaja Putri</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 40 }}>
          {causes.map(c => (
            <div key={c.title} style={{ background: card, borderRadius: 16, padding: "24px 20px", border: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`, textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{c.icon}</div>
              <h3 style={{ fontWeight: 600, color: COLORS.primary, margin: "0 0 8px", fontFamily: "'Poppins', sans-serif", fontSize: 15 }}>{c.title}</h3>
              <p style={{ color: sub, fontSize: 13, lineHeight: 1.6, margin: 0, fontFamily: "'Poppins', sans-serif" }}>{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Gejala */}
        <div style={{ background: card, borderRadius: 20, padding: "32px", marginBottom: 32, border: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}` }}>
          <h2 style={{ fontWeight: 700, fontSize: 20, color: text, margin: "0 0 20px", fontFamily: "'Poppins', sans-serif" }}>⚠️ Gejala yang Perlu Diwaspadai</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10 }}>
            {symptoms.map(s => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: `${COLORS.danger}10`, borderRadius: 10, border: `1px solid ${COLORS.danger}25` }}>
                <span style={{ color: COLORS.danger, fontWeight: 700 }}>!</span>
                <span style={{ fontSize: 13.5, color: text, fontFamily: "'Poppins', sans-serif" }}>{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dampak */}
        <div style={{ background: "linear-gradient(135deg, #FEF3C710, #FEE2E230)", borderRadius: 20, padding: "32px", marginBottom: 32, border: `1px solid ${COLORS.warning}30` }}>
          <h2 style={{ fontWeight: 700, fontSize: 20, color: text, margin: "0 0 20px", fontFamily: "'Poppins', sans-serif" }}>📉 Dampak Anemia</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10 }}>
            {impacts.map(imp => (
              <div key={imp} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "rgba(255,255,255,0.5)", borderRadius: 10 }}>
                <span style={{ color: COLORS.warning }}>⚡</span>
                <span style={{ fontSize: 13.5, color: text, fontFamily: "'Poppins', sans-serif" }}>{imp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pencegahan */}
        <div style={{ background: "linear-gradient(135deg, #0E9F6E15, #0891B215)", borderRadius: 20, padding: "32px", border: `1.5px solid ${COLORS.primaryLight}` }}>
          <h2 style={{ fontWeight: 700, fontSize: 20, color: COLORS.primaryDark, margin: "0 0 20px", fontFamily: "'Poppins', sans-serif" }}>✅ Cara Pencegahan Anemia</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
            {[["🥩", "Makan makanan kaya zat besi setiap hari (daging, bayam, kacang)"], ["💊", "Konsumsi Tablet Tambah Darah (TTD) 1 tablet setiap minggu"], ["🍊", "Minum jus jeruk saat makan untuk bantu penyerapan zat besi"], ["🚫", "Hindari teh/kopi saat makan karena menghambat penyerapan Fe"], ["🩺", "Periksa kadar Hb rutin minimal 6 bulan sekali"], ["💤", "Tidur cukup 8 jam dan kelola stres dengan baik"]].map(([icon, tip]) => (
              <div key={tip} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 14px", background: "rgba(255,255,255,0.6)", borderRadius: 12 }}>
                <span style={{ fontSize: 20 }}>{icon}</span>
                <span style={{ fontSize: 13.5, color: darkMode ? "#1F2937" : COLORS.dark, lineHeight: 1.5, fontFamily: "'Poppins', sans-serif" }}>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CekRisiko({ setActive, setCheckResult, darkMode }) {
  const bg = darkMode ? "#111827" : COLORS.bg;
  const card = darkMode ? "#1F2937" : "#fff";
  const text = darkMode ? "#F9FAFB" : COLORS.dark;
  const sub = darkMode ? "#9CA3AF" : COLORS.gray;
  const inputStyle = { width: "100%", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${darkMode ? "#374151" : "#E5E7EB"}`, fontFamily: "'Poppins', sans-serif", fontSize: 14, background: darkMode ? "#374151" : "#F9FAFB", color: text, outline: "none", boxSizing: "border-box" };
  const labelStyle = { display: "block", fontSize: 13, fontWeight: 600, color: sub, marginBottom: 6, fontFamily: "'Poppins', sans-serif" };

  const [form, setForm] = useState({
    nama: "", umur: "", bb: "", tb: "", hb: "", sayur: "", besi: "",
    pusing: false, lelah: false, pucat: false, konsentrasi: false, menstruasi: false
  });
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const validateStep1 = () => {
    const e = {};
    if (!form.nama.trim()) e.nama = "Nama wajib diisi";
    if (!form.umur || form.umur < 10 || form.umur > 25) e.umur = "Umur tidak valid (10-25 tahun)";
    if (!form.bb || form.bb < 20 || form.bb > 150) e.bb = "Berat badan tidak valid";
    if (!form.tb || form.tb < 100 || form.tb > 220) e.tb = "Tinggi badan tidak valid";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e = {};
    if (!form.hb || form.hb < 4 || form.hb > 20) e.hb = "Kadar Hb tidak valid (4-20 g/dL)";
    if (!form.sayur) e.sayur = "Wajib dipilih";
    if (!form.besi) e.besi = "Wajib dipilih";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    const hb = parseFloat(form.hb);
    const bb = parseFloat(form.bb);
    const tb = parseFloat(form.tb) / 100;
    const imt = bb / (tb * tb);
    const gejalaCount = [form.pusing, form.lelah, form.pucat, form.konsentrasi, form.menstruasi].filter(Boolean).length;

    let status = "Normal";
    let score = 0;
    if (hb < 12) score += 3;
    else if (hb < 13) score += 1;
    if (gejalaCount >= 4) score += 3;
    else if (gejalaCount >= 2) score += 2;
    else if (gejalaCount >= 1) score += 1;
    if (form.sayur === "jarang") score += 1;
    if (form.besi === "jarang") score += 1;
    if (imt < 18.5) score += 1;

    if (score >= 5) status = "Risiko Anemia Tinggi";
    else if (score >= 3) status = "Risiko Anemia Ringan";

    let imtStatus = "Normal";
    if (imt < 18.5) imtStatus = "Kurus";
    else if (imt >= 25 && imt < 30) imtStatus = "Gemuk";
    else if (imt >= 30) imtStatus = "Obesitas";

    setCheckResult({ ...form, hb, imt: imt.toFixed(1), imtStatus, gejalaCount, score, status });
    setActive("Hasil");
  };

  const SelectInput = ({ label, id, value, onChange, options, error }) => (
    <div>
      <label style={labelStyle}>{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
        <option value="">-- Pilih --</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {error && <p style={{ color: COLORS.danger, fontSize: 11, margin: "4px 0 0", fontFamily: "'Poppins', sans-serif" }}>{error}</p>}
    </div>
  );

  return (
    <div style={{ background: bg, minHeight: "100vh", padding: "40px 24px" }}>
      <div style={{ maxWidth: 620, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: text, fontFamily: "'Poppins', sans-serif", margin: "0 0 8px" }}>🔍 Cek Risiko Anemia</h1>
          <p style={{ color: sub, fontFamily: "'Poppins', sans-serif", fontSize: 14 }}>Isi data dengan jujur untuk hasil yang akurat</p>
        </div>

        {/* Progress */}
        <div style={{ display: "flex", gap: 8, marginBottom: 32, alignItems: "center" }}>
          {[1, 2, 3].map(s => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 8, flex: s < 3 ? 1 : "none" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: step >= s ? COLORS.primary : (darkMode ? "#374151" : "#E5E7EB"), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: step >= s ? "#fff" : sub, flexShrink: 0, fontFamily: "'Poppins', sans-serif" }}>{s}</div>
              {s < 3 && <div style={{ flex: 1, height: 3, background: step > s ? COLORS.primary : (darkMode ? "#374151" : "#E5E7EB"), borderRadius: 99 }} />}
            </div>
          ))}
        </div>

        <div style={{ background: card, borderRadius: 20, padding: "32px", border: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
          {step === 1 && (
            <div>
              <h2 style={{ fontWeight: 700, fontSize: 18, color: text, margin: "0 0 24px", fontFamily: "'Poppins', sans-serif" }}>📋 Data Pribadi</h2>
              <div style={{ display: "grid", gap: 18 }}>
                <div>
                  <label style={labelStyle}>Nama Lengkap</label>
                  <input value={form.nama} onChange={e => set("nama", e.target.value)} placeholder="Masukkan nama lengkap" style={inputStyle} />
                  {errors.nama && <p style={{ color: COLORS.danger, fontSize: 11, margin: "4px 0 0", fontFamily: "'Poppins', sans-serif" }}>{errors.nama}</p>}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={labelStyle}>Umur (tahun)</label>
                    <input type="number" value={form.umur} onChange={e => set("umur", e.target.value)} placeholder="Contoh: 16" style={inputStyle} />
                    {errors.umur && <p style={{ color: COLORS.danger, fontSize: 11, margin: "4px 0 0", fontFamily: "'Poppins', sans-serif" }}>{errors.umur}</p>}
                  </div>
                  <SelectInput label="Jenis Kelamin" id="jk" value={form.jk || ""} onChange={v => set("jk", v)} options={[{ value: "perempuan", label: "Perempuan" }, { value: "laki", label: "Laki-laki" }]} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={labelStyle}>Berat Badan (kg)</label>
                    <input type="number" value={form.bb} onChange={e => set("bb", e.target.value)} placeholder="Contoh: 50" style={inputStyle} />
                    {errors.bb && <p style={{ color: COLORS.danger, fontSize: 11, margin: "4px 0 0", fontFamily: "'Poppins', sans-serif" }}>{errors.bb}</p>}
                  </div>
                  <div>
                    <label style={labelStyle}>Tinggi Badan (cm)</label>
                    <input type="number" value={form.tb} onChange={e => set("tb", e.target.value)} placeholder="Contoh: 158" style={inputStyle} />
                    {errors.tb && <p style={{ color: COLORS.danger, fontSize: 11, margin: "4px 0 0", fontFamily: "'Poppins', sans-serif" }}>{errors.tb}</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 style={{ fontWeight: 700, fontSize: 18, color: text, margin: "0 0 24px", fontFamily: "'Poppins', sans-serif" }}>🩺 Data Kesehatan</h2>
              <div style={{ display: "grid", gap: 18 }}>
                <div>
                  <label style={labelStyle}>Kadar Hemoglobin / Hb (g/dL)</label>
                  <input type="number" step="0.1" value={form.hb} onChange={e => set("hb", e.target.value)} placeholder="Contoh: 11.5" style={inputStyle} />
                  {errors.hb && <p style={{ color: COLORS.danger, fontSize: 11, margin: "4px 0 0", fontFamily: "'Poppins', sans-serif" }}>{errors.hb}</p>}
                  <p style={{ color: sub, fontSize: 11, margin: "4px 0 0", fontFamily: "'Poppins', sans-serif" }}>💡 Bisa diperoleh dari hasil pemeriksaan darah di Puskesmas/Klinik</p>
                </div>
                <SelectInput label="Frekuensi Konsumsi Sayur" value={form.sayur} onChange={v => set("sayur", v)} options={[{ value: "sering", label: "Sering (≥4x seminggu)" }, { value: "cukup", label: "Cukup (2-3x seminggu)" }, { value: "jarang", label: "Jarang (<2x seminggu)" }]} error={errors.sayur} />
                <SelectInput label="Frekuensi Makan Makanan Tinggi Zat Besi" value={form.besi} onChange={v => set("besi", v)} options={[{ value: "sering", label: "Sering (≥3x seminggu)" }, { value: "cukup", label: "Cukup (1-2x seminggu)" }, { value: "jarang", label: "Jarang (<1x seminggu)" }]} error={errors.besi} />
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 style={{ fontWeight: 700, fontSize: 18, color: text, margin: "0 0 8px", fontFamily: "'Poppins', sans-serif" }}>⚠️ Gejala yang Dirasakan</h2>
              <p style={{ color: sub, fontSize: 13, margin: "0 0 24px", fontFamily: "'Poppins', sans-serif" }}>Centang gejala yang sering kamu alami dalam 1 bulan terakhir:</p>
              <div style={{ display: "grid", gap: 12 }}>
                {[["pusing", "😵 Sering pusing atau sakit kepala"], ["lelah", "😴 Mudah lelah dan tidak bertenaga"], ["pucat", "😐 Wajah dan kulit tampak lebih pucat"], ["konsentrasi", "🤔 Sulit berkonsentrasi saat belajar"], ["menstruasi", "🩸 Menstruasi berlebihan (>7 hari / ganti pembalut >6x/hari)"]].map(([key, label]) => (
                  <label key={key} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 16px", background: form[key] ? `${COLORS.primary}12` : (darkMode ? "#374151" : "#F9FAFB"), borderRadius: 12, border: `1.5px solid ${form[key] ? COLORS.primary : (darkMode ? "#4B5563" : "#E5E7EB")}`, cursor: "pointer", transition: "all 0.2s" }}>
                    <input type="checkbox" checked={form[key]} onChange={e => set(key, e.target.checked)} style={{ marginTop: 2, width: 16, height: 16, accentColor: COLORS.primary }} />
                    <span style={{ fontSize: 14, color: text, fontFamily: "'Poppins', sans-serif", lineHeight: 1.4 }}>{label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28, gap: 12 }}>
            {step > 1 ? (
              <button onClick={() => setStep(s => s - 1)} style={{ flex: 1, padding: "13px", borderRadius: 10, border: `1.5px solid ${darkMode ? "#374151" : "#E5E7EB"}`, background: "transparent", color: text, fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>← Kembali</button>
            ) : <div style={{ flex: 1 }} />}
            {step < 3 ? (
              <button onClick={() => { if ((step === 1 && validateStep1()) || (step === 2 && validateStep2())) setStep(s => s + 1); }} style={{ flex: 1, padding: "13px", borderRadius: 10, border: "none", background: COLORS.primary, color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>Lanjut →</button>
            ) : (
              <button onClick={submit} style={{ flex: 1, padding: "13px", borderRadius: 10, border: "none", background: "linear-gradient(135deg, #0E9F6E, #0891B2)", color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>🔍 Lihat Hasil Pemeriksaan</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function HasilPemeriksaan({ result, setActive, darkMode }) {
  const bg = darkMode ? "#111827" : COLORS.bg;
  const card = darkMode ? "#1F2937" : "#fff";
  const text = darkMode ? "#F9FAFB" : COLORS.dark;
  const sub = darkMode ? "#9CA3AF" : COLORS.gray;

  if (!result) return (
    <div style={{ background: bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
      <p style={{ color: sub, fontFamily: "'Poppins', sans-serif" }}>Belum ada hasil pemeriksaan</p>
      <button onClick={() => setActive("Cek Risiko")} style={{ background: COLORS.primary, color: "#fff", border: "none", padding: "12px 24px", borderRadius: 10, cursor: "pointer", fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>Mulai Pemeriksaan</button>
    </div>
  );

  const isNormal = result.status === "Normal";
  const isHigh = result.status === "Risiko Anemia Tinggi";
  const statusColor = isNormal ? COLORS.primary : isHigh ? COLORS.danger : COLORS.warning;
  const statusBg = isNormal ? COLORS.primaryLight : isHigh ? COLORS.dangerLight : "#FEF3C7";
  const healthScore = Math.max(0, 100 - result.score * 15);

  const downloadPDF = () => {
    const content = `
NutriFem Care - Hasil Pemeriksaan Anemia
==========================================
Tanggal: ${new Date().toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}

DATA PRIBADI
- Nama     : ${result.nama}
- Umur     : ${result.umur} tahun
- BB/TB    : ${result.bb} kg / ${result.tb} cm
- IMT      : ${result.imt} kg/m² (${result.imtStatus})

DATA KESEHATAN
- Kadar Hb : ${result.hb} g/dL
- Gejala   : ${result.gejalaCount}/5 gejala

HASIL PEMERIKSAAN
- Status   : ${result.status}
- Skor Risiko: ${result.score}

REKOMENDASI
${isNormal ? "Pertahankan pola makan sehat dengan cukup zat besi. Periksa Hb rutin 6 bulan sekali." : "Tingkatkan konsumsi makanan kaya zat besi (bayam, hati, daging, kacang). Konsultasikan ke dokter atau bidan."}

==========================================
NutriFem Care - Cegah Anemia, Jaga Kesehatan Remaja Putri
    `;
    const blob = new Blob([content], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `NutriFemCare_${result.nama.replace(/\s+/g, "_")}.txt`;
    a.click();
  };

  return (
    <div style={{ background: bg, minHeight: "100vh", padding: "40px 24px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        {/* Status Card */}
        <div style={{ background: statusBg, borderRadius: 20, padding: "32px", textAlign: "center", marginBottom: 24, border: `2px solid ${statusColor}30` }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>{isNormal ? "✅" : isHigh ? "🚨" : "⚠️"}</div>
          <p style={{ color: statusColor, fontSize: 13, fontWeight: 600, margin: "0 0 4px", fontFamily: "'Poppins', sans-serif", textTransform: "uppercase", letterSpacing: 1 }}>Hasil Pemeriksaan</p>
          <h2 style={{ color: statusColor, fontSize: 28, fontWeight: 700, margin: "0 0 8px", fontFamily: "'Poppins', sans-serif" }}>{result.status}</h2>
          <p style={{ color: darkMode ? "#1F2937" : sub, fontFamily: "'Poppins', sans-serif", fontSize: 14 }}>Halo, <strong>{result.nama}</strong>! Berikut hasil pemeriksaan kesehatanmu.</p>
        </div>

        {/* Health Score */}
        <div style={{ background: card, borderRadius: 20, padding: "28px", marginBottom: 20, border: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}` }}>
          <h3 style={{ fontWeight: 700, fontSize: 16, color: text, margin: "0 0 20px", fontFamily: "'Poppins', sans-serif" }}>📊 Indikator Kesehatan</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16, marginBottom: 24 }}>
            {[["Kadar Hb", `${result.hb} g/dL`, result.hb >= 12 ? COLORS.primary : COLORS.danger], ["IMT", `${result.imt}`, result.imtStatus === "Normal" ? COLORS.primary : COLORS.warning], ["Status IMT", result.imtStatus, COLORS.teal], ["Gejala", `${result.gejalaCount}/5`, result.gejalaCount >= 3 ? COLORS.danger : COLORS.primary]].map(([label, value, color]) => (
              <div key={label} style={{ textAlign: "center", padding: "16px 12px", background: darkMode ? "#374151" : "#F9FAFB", borderRadius: 12 }}>
                <div style={{ fontSize: 20, fontWeight: 700, color, fontFamily: "'Poppins', sans-serif" }}>{value}</div>
                <div style={{ fontSize: 12, color: sub, fontFamily: "'Poppins', sans-serif", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: sub, fontFamily: "'Poppins', sans-serif" }}>Skor Kesehatan</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: statusColor, fontFamily: "'Poppins', sans-serif" }}>{healthScore}%</span>
            </div>
            <div style={{ height: 10, background: darkMode ? "#374151" : "#E5E7EB", borderRadius: 99, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${healthScore}%`, background: `linear-gradient(90deg, ${statusColor}, ${isNormal ? COLORS.teal : statusColor})`, borderRadius: 99, transition: "width 1s ease" }} />
            </div>
          </div>
        </div>

        {/* Rekomendasi */}
        {!isNormal && (
          <div style={{ background: COLORS.dangerLight, borderRadius: 16, padding: "24px", marginBottom: 20, border: `1px solid ${COLORS.danger}30` }}>
            <h3 style={{ color: COLORS.danger, fontWeight: 700, margin: "0 0 12px", fontFamily: "'Poppins', sans-serif", fontSize: 16 }}>🚨 Saran Penting</h3>
            <ul style={{ margin: 0, paddingLeft: 20, fontFamily: "'Poppins', sans-serif", fontSize: 13.5, color: "#9B1C1C", lineHeight: 1.8 }}>
              <li>Segera konsultasikan ke dokter, bidan, atau petugas Puskesmas</li>
              <li>Minum Tablet Tambah Darah (TTD) 1 tablet setiap minggu</li>
              <li>Perbanyak konsumsi makanan tinggi zat besi setiap hari</li>
              <li>Hindari minum teh, kopi, atau susu saat makan</li>
              {isHigh && <li><strong>Lakukan pemeriksaan darah lengkap sesegera mungkin</strong></li>}
            </ul>
          </div>
        )}

        {/* Rekomendasi Makanan */}
        <div style={{ background: card, borderRadius: 20, padding: "28px", marginBottom: 20, border: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}` }}>
          <h3 style={{ fontWeight: 700, fontSize: 16, color: text, margin: "0 0 20px", fontFamily: "'Poppins', sans-serif" }}>🥗 Rekomendasi Makanan Tinggi Zat Besi</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
            {FOOD_DATA.map(f => (
              <div key={f.name} style={{ background: darkMode ? "#374151" : "#F9FAFB", borderRadius: 12, padding: "16px 12px", textAlign: "center", border: `1px solid ${darkMode ? "#4B5563" : "#E5E7EB"}` }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{f.icon}</div>
                <div style={{ fontWeight: 600, color: text, fontSize: 13, fontFamily: "'Poppins', sans-serif" }}>{f.name}</div>
                <div style={{ color: COLORS.primary, fontSize: 11, fontWeight: 600, margin: "4px 0 6px", fontFamily: "'Poppins', sans-serif" }}>{f.iron}</div>
                <div style={{ color: sub, fontSize: 11, lineHeight: 1.5, fontFamily: "'Poppins', sans-serif" }}>{f.benefit}</div>
              </div>
            ))}
          </div>
        </div>

        {isNormal && (
          <div style={{ background: COLORS.primaryLight, borderRadius: 16, padding: "24px", marginBottom: 20, border: `1px solid ${COLORS.primary}30` }}>
            <h3 style={{ color: COLORS.primaryDark, fontWeight: 700, margin: "0 0 12px", fontFamily: "'Poppins', sans-serif", fontSize: 16 }}>✅ Tips Mempertahankan Kesehatan</h3>
            <ul style={{ margin: 0, paddingLeft: 20, fontFamily: "'Poppins', sans-serif", fontSize: 13.5, color: COLORS.primaryDark, lineHeight: 1.8 }}>
              <li>Pertahankan pola makan bergizi seimbang setiap hari</li>
              <li>Tetap konsumsi makanan kaya zat besi 3-4x per minggu</li>
              <li>Minum Tablet Tambah Darah (TTD) mingguan sebagai pencegahan</li>
              <li>Periksa kadar Hb minimal 6 bulan sekali di Puskesmas</li>
              <li>Tetap aktif bergerak dan kelola stres dengan baik</li>
            </ul>
          </div>
        )}

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button onClick={downloadPDF} style={{ flex: 1, minWidth: 160, padding: "13px", borderRadius: 10, border: `1.5px solid ${COLORS.primary}`, background: "transparent", color: COLORS.primary, fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>
            📥 Download Hasil
          </button>
          <button onClick={() => setActive("Cek Risiko")} style={{ flex: 1, minWidth: 160, padding: "13px", borderRadius: 10, border: "none", background: COLORS.primary, color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>
            🔄 Periksa Ulang
          </button>
        </div>
      </div>
    </div>
  );
}

function EdukasiGizi({ darkMode }) {
  const bg = darkMode ? "#111827" : COLORS.bg;
  const card = darkMode ? "#1F2937" : "#fff";
  const text = darkMode ? "#F9FAFB" : COLORS.dark;
  const sub = darkMode ? "#9CA3AF" : COLORS.gray;
  const [expanded, setExpanded] = useState(null);

  return (
    <div style={{ background: bg, minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(135deg, #0E9F6E, #0891B2)", padding: "60px 24px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: 32, fontWeight: 700, fontFamily: "'Poppins', sans-serif", margin: "0 0 10px" }}>📚 Edukasi Gizi</h1>
        <p style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'Poppins', sans-serif" }}>Artikel dan informasi kesehatan seputar anemia dan gizi remaja putri</p>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 48 }}>
          {ARTICLES.map((a, i) => (
            <div key={a.title} style={{ background: card, borderRadius: 18, overflow: "hidden", border: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`, transition: "transform 0.2s", cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              <div style={{ height: 140, background: `linear-gradient(135deg, ${a.color}25, ${a.color}10)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 60 }}>
                {["🩺", "🧲", "💊", "🥗"][i]}
              </div>
              <div style={{ padding: "20px" }}>
                <span style={{ background: `${a.color}20`, color: a.color, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 99, fontFamily: "'Poppins', sans-serif" }}>{a.tag}</span>
                <h3 style={{ fontWeight: 600, fontSize: 15, color: text, margin: "10px 0 8px", lineHeight: 1.4, fontFamily: "'Poppins', sans-serif" }}>{a.title}</h3>
                <p style={{ color: sub, fontSize: 13, lineHeight: 1.6, margin: "0 0 14px", fontFamily: "'Poppins', sans-serif" }}>{expanded === i ? a.desc + " Konsultasikan selalu ke tenaga medis untuk penanganan yang tepat sesuai kondisimu." : a.desc.substring(0, 90) + "..."}</p>
                <button onClick={() => setExpanded(expanded === i ? null : i)} style={{ background: "transparent", border: "none", color: a.color, fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "'Poppins', sans-serif", padding: 0 }}>
                  {expanded === i ? "Tutup ↑" : "Baca Selengkapnya →"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Zat Besi */}
        <div style={{ background: card, borderRadius: 20, padding: "32px", border: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}` }}>
          <h2 style={{ fontWeight: 700, fontSize: 20, color: text, margin: "0 0 20px", fontFamily: "'Poppins', sans-serif" }}>🧲 Fakta Zat Besi yang Wajib Kamu Tahu</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
            {[["Kebutuhan Harian", "Remaja putri membutuhkan 15-18 mg zat besi per hari, lebih tinggi dari remaja putra.", "🎯"], ["Dua Jenis Zat Besi", "Heme (dari daging/ikan) diserap 15-35%. Non-heme (dari tumbuhan) diserap 2-20%. Konsumsi bersama vitamin C untuk meningkatkan penyerapan.", "🔬"], ["Penghambat Penyerapan", "Teh, kopi, kalsium susu, dan fitat (kulit sereal) dapat menghambat penyerapan zat besi. Jangan minum bersamaan saat makan.", "🚫"], ["Penyerapan Optimal", "Konsumsi vitamin C (jeruk, tomat, paprika) bersamaan dengan makanan tinggi zat besi dapat meningkatkan penyerapan hingga 3x lipat.", "✅"]].map(([title, desc, icon]) => (
              <div key={title} style={{ padding: "20px", background: darkMode ? "#374151" : "#F9FAFB", borderRadius: 14 }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
                <h3 style={{ fontWeight: 600, fontSize: 14, color: COLORS.primary, margin: "0 0 8px", fontFamily: "'Poppins', sans-serif" }}>{title}</h3>
                <p style={{ color: sub, fontSize: 13, lineHeight: 1.6, margin: 0, fontFamily: "'Poppins', sans-serif" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Konsultasi({ darkMode }) {
  const bg = darkMode ? "#111827" : COLORS.bg;
  const card = darkMode ? "#1F2937" : "#fff";
  const text = darkMode ? "#F9FAFB" : COLORS.dark;
  const sub = darkMode ? "#9CA3AF" : COLORS.gray;

  const [messages, setMessages] = useState([{ role: "bot", text: "Halo! Aku adalah Asisten Gizi NutriFem Care 💚 Siap membantu kamu tentang anemia, gizi, dan kesehatan remaja putri. Ada yang ingin kamu tanyakan?" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const quickQs = ["Apa itu anemia?", "Makanan tinggi zat besi?", "Cara mencegah anemia?", "Kenapa sering lemas?", "Berapa Hb normal remaja putri?"];

  const sendMessage = async (msg) => {
    if (!msg.trim() || loading) return;
    const userMsg = msg.trim();
    setMessages(p => [...p, { role: "user", text: userMsg }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: "Kamu adalah asisten gizi bernama 'Nuri' dari aplikasi NutriFem Care, sebuah aplikasi kesehatan untuk remaja putri Indonesia yang berfokus pada pencegahan anemia. Jawab pertanyaan dengan bahasa Indonesia yang ramah, santai, informatif, dan mudah dipahami remaja. Gunakan emoji yang sesuai. Fokus pada topik: anemia, zat besi, hemoglobin, gizi seimbang, pola makan sehat, dan kesehatan remaja putri. Jika pertanyaan di luar topik, tetap jawab dengan sopan dan arahkan kembali ke topik kesehatan. Berikan jawaban yang praktis dan actionable. Jangan terlalu panjang, maksimal 150 kata.",
          messages: [{ role: "user", content: userMsg }]
        })
      });
      const data = await response.json();
      const botText = data.content?.[0]?.text || "Maaf, aku tidak bisa menjawab saat ini. Coba lagi ya!";
      setMessages(p => [...p, { role: "bot", text: botText }]);
    } catch {
      setMessages(p => [...p, { role: "bot", text: "Aduh, koneksinya bermasalah nih 😅 Coba tanyakan lagi ya!" }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ background: bg, minHeight: "100vh", padding: "40px 24px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: text, fontFamily: "'Poppins', sans-serif", margin: "0 0 6px" }}>💬 Konsultasi Gizi</h1>
          <p style={{ color: sub, fontFamily: "'Poppins', sans-serif", fontSize: 13 }}>Tanya apa saja seputar anemia dan gizi remaja putri</p>
        </div>

        {/* Quick Questions */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16, justifyContent: "center" }}>
          {quickQs.map(q => (
            <button key={q} onClick={() => sendMessage(q)} style={{ background: COLORS.primaryLight, color: COLORS.primaryDark, border: "none", padding: "7px 14px", borderRadius: 99, fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>{q}</button>
          ))}
        </div>

        {/* Chat Area */}
        <div style={{ background: card, borderRadius: 20, border: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`, overflow: "hidden" }}>
          <div style={{ padding: "12px 20px", borderBottom: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, background: "linear-gradient(135deg, #0E9F6E, #0891B2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>💚</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, color: text, fontFamily: "'Poppins', sans-serif" }}>Nuri - Asisten Gizi</div>
              <div style={{ fontSize: 11, color: COLORS.primary, fontFamily: "'Poppins', sans-serif" }}>● Online</div>
            </div>
          </div>

          <div style={{ height: 400, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: 14 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", gap: 8 }}>
                {m.role === "bot" && <div style={{ width: 30, height: 30, background: COLORS.primaryLight, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0, marginTop: 2 }}>💚</div>}
                <div style={{ maxWidth: "75%", padding: "12px 16px", borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: m.role === "user" ? "linear-gradient(135deg, #0E9F6E, #0891B2)" : (darkMode ? "#374151" : "#F3F4F6"), color: m.role === "user" ? "#fff" : text, fontSize: 14, lineHeight: 1.6, fontFamily: "'Poppins', sans-serif", whiteSpace: "pre-wrap" }}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ width: 30, height: 30, background: COLORS.primaryLight, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>💚</div>
                <div style={{ padding: "12px 16px", borderRadius: "16px 16px 16px 4px", background: darkMode ? "#374151" : "#F3F4F6", color: sub, fontSize: 14, fontFamily: "'Poppins', sans-serif" }}>Nuri sedang mengetik...</div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div style={{ padding: "16px 20px", borderTop: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`, display: "flex", gap: 10 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage(input)} placeholder="Ketik pertanyaanmu di sini..." style={{ flex: 1, padding: "12px 16px", borderRadius: 12, border: `1.5px solid ${darkMode ? "#374151" : "#E5E7EB"}`, background: darkMode ? "#374151" : "#F9FAFB", color: text, fontSize: 14, fontFamily: "'Poppins', sans-serif", outline: "none" }} />
            <button onClick={() => sendMessage(input)} disabled={!input.trim() || loading} style={{ width: 46, height: 46, borderRadius: 12, border: "none", background: input.trim() && !loading ? "linear-gradient(135deg, #0E9F6E, #0891B2)" : (darkMode ? "#374151" : "#E5E7EB"), color: input.trim() && !loading ? "#fff" : sub, fontSize: 18, cursor: input.trim() && !loading ? "pointer" : "default" }}>
              ↑
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Profil({ checkResult, setActive, darkMode }) {
  const bg = darkMode ? "#111827" : COLORS.bg;
  const card = darkMode ? "#1F2937" : "#fff";
  const text = darkMode ? "#F9FAFB" : COLORS.dark;
  const sub = darkMode ? "#9CA3AF" : COLORS.gray;

  const tips = ["💊 Jangan lupa minum Tablet Tambah Darah minggu ini!", "🥗 Konsumsi bayam atau brokoli hari ini untuk zat besi", "💧 Minum 8 gelas air putih per hari", "🌙 Tidur 8 jam malam ini untuk pemulihan tubuh", "🍊 Makan buah kaya vitamin C untuk bantu penyerapan zat besi"];

  return (
    <div style={{ background: bg, minHeight: "100vh", padding: "40px 24px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ background: "linear-gradient(135deg, #0E9F6E, #0891B2)", borderRadius: 20, padding: "32px", textAlign: "center", marginBottom: 24, color: "#fff" }}>
          <div style={{ width: 72, height: 72, background: "rgba(255,255,255,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, margin: "0 auto 14px" }}>👩</div>
          <h2 style={{ fontWeight: 700, fontSize: 22, margin: "0 0 4px", fontFamily: "'Poppins', sans-serif" }}>{checkResult?.nama || "Pengguna NutriFem Care"}</h2>
          <p style={{ opacity: 0.85, fontSize: 14, margin: 0, fontFamily: "'Poppins', sans-serif" }}>{checkResult ? `${checkResult.umur} tahun • IMT: ${checkResult.imt} (${checkResult.imtStatus})` : "Belum ada data pemeriksaan"}</p>
        </div>

        {checkResult ? (
          <div style={{ background: card, borderRadius: 20, padding: "28px", marginBottom: 20, border: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}` }}>
            <h3 style={{ fontWeight: 700, fontSize: 16, color: text, margin: "0 0 16px", fontFamily: "'Poppins', sans-serif" }}>📋 Hasil Pemeriksaan Terakhir</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
              {[["Status", checkResult.status, checkResult.status === "Normal" ? COLORS.primary : checkResult.status.includes("Tinggi") ? COLORS.danger : COLORS.warning], ["Kadar Hb", `${checkResult.hb} g/dL`, checkResult.hb >= 12 ? COLORS.primary : COLORS.danger], ["Gejala", `${checkResult.gejalaCount}/5`, checkResult.gejalaCount >= 3 ? COLORS.danger : COLORS.primary]].map(([label, value, color]) => (
                <div key={label} style={{ textAlign: "center", padding: "16px 12px", background: `${color}12`, borderRadius: 12, border: `1px solid ${color}25` }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color, fontFamily: "'Poppins', sans-serif" }}>{value}</div>
                  <div style={{ fontSize: 12, color: sub, fontFamily: "'Poppins', sans-serif", marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setActive("Hasil")} style={{ width: "100%", marginTop: 16, padding: "12px", borderRadius: 10, border: `1.5px solid ${COLORS.primary}`, background: "transparent", color: COLORS.primary, fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>
              Lihat Detail Hasil →
            </button>
          </div>
        ) : (
          <div style={{ background: card, borderRadius: 20, padding: "32px", marginBottom: 20, border: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`, textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
            <p style={{ color: sub, fontFamily: "'Poppins', sans-serif", marginBottom: 16 }}>Belum ada data pemeriksaan. Mulai pemeriksaan pertamamu!</p>
            <button onClick={() => setActive("Cek Risiko")} style={{ background: COLORS.primary, color: "#fff", border: "none", padding: "13px 28px", borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>
              Mulai Pemeriksaan
            </button>
          </div>
        )}

        {/* Tips Harian */}
        <div style={{ background: card, borderRadius: 20, padding: "28px", border: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}` }}>
          <h3 style={{ fontWeight: 700, fontSize: 16, color: text, margin: "0 0 16px", fontFamily: "'Poppins', sans-serif" }}>💡 Tips Kesehatan Harian</h3>
          {tips.map((tip, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 14px", background: i % 2 === 0 ? (darkMode ? "#374151" : "#F9FAFB") : "transparent", borderRadius: 10, marginBottom: 6 }}>
              <span style={{ fontSize: 18 }}>{["💊", "🥗", "💧", "🌙", "🍊"][i]}</span>
              <span style={{ fontSize: 13.5, color: text, fontFamily: "'Poppins', sans-serif", lineHeight: 1.5 }}>{tip.replace(/^[^\s]+\s/, "")}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Footer({ darkMode }) {
  const bg = darkMode ? "#0F172A" : "#1F2937";
  return (
    <footer style={{ background: bg, color: "#9CA3AF", padding: "48px 24px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32, marginBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ fontSize: 24 }}>💚</div>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 16, fontFamily: "'Poppins', sans-serif" }}>NutriFem Care</span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, margin: 0, fontFamily: "'Poppins', sans-serif" }}>Aplikasi deteksi risiko anemia untuk remaja putri Indonesia. Cegah anemia sejak dini untuk hidup sehat dan berprestasi.</p>
          </div>
          <div>
            <h4 style={{ color: "#fff", fontWeight: 600, margin: "0 0 12px", fontFamily: "'Poppins', sans-serif", fontSize: 14 }}>Menu</h4>
            {["Beranda", "Tentang Anemia", "Cek Risiko", "Edukasi Gizi", "Konsultasi"].map(m => (
              <div key={m} style={{ fontSize: 13, marginBottom: 6, fontFamily: "'Poppins', sans-serif", cursor: "pointer" }}>{m}</div>
            ))}
          </div>
          <div>
            <h4 style={{ color: "#fff", fontWeight: 600, margin: "0 0 12px", fontFamily: "'Poppins', sans-serif", fontSize: 14 }}>Kontak</h4>
            <p style={{ fontSize: 13, margin: "0 0 6px", fontFamily: "'Poppins', sans-serif" }}>📧 info@nutrifemcare.id</p>
            <p style={{ fontSize: 13, margin: "0 0 6px", fontFamily: "'Poppins', sans-serif" }}>📱 Instagram: @nutrifemcare</p>
            <p style={{ fontSize: 13, margin: 0, fontFamily: "'Poppins', sans-serif" }}>📞 0800-111-GIZI</p>
          </div>
          <div>
            <h4 style={{ color: "#fff", fontWeight: 600, margin: "0 0 12px", fontFamily: "'Poppins', sans-serif", fontSize: 14 }}>Info Darurat</h4>
            <p style={{ fontSize: 13, lineHeight: 1.6, margin: 0, fontFamily: "'Poppins', sans-serif" }}>Jika mengalami gejala anemia berat, segera kunjungi Puskesmas atau Klinik terdekat. Hotline Kesehatan: 119 ext 8</p>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #374151", paddingTop: 20, textAlign: "center", fontSize: 12, fontFamily: "'Poppins', sans-serif" }}>
          © 2025 NutriFem Care • Dikembangkan untuk kesehatan remaja putri Indonesia 💚
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("Beranda");
  const [darkMode, setDarkMode] = useState(false);
  const [checkResult, setCheckResult] = useState(null);

  if (loading) return <LoadingScreen onDone={() => setLoading(false)} />;

  const renderPage = () => {
    switch (active) {
      case "Beranda": return <HomePage setActive={setActive} darkMode={darkMode} />;
      case "Tentang Anemia": return <TentangAnemia darkMode={darkMode} />;
      case "Cek Risiko": return <CekRisiko setActive={setActive} setCheckResult={setCheckResult} darkMode={darkMode} />;
      case "Hasil": return <HasilPemeriksaan result={checkResult} setActive={setActive} darkMode={darkMode} />;
      case "Edukasi Gizi": return <EdukasiGizi darkMode={darkMode} />;
      case "Konsultasi": return <Konsultasi darkMode={darkMode} />;
      case "Profil": return <Profil checkResult={checkResult} setActive={setActive} darkMode={darkMode} />;
      default: return <HomePage setActive={setActive} darkMode={darkMode} />;
    }
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", minHeight: "100vh", background: darkMode ? "#111827" : COLORS.bg }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <Navbar active={active} setActive={setActive} darkMode={darkMode} setDarkMode={setDarkMode} />
      <main>{renderPage()}</main>
      <Footer darkMode={darkMode} />
    </div>
  );
}
