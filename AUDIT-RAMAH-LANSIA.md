# Audit Ramah Lansia: PAKKI Website

Tanggal: 14 November 2026
Cakupan: token desain React, komponen bersama, dan empat halaman acuan di `legacy-static/`
Status: temuan saja, belum ada perubahan kode

## Ringkasan

Secara visual situs ini rapi dan tidak ramai. Masalah utamanya bukan gaya, melainkan **ukuran huruf mikro, kepadatan informasi, dan beberapa keputusan yang memaksa pengguna menebak**.

Tiga hal yang paling menghambat pembaca berusia lanjut:

1. Banyak label penting berukuran 8-11px, huruf kapital, dengan jarak antarhuruf lebar. Ini kombinasi terburuk untuk mata tua.
2. `zoom: 1.25` di `html` memperbesar teks, tetapi menyempitkan ruang layout. Di HP 390px, lebar efektif tinggal 312px.
3. Verifikasi anggota memakai dua tab, padahal bisa dideteksi otomatis. Satu keputusan tambahan yang tidak perlu.

Jumlah temuan: **5 prioritas 1, 12 prioritas 2, 7 prioritas 3**.

## Cara audit

- Penelusuran kode manual pada `src/index.css`, `src/components/ui.jsx`, `src/components/Header.jsx`, dan `legacy-static/`.
- Rasio kontras dihitung dengan rumus WCAG 2.1 untuk warna teks dan latar.
- Tidak memakai tangkapan layar otomatis, sesuai permintaan Anda.
- Halaman React belum dibuat, jadi temuan per halaman mengacu pada `legacy-static` yang akan dipindahkan apa adanya. Jika nanti ada perubahan saat porting, temuan bisa berubah.

Batasan: audit ini belum diuji dengan pembaca layar nyata dan belum diuji di perangkat lansia sungguhan.

## Definisi prioritas

- **P1**: menghambat membaca atau menyelesaikan tugas utama.
- **P2**: menimbulkan kesulitan nyata, tapi masih bisa diakali.
- **P3**: pemolesan, dampaknya kecil.

## Temuan lintas halaman

| ID | Prioritas | Temuan | Bukti di kode | Usulan |
|---|---|---|---|---|
| L-01 | P1 | `zoom: 1.25` menyempitkan layout | `src/index.css` baris `html { zoom: 1.25 }` | Hapus zoom, naikkan ukuran dasar ke 18px. Uji di 200% browser zoom. |
| L-02 | P1 | Huruf mikro kapital tersebar di seluruh situs | 8-11px di header, label statistik, tahapan, tag kegiatan, breadcrumb, footer, KTA | Minimum 14px untuk metadata, 16px untuk isi pendukung. Sentence case, tracking normal. |
| L-03 | P2 | Teks sekunder terlalu muda | `--color-ink-3: #5F6B63` di atas `#FBFBF9` = 5.4:1, lulus AA, gagal AAA (7:1) | Gelapkan ke sekitar `#46544B` (7.7:1). |
| L-04 | P2 | Hijau dan amber dipakai untuk teks kecil | Hijau `#0B6B3A` = 6.4:1, amber `#8A5300` = 6.1:1, dipakai pada 9-10px | Jangan pakai warna brand untuk teks di bawah 18px. Pakai `ink-2`, atau hijau yang lebih tua. |
| L-05 | P2 | Teks footer paling bawah hampir tidak terbaca | `#8FAE99` di atas `#063D21` = 5.1:1, ukuran 9px | Naikkan ke `#C3D8C9` (8.2:1) dan ukuran minimal 12px. |
| L-06 | P2 | Isi pendukung 13-15px | Langkah, kegiatan, kartu berita, callout, catatan tarif | Isi utama 18px, pendukung 16px, metadata 14px. |
| L-07 | P2 | Target sentuh kecil | Chip contoh sekitar 31px, tab 36px, subnav 40px, sosial 40px, tautan footer tinggi sekitar 21px | Minimal 52px untuk kontrol utama, 48px untuk tautan daftar, jarak antar target minimal 8px. |
| L-08 | P2 | Affordance bergantung hover | `LinkMore` hanya garis bawah, kartu berita berubah warna saat hover, nav bergaris saat hover | Beri garis bawah permanen pada tautan dalam teks, chevron pada kartu, dan status fokus yang tebal. |
| L-09 | P2 | Menu HP hanya ikon | `Header.jsx` tombol burger 44px tanpa label terlihat | Tulis "Menu" di samping ikon, tinggi 48px. |
| L-10 | P1 | Kontak tersembunyi di dropdown | `Header.jsx` panel Kontak 13px, muncul saat diklik, tutup saat klik luar | Tampilkan email dan kanal resmi langsung di header atau bagian kontak yang terlihat. Dropdown hanya untuk hal sekunder. |
| L-11 | P2 | Tanggal format mesin | `2026-10-02` di berita | "2 Oktober 2026". |
| L-12 | P2 | Banyak istilah teknis tanpa penjelasan | KTA, DPP, DPD, DPC, Hiperkes, Munas, Musda, verifikasi, keabsahan | Jelaskan saat pertama muncul, atau sediakan daftar istilah singkat. |
| L-13 | P2 | Tab verifikasi tidak mendukung panah keyboard | `role="tablist"` tanpa pengelolaan fokus dan tombol panah | Ganti dengan satu kolom auto-deteksi. Jika tetap tab, tambahkan navigasi panah. |
| L-14 | P2 | Label form 9px kapital | Label input verifikasi dan buletin | 16px, sentence case, di atas input, selalu terlihat. |
| L-15 | P2 | Sticky header dan subnav menumpuk | Header 76px + subnav 76px, offset anchor 150px | Kurangi tinggi sticky, atau buat subnav tidak sticky di layar kecil. |
| L-16 | P3 | Tombol nonaktif turun kontras | `disabled:opacity-40` saat memverifikasi | Pertahankan kontras teks, gunakan spinner dan teks "Memverifikasi". |
| L-17 | P3 | Pesan sukses buletin tidak diumumkan | Hanya pesan error yang punya `role="alert"` | Tambahkan `role="status"` pada pesan sukses. |
| L-18 | P3 | Heading footer melompat dari h2 ke h4 | Footer memakai `<h4>` | Pakai `<h3>` atau paragraf bergaya judul. |
| L-19 | P3 | Fokus global membulat 16px | `:focus-visible` di `src/index.css` | Pertahankan, tapi uji pada tautan teks agar tidak terlihat aneh. |

