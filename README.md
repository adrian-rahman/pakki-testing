# PAKKI - Website Prototype (v3, multi-halaman)

Prototipe situs **Perhimpunan Ahli Kesehatan Kerja Indonesia (PAKKI)** yang
dibangun dari `prd_pakki_website.md`.

> Organisasi ini baru dan terpisah dari `pakki.org` (PAKKI konstruksi).

## Buka prototipe

Buka `index.html` langsung di browser, atau lewat server lokal:

```bash
python -m http.server 8080
# http://localhost:8080
```

## Struktur halaman

| File | Isi |
|---|---|
| `index.html` | Landing: hero, profil PAKKI, nilai, makna lambang, sambutan, kegiatan, berita terbaru, newsletter |
| `struktur.html` | Bagan tiga badan organisasi, uraian peran, pimpinan |
| `keanggotaan.html` | Verifikasi anggota, syarat registrasi, iuran, KTA digital |
| `berita.html` | Daftar berita dengan placeholder gambar 16:9 |

Fitur teknis keanggotaan sengaja dipisah dari landing page. Landing page
berfungsi memperkenalkan PAKKI; verifikasi dan registrasi berada di
`keanggotaan.html`.

## Isi folder

```
index.html              Landing page
struktur.html           Struktur organisasi
keanggotaan.html        Verifikasi, registrasi, iuran, KTA
berita.html             Berita dan kegiatan
README.md               Dokumen ini
prd_pakki_website.md    PRD dari klien
logo-pakki.jpg          File logo asli
assets/
  style.css             Seluruh CSS (dipakai bersama)
  app.js                JS bersama (drawer, verifikasi, newsletter, scrollspy)
  logo-pakki.png        Logo transparan
  logo-pakki-white.png  Versi putih untuk footer
  favicon.png           128x128
  qr-demo.png           QR contoh
preview/
  desktop.png           Render landing 1440px
  mobile.png            Render landing 390px
  struktur.png          Render halaman struktur
  keanggotaan.png       Render halaman keanggotaan
  berita.png            Render halaman berita
```

## Yang sudah dikerjakan

**Landing (`index.html`)**
- Hero dengan foto kegiatan, identitas, dan tagline
- Definisi PAKKI, sejarah 3 November 2015, asas Pancasila dan UUD 1945
- Tiga peran PAKKI: standar profesi, kredensial, advokasi
- Enam nilai organisasi
- Makna lambang: buku hijau, tanda plus, dua orang berpegangan, lingkaran
- Sambutan Ketua Umum (Dr. Hendra, S.K.M., M.K.K.K.)
- Kegiatan: Munas, Musda dan pelantikan, Pelatihan Hiperkes, seminar ilmiah
- Tiga berita terbaru dengan placeholder gambar
- Form newsletter dengan validasi dan state sukses

**Struktur (`struktur.html`)**
- Bagan tiga badan mengikuti BAB V: Dewan Pengurus (DPP, DPD, DPC),
  Dewan Pembina (pusat, daerah, cabang), Dewan Pakar (pusat melalui Munas)
- Uraian peran tiap badan
- Blok Ketua Umum dan catatan bahwa susunan pengurus belum tersedia

**Keanggotaan (`keanggotaan.html`)**
- Sub-navigasi lengket dengan penanda bagian aktif
- Verifikasi anggota: tab Nomor Anggota / NIK, validasi format, empat state
  (loading, aktif, tidak aktif, tidak ditemukan), tombol contoh
- KTA digital muncul di hasil verifikasi berisi data anggota yang dicari
- Syarat registrasi dan alur pendaftaran
- Rincian biaya dan mekanisme pembayaran
- Penjelasan KTA digital ber-QR

**Berita (`berita.html`)**
- Kartu berita dengan placeholder gambar 16:9
- Catatan bahwa konten masih contoh dan CMS belum tersedia

**Navigasi**
- Header: Beranda, Tentang, Struktur, Keanggotaan, Berita, Kontak (dropdown
  berisi email, Instagram, YouTube)
