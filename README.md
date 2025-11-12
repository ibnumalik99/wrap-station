## Aplication For vehicle inspection
Aplikasi ini mecetak dan juga menyimpan hasil report inspector ke database. Ada sedikit perubahan pada User Interface agar lebih rapi dan juga menarik menarik. Ada sedikit modifikasi pada fitur customer signature (tanda tangan customer), dimana fitur ini di hilangkan karena dirasa checkbox confirmation cukup untuk proses konfirmasi. Aplikasi ini masih jauh dari kata sempurna dan hanya ditujukan untuk proses recruitment saja.

### Tentang aplikasi ini
- Saat ini hanya ada 1 example user yang dapat login di aplikasi ini, yaitu user dengan kredensial berikut 
`email: user@example.com` 
`password: password123`
- Pada halaman dashbord terbagi menjadi 4 section
    - section yang pertama adalah section yang harus di isi secara keseluruhan karena pada section ini pengguna akan diminta untuk memasukan informasi utama.
    - section yang kedua adalah section yang bisa di isi ataupun tidak di isi, section ini bertujuan untuk mendapatkan informasi/kerusakan dari kendaraan.
    - section yang ketiga adalah section untuk mengambil mengambil gambar keseluruhan dari kendaraan tersebut (input foto di atas mewakili tempak depan, input foto yang di kanan mewakili tampak kanan, input foto yang dikiri mewakili tampak kiri, dan input foto yang dibawah mewakili tampak belakang) , section ini dapat di isi ataupun di kosongkan.
    - section ke empat, ini adalah secrtion terakhir dan bertujuan untuk menyampaikan informasi terkait ketentuan dan kebijakan perusahaan, selain itu section ini juga bertujuan untuk mendapatkan konfirmasi customer.
- Proses submit: Proses ini melakukan 2 aksi terhadap data yang di inputkan, menyimpan dan mencetak data/informasi. Data di simpan ke database dan setelah data tersimpan data akan di ketak menjadi file PDF yang dapat di download.

### Teknologi
Adapun stack teknologi yang digunakan pada aplikasi ini adalah sebagai berikut
- PHP ^8.1
- Laravel v.10 (Sebagai Base Project)
- Inertia
- npm v.9
- Node.js v.20
- React.Js (Sebagai FrontEnd)
- Tailwind CSS (Sebagai styling)
- Puppeter & Spatie Browser Shot (Sebagai liblary untuk pembuatan file/dokumen)
- PosgreSQL (Sebagai Database)

### Setup
- Jalankan perintah `git clone https://github.com/ibnumalik99/wrap-station.git` untuk cloning repository ini di local
- Jalan perintah `cd wrap-station` untuk masuk ke directory project
- Jalankan perintah `cp .env.example .env` untuk mengnyalin file enveroment
- Setting database enveroment di .env
- Jalankan migrasi juga seeder dengan perintah `php artisan migrate:fresh --seed`
- Jalankan perintah `php artisan storage:link`
- Jalankan server Laravel dengan perintah `php artisan serve` dan akan berjalan di `http://127.0.0.1:8000`
- Jalankan perintah `npm run dev` untuk building FrontEnd

Demo Video: https://drive.google.com/file/d/1WzbjQ2b8FgHySo2dD-RC1FfX8Vk81-5E/view?usp=drive_link
Demikian peroject ini saya selesaikan untuk tahapan proses recruitment.

Hormat saya.
Ibnu Malik