## Temuan per halaman

### Beranda

- **B-01 (P2)** Teks hero memakai putih 82% di atas foto. Kontras bergantung pada area foto yang terang. Naikkan ke putih penuh untuk judul dan paragraf.
- **B-02 (P2)** Label statistik 10px kapital. Angka besar sudah bagus, labelnya yang perlu diperbesar.
- **B-03 (P2)** Diagram nilai radial berisi enam pil 13px. Pada layar sempit, pil di posisi 82.9% berpotensi terpotong. Untuk lansia, daftar dua kolom lebih mudah dibaca dan tidak kehilangan makna.
- **B-04 (P3)** Peran ketua umum 9px dan periode 11px. Perbesar, karena ini informasi identitas.
- **B-05 (P2)** Kartu berita memakai metadata 8-9px dan ringkasan 13px. Perbesar dan ubah tanggal ke format panjang.
- **B-06 (P3)** Formulir buletin memakai placeholder 13px. Placeholder tidak boleh menjadi satu-satunya petunjuk. Pertahankan label yang terlihat.
- **B-07 (P3)** Angka statistik beranimasi 300ms. Sudah menghormati `prefers-reduced-motion`, jadi aman. Tidak perlu diubah.

### Struktur

- **S-01 (P2)** Tabel organisasi punya empat kolom dengan kepala 8px dan isi 13px. Pada tablet masih tiga kolom. Ganti dengan daftar bertingkat: badan sebagai judul, cakupan sebagai baris kedua.
- **S-02 (P2)** Label tingkat 9px dan singkatan 13px. Jika tabel dipertahankan, keduanya perlu minimal 14px.
- **S-03 (P3)** Kartu ketua umum dan callout memakai teks 13px. Callout berisi peringatan penting, jadi naikkan ke 16px.

### Keanggotaan