- Tidak ada dropdown untuk Tentang, Struktur, dan Keanggotaan
- Tidak ada tombol Cek Anggota di header
- Drawer mobile berfungsi di semua halaman
- Kontak memakai tautan asli: `sekretariat@pakki.id`,
  `instagram.com/pakki_pusat`, `youtube.com/@pakkigroup7712`

## Data demo verifikasi

| Input | Hasil |
|---|---|
| `PAKKI-2019-00417` | dr. Anisa Prameswari - aktif, DPD DKI Jakarta |
| `PAKKI-2023-01104` | Ns. Rina Kartika - tidak aktif, DPD Jawa Timur |
| `3174015205900001` (NIK) | dr. Anisa Prameswari - aktif |

Data ini hardcoded di `assets/app.js` untuk demo. Pada implementasi nyata,
ganti dengan panggilan API ke basis data DPP.

## Design token

```
Latar kertas    #FBFBF9
Permukaan       #FFFFFF
Teks utama      #101A14
Teks sekunder   #3B4840
Teks mikro      #5F6B63
Garis           #DCE1DC / #C7CEC8
Hijau aksen     #0B6B3A
Hijau gelap     #063D21
Font            San Francisco / SF Pro (system), fallback Helvetica Neue,
                Arial. Tidak memakai webfont eksternal.
Radius          8 / 12 / 16 / 24 / 32 px, pil penuh untuk tombol dan chip
```

Arah desain: registri/teknis dengan sudut membulat. Tipografi memakai font
sistem Apple (San Francisco) melalui font stack `-apple-system, BlinkMacSystemFont,
"SF Pro Text"`, dengan angka tabular untuk data. Kartu dan panel memakai radius 16
sampai 32px, tombol dan chip berbentuk pil. Shadow hanya dipakai pada elemen
yang terangkat (tombol utama, panel, dropdown, kartu KTA), bukan sebagai
dekorasi. Tidak ada gradient. Pemisah tetap memakai garis hairline 1px.

**Aturan penulisan:** tidak memakai em dash (karakter panjang). Gunakan
hyphen dengan spasi, titik dua, atau `&middot;`.

Aksesibilitas: kontras teks minimal 5:1, `:focus-visible` di semua elemen
interaktif, target sentuh 40px ke atas di mobile, `aria-current` pada
navigasi aktif, drawer memakai `inert`.

## Yang masih perlu data resmi

1. **Susunan pengurus** periode 2022 sampai 2027 (DPP, DPD, DPC). Halaman
   struktur baru memuat Ketua Umum.
2. **Nomor rekening resmi** untuk pembayaran iuran.
3. **Alamat sekretariat lengkap** dan nomor telepon.
4. **Gambar berita** untuk mengganti placeholder 16:9.
5. **Isi berita** dan halaman detail artikel.
6. **Formulir registrasi online** sebagai halaman tersendiri.
7. **Halaman login anggota**.
8. **Logo master resolusi tinggi** untuk kebutuhan cetak.

## Catatan implementasi backend

- Route yang dibutuhkan: `/`, `/struktur`, `/keanggotaan`, `/berita`,
  `/berita/{slug}`, `/registrasi`, `/login`, `/anggota/{na}`.
- Verifikasi sebaiknya `POST /api/verifikasi` dengan rate limit dan captcha
  setelah beberapa percobaan gagal.
- Jangan mengembalikan NIK penuh ke publik. Prototipe hanya menampilkan versi
  tersamar (`3174••••••••0012`).
- Catat log pencarian untuk audit.
- Upload ijazah dan sertifikat harus divalidasi tipe/ukuran, disimpan privat,
  dan hanya dapat diakses admin DPP.
- Status keanggotaan: `pending` lalu `aktif` atau `ditolak`, dengan alasan.
- KTA digital: PDF dengan QR yang mengarah ke URL verifikasi publik.
