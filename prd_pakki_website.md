# Product Requirements Document (PRD)
## Website Resmi Perhimpunan Ahli Kesehatan Kerja Indonesia (PAKKI)

---

## 1. Product Overview (Gambaran Umum Produk)

* **Nama Produk:** Platform Website Resmi PAKKI.
* **Tujuan Utama:** Menyediakan portal digital terpusat yang memuat profil organisasi sesuai AD/ART (Periode 2022-2027), wadah publikasi berita/kegiatan ilmiah, serta sistem pendaftaran (*online registration*) dan verifikasi keanggotaan profesi kesehatan kerja di Indonesia.
* **Target Pengguna:**
  * **Calon Anggota / Praktisi:** Tenaga ahli kesehatan & keselamatan kerja, dokter perusahaan, perawat okupasi (*occupational health nurse*), dan higienis industri yang ingin bergabung.
  * **Anggota Aktif:** Praktisi yang memerlukan informasi pelatihan (*Continuing Professional Development*), agenda organisasi, dan pembaruan regulasi.
  * **Publik, Perusahaan, & Instansi:** Pihak eksternal yang ingin memverifikasi keaktifan anggota atau mengetahui informasi kelembagaan PAKKI.

---

## 2. Core Features & Functional Requirements (Fitur Utama)

### **F-01: Modul Profil & Kelembagaan Organisasi (Statis & Dinamis)**
Situs harus memuat informasi resmi organisasi yang bersumber langsung dari AD/ART PAKKI:
* **Beranda (Home):** *Hero section* dengan identitas visual resmi (logo PAKKI dan warna hijau-putih), *tagline* organisasi, sambutan Ketua Umum (Dr. Hendra, S.K.M, M.K.K.K), dan ringkasan kegiatan terbaru.
* **Tentang Kami:** Sejarah berdirinya PAKKI (3 November 2015 di Jakarta), Asas (Pancasila & UUD 1945), Nilai organisasi (kejujuran, berkeadilan, altruistik, akuntabel, transparansi, kebersamaan), serta makna filosofis lambang (buku hijau, tanda plus putih, dua orang berpegangan tangan, pola lingkaran).
* **Struktur Organisasi:** Informasi hierarki kepengurusan mulai dari Dewan Pengurus Pusat (DPP), Dewan Pengurus Daerah (DPD Provinsi), Dewan Pengurus Cabang (DPC Kabupaten/Kota), Dewan Pembina, Dewan Pakar, hingga Majelis Kehormatan Etik Ahli Kesehatan Kerja (MKEAKK).

### **F-02: Modul Registrasi Anggota Baru (New Member Registration)**
Formulir digital interaktif bagi calon anggota untuk mendaftarkan diri secara mandiri:
* **Input Data Diri:** Nama lengkap, NIK, kontak, dan domisili penempatan (DPD/DPC).
* **Unggah Dokumen Persyaratan:** 
  * Ijazah pendidikan tinggi kesehatan/kesehatan kerja (dalam/luar negeri yang diakui pemerintah).
  * Sertifikat Kompetensi/Profesi (bagi yang dipersyaratkan).
* **Persetujuan Etik & Legal:** Checkbox persetujuan pakta integritas untuk menaati AD/ART PAKKI dan Kode Etik Profesi.
* **Informasi Pembayaran:** Ketentuan nominal Uang Pangkal (Rp100.000) dan Iuran Wajib Tahunan (Rp240.000) beserta mekanisme validasi pembayarannya.
* **Penerbitan Akun:** Sistem otomatis menghasilkan Nomor Anggota (NA) dan Kartu Tanda Anggota (KTA) digital setelah diverifikasi oleh Admin DPP.

### **F-03: Fitur Cek Status Anggota / Verifikasi KTA (Member Directory & Verification)**
* Fitur pencarian publik di mana perusahaan atau instansi dapat memasukkan Nomor Anggota (NA) atau NIK untuk memvalidasi keaktifan status keanggotaan dan keabsahan sertifikasi profesi di bawah naungan PAKKI.

### **F-04: Modul Berita, Kegiatan, & Newsletter**
* **Portal Berita & Artikel:** CMS (*Content Management System*) bagi admin untuk mempublikasikan berita organisasi (Munas, Musda, pelantikan), agenda pelatihan Hiperkes/seminar ilmiah, serta artikel edukasi kesehatan kerja.
* **Fitur Newsletter:** Kotak langganan (*subscribe*) berbasis email bagi anggota dan publik untuk menerima buletin berkala dan pembaruan informasi organisasi.

---

## 3. Non-Functional Requirements (Kebutuhan Non-Fungsional)

* **Responsivitas & UI/UX:** Desain antarmuka yang bersih, profesional, menggunakan palet warna dominan hijau-putih, serta *mobile-friendly* (optimal diakses via *smartphone* maupun *desktop*).
* **Keamanan Data (Data Privacy):** Enkripsi data pribadi anggota dan dokumen unggahan (ijazah/sertifikat) sesuai standar keamanan informasi organisasi profesi.
* **Skalabilitas Database:** Mampu menampung data anggota nasional yang terdistribusi ke dalam struktur DPP, DPD Provinsi, dan DPC Kabupaten/Kota.