- **K-01 (P1)** Verifikasi memaksa memilih tab "Nomor Anggota" atau "NIK" sebelum mengisi. Bagi pengguna baru, ini pertanyaan yang tidak perlu. Deteksi otomatis: 16 digit berarti NIK, selain itu nomor anggota.
- **K-02 (P2)** Chip contoh 10px dengan tinggi sekitar 31px. Perbesar teks dan tinggi, karena chip ini justru pintu masuk paling mudah bagi pengguna baru.
- **K-03 (P2)** Kartu hasil verifikasi memakai label 8px dan nilai 12px. Ini bukti resmi, seharusnya paling terbaca di halaman.
- **K-04 (P2)** Catatan tarif 11px, satuan "sekali bayar" dan "per bulan" 8px. Informasi uang harus jelas.
- **K-05 (P2)** Subnav 10px kapital dengan tinggi 40px. Perbesar menjadi 14px dan 48px.
- **K-06 (P2)** Tiga bagian besar dalam satu halaman (verifikasi, registrasi, iuran, KTA) membuat halaman sangat panjang. Pertimbangkan memisahkan verifikasi sebagai halaman sendiri, atau paling tidak beri urutan yang jelas.
- **K-07 (P3)** QR 96px dengan caption 9px. Caption perlu 12-14px.

### Berita

- **N-01 (P2)** Sama seperti beranda: kategori 8px, tanggal 9px, isi 13px.
- **N-02 (P3)** Thumbnail placeholder 16:9 berlabel 9px. Selama belum ada foto, beri label yang lebih jelas, misalnya "Foto kegiatan belum tersedia".
- **N-03 (P3)** Callout "Konten contoh" 13px dan CTA 13px. Naikkan ke 16px.

### Header dan Footer

- **H-01 (P2)** Nama panjang organisasi di header 8px. Jika dipertahankan, minimal 12px, atau sembunyikan di layar kecil dan andalkan logo.
- **H-02 (P2)** Judul kolom footer 9px kapital, tautan 13px. Perbesar dan beri tinggi baris yang nyaman.
- **H-03 (P2)** Ikon sosial 40px tanpa teks. Tambahkan label teks atau naikkan ke 48px.
- **H-04 (P2)** Drawer belum mengelola fokus. Saat dibuka, fokus sebaiknya masuk ke tombol tutup, terkurung di dalam drawer, lalu kembali ke tombol menu saat ditutup.
- **H-05 (P3)** Tombol tutup drawer 40px. Naikkan ke 48px.

## Rekomendasi urutan kerja

| Tahap | Isi | Dampak | Perkiraan usaha |
|---|---|---|---|
| 1 | Hapus zoom, naikkan skala huruf, perbaiki kontras | Paling besar, menyentuh semua halaman | Sedang |
| 2 | Navigasi: tampilkan kontak, label menu, target 52px, fokus drawer | Mengurangi kebingungan | Sedang |
| 3 | Verifikasi satu kolom, hasil lebih besar, format tanggal | Tugas utama jadi lancar | Sedang |
| 4 | Struktur dan nilai jadi daftar sederhana | Mengurangi beban membaca | Kecil |
| 5 | Pemolesan: heading footer, pesan sukses, caption QR | Kecil | Kecil |

## Keputusan yang perlu diambil sebelum tahap 1

1. **Zoom 1.25**: dihapus dan diganti ukuran dasar 18px, atau dipertahankan? Rekomendasi: dihapus.
2. **Kontak**: apakah ada nomor telepon atau WhatsApp resmi? Saat ini hanya email. Untuk lansia, nomor telepon jauh lebih berguna.
3. **Kontak di header**: tampil langsung, atau tetap dropdown? Rekomendasi: email terlihat, sisanya di bagian kontak.
4. **Diagram nilai**: tetap radial, atau jadi daftar dua kolom? Rekomendasi: daftar, isi tetap sama.
5. **Halaman keanggotaan**: dipecah jadi verifikasi dan registrasi, atau tetap satu halaman panjang? Rekomendasi: verifikasi dipisah.

## Checklist uji manual

Lakukan setelah perubahan, bukan setiap revisi kecil.

- Perbesar browser ke 200%. Tidak boleh ada teks terpotong atau scroll horizontal.
- Ubah pengaturan Windows "Make text bigger" ke 150%. Layout harus tetap utuh.
- Coba seluruh alur verifikasi hanya dengan keyboard.
- Coba buka dan tutup menu HP dengan satu tangan.
- Baca satu halaman penuh dari jarak sekitar 60cm. Jika harus menyipitkan mata, ukurannya belum cukup.
- Periksa kontras teks sekunder dengan penghitung kontras, target minimal 7:1.
- Coba dengan pembaca layar, minimal untuk halaman keanggotaan.
