<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $faker = \Faker\Factory::create();
        // Generate Random User
        if (Schema::hasTable('users')) {
            \App\Models\User::factory(10)->create();
        }
        // Generate Dummy Author
        if (Schema::hasTable('authors')) {
            DB::table('authors')->insert([
                ['fullname' => 'Tere Liye', 'address' => $faker->address()],
                ['fullname' => 'Ilana Tan', 'address' => $faker->address()],
                ['fullname' => 'Dewi Lestari', 'address' => $faker->address()],
                ['fullname' => 'Raditya Dika', 'address' => $faker->address()],
                ['fullname' => 'Nh. Dini', 'address' => $faker->address()],
                ['fullname' => 'Andrea Hirata', 'address' => $faker->address()],
                ['fullname' => 'Winna Efendi', 'address' => $faker->address()],
                ['fullname' => 'Orizuka', 'address' => $faker->address()],
                ['fullname' => 'Stephanie Zen', 'address' => $faker->address()],
                ['fullname' => 'Arumi E', 'address' => $faker->address()]
            ]);
        }
        // Generate Dummy Shelf
        if (Schema::hasTable('shelves')) {
            DB::table('shelves')->insert([
                ['name' => 'A-1', 'location' => 'Perpustakaan'],
                ['name' => 'A-2', 'location' => 'Perpustakaan'],
                ['name' => 'A-3', 'location' => 'Perpustakaan'],
                ['name' => 'B-1', 'location' => 'Perpustakaan'],
                ['name' => 'B-2', 'location' => 'Perpustakaan'],
                ['name' => 'B-3', 'location' => 'Perpustakaan'],
                ['name' => 'C-1', 'location' => 'Perpustakaan'],
                ['name' => 'C-2', 'location' => 'Perpustakaan'],
                ['name' => 'C-3', 'location' => 'Perpustakaan'],
                ['name' => 'CL-1', 'location' => 'kelas 1C']
            ]);
        }
        // Generate Dummy Publisher
        if (Schema::hasTable('publishers')) {
            DB::table('publishers')->insert([
                ['name' => 'Gramedia Pustaka Utama', 'address' => $faker->address()],
                ['name' => 'Mizan Pustaka', 'address' => $faker->address()],
                ['name' => 'Bentang Pustaka', 'address' => $faker->address()],
                ['name' => 'Penerbit Erlangga', 'address' => $faker->address()],
                ['name' => 'Penerbit Republika', 'address' => $faker->address()],
                ['name' => 'Yudhistira', 'address' => $faker->address()],
                ['name' => 'Andi Publishers', 'address' => $faker->address()],
                ['name' => 'Agro Media Grup', 'address' => $faker->address()],
                ['name' => 'Tiga Serangkai Pustaka Mandiri', 'address' => $faker->address()],
                ['name' => 'DIVA Press', 'address' => $faker->address()]
            ]);
        }
        // Generate Dummy Category
        if (Schema::hasTable('categories')) {
            DB::table('categories')->insert([
                ['name' => 'Seni', 'icon' => 'images/art.png', 'slug' => 'seni'],
                ['name' => 'Jual Beli', 'icon' => 'images/bookstore.png', 'slug' => 'jual-beli'],
                ['name' => 'Pendidikan', 'icon' => 'images/education.png', 'slug' => 'pendidikan'],
                ['name' => 'Otomotif', 'icon' => 'images/engineering.png', 'slug' => 'otomotif'],
                ['name' => 'Makanan', 'icon' => 'images/food.png', 'slug' => 'makanan'],
                ['name' => 'Humor', 'icon' => 'images/humor.png', 'slug' => 'humor'],
                ['name' => 'Hukum', 'icon' => 'images/law.png', 'slug' => 'hukum'],
                ['name' => 'Politik', 'icon' => 'images/politic.png', 'slug' => 'politik'],
                ['name' => 'Sosial', 'icon' => 'images/social.png', 'slug' => 'sosial'],
                ['name' => 'Cerita Rakyat', 'icon' => 'images/story-book.png', 'slug' => 'cerita-rakyat'],
            ]);
        }
        // Generate Dummy Languages
        if (Schema::hasTable('languages')) {
            DB::table('languages')->insert([
                ['name' => 'Indonesia'],
                ['name' => 'Inggris'],
                ['name' => 'Jepang']
            ]);
        }
        // Generate Dummy Book
        if (Schema::hasTable('books')) {
            DB::table('books')->insert([
                [
                    'title' => 'Filosofi Teras', 
                    'cover' => 'images/filosofi-teras.jpeg', 
                    'author_id' => $faker->randomDigitNotNull(), 
                    'published_date' => $faker->dateTime(), 
                    'quantity' => $faker->randomDigitNotNull(), 
                    'isbn' => $faker->isbn10(), 
                    'slug' => 'filosofi-teras',
                    'description' => 'Lebih dari 2000 tahun lalu, sebuah mazhab filsafat menemukan akar masalah dan juga solusi dari banyak emosi negatif. Stoisisme, atau Filosofi Teras, adalah filsafat Yunani-Romawi kuno yang bisa membantu kita mengatasi emosi negatif dan menghasilkan mental yang tangguh dalam menghadapi naik-turun nya kehidupan. Jauh dari kesan filsafat sebagai topik berat dan mengawang-awang, Filosofi Teras justru bersifat praktis dan relevan dengan kehidupan Generasi Milenial dan Gen-Z masa kini.',
                    'pages' => 298,
                    'language_id' => 1,
                    'shelf_id' => $faker->randomDigitNotNull(), 
                    'publisher_id' => $faker->randomDigitNotNull(), 
                    'category_id' => $faker->randomDigitNotNull()
                ],
                [
                    'title' => 'Intai Amfibi Marinir', 
                    'cover' => 'images/intai-amfibi-marinir.jpg', 
                    'author_id' => $faker->randomDigitNotNull(), 
                    'published_date' => $faker->dateTime(), 
                    'quantity' => $faker->randomDigitNotNull(), 
                    'isbn' => $faker->isbn10(), 
                    'slug' => 'intai-amfibi-marinir',
                    'description' => 'Intai Amfibi Marinir: Senyap Menjaga Indonesia berisi kumpulan cerita pengabdian pasukan Intai Amfibi Marinir yang tidak pernah dibukukan sebelumnya. Buku ini adalah buku pertama dan satu-satunya saat ini tentang pasukan Intai Amfibi Marinir. Harapannya, buku ini menjadi buku awal untuk membukukan dan mendokumentasikan sepak terjang batalyon Intai Amfibi Marinir. Buku ini ditulis dengan apa adanya, jujur, sesuai pesan dari para sesepuh Intai Amfibi: “Buku ini boleh saja salah tulis, tetapi buku ini tidak boleh berbohong”. Bukanlah hal mudah untuk menggali data dari sebuah satuan elite TNI yang sejak awal beroperasi secara senyap dan rahasia. Apalagi, dokumen-dokumen yang ada bukan dokumen yang mudah didapat dan bersifat terbatas dan tertutup. Ditambah lagi dengan tidak adanya pencatatan atau laporan yang secara terang-terangan menjelaskan operasi yang dilakukan oleh pasukan ini, makin besar tantangan untuk mewujudkan dan mengumpulkan catatan terserak dan menjadi sebuah buku. Meski demikian, buku ini akhirnya terbit. Buku ini menjadi buku dengan tinta emas akan peluh dan darah yang sudah dipersembahkan oleh pasukan yang gilang-gemilang sejak kelahirannya sampai kini dalam menjaga NKRI.',
                    'pages' => 268,
                    'language_id' => 1,
                    'shelf_id' => $faker->randomDigitNotNull(), 
                    'publisher_id' => $faker->randomDigitNotNull(), 
                    'category_id' => $faker->randomDigitNotNull()
                ],
                [
                    'title' => 'Junji Ito’s Cat Diary Yon and Mu', 
                    'cover' => 'images/Junji Itos Cat Diary Yon and Mu.jpg', 
                    'author_id' => $faker->randomDigitNotNull(), 
                    'published_date' => $faker->dateTime(), 
                    'quantity' => $faker->randomDigitNotNull(), 
                    'isbn' => $faker->isbn10(), 
                    'slug' => 'junji-itos-cat-diary-yon-and-mu',
                    'description' => 'Pentolan komik horor Jepang, Junji Ito, menyuguhkan kesehariannya sebagai “Komikus Horor J” dalam komik ini. Tadinya dia penyuka anjing, tapi jadi memelihara kucing atas keinginan tunangannya, A-ko. Mu, si anak kucing keturunan ras luar. Dan Yon, kucing manja berwajah terkutuk. Di luar dugaan J, para kucing tak kunjung akrab dengannya. Ayo semangat, J! Horor dan humor itu perbedaannya tipis. Inilah komik humor kucing besutan komikus horor!!',
                    'pages' => 116,
                    'language_id' => 1,
                    'shelf_id' => $faker->randomDigitNotNull(), 
                    'publisher_id' => $faker->randomDigitNotNull(), 
                    'category_id' => $faker->randomDigitNotNull()
                ],
                [
                    'title' => 'Maria Beetle', 
                    'cover' => 'images/Maria Beetle.jpg', 
                    'author_id' => $faker->randomDigitNotNull(), 
                    'published_date' => $faker->dateTime(), 
                    'quantity' => $faker->randomDigitNotNull(), 
                    'isbn' => $faker->isbn10(), 
                    'slug' => 'maria-beetle',
                    'description' => 'Lima pembunuh dalam satu Shinkansen. Siapa yang akan mati? Ouji tampak seperti anak remaja polos, tapi ia sebenarnya psikopat berdarah dingin yang menyebabkan putra Kimura kini terbaring koma. Kimura, yang merupakan mantan pembunuh bayaran, ingin membalas dendam. Ia berhasil melacak keberadaan Ouji sampai ke Shinkansen yang berangkat dari Tokyo dengan tujuan akhir Morioka. Namun, ternyata mereka berdua bukan orang-orang paling berbahaya di kereta itu. Nanao, pembunuh bayaran yang penakut dan paling sial sedunia, juga naik Shinkansen yang sama. Begitu pula duo profesional ulung, Jeruk dan Lemon. Apa yang sebenarnya terjadi? Kenapa mereka semua berada di Shinkansen yang sama? Dan siapa yang akan tiba dengan selamat di stasiun terakhir? Buku bestseller internasional ini telah difilmkan dengan judul "Bullet Train" dengan pemeran Brad Pitt dan Sandra Bullock.',
                    'pages' => 592,
                    'language_id' => 3,
                    'shelf_id' => $faker->randomDigitNotNull(), 
                    'publisher_id' => $faker->randomDigitNotNull(), 
                    'category_id' => $faker->randomDigitNotNull()
                ],
                [
                    'title' => 'Kaiju No. 8 Vol. 03', 
                    'cover' => 'images/Kaiju No. 8 Vol. 03.jpg', 
                    'author_id' => $faker->randomDigitNotNull(), 
                    'published_date' => $faker->dateTime(), 
                    'quantity' => $faker->randomDigitNotNull(), 
                    'isbn' => $faker->isbn10(), 
                    'slug' => 'kaiju-no-8-vol-03',
                    'description' => 'Kafka berubah wujud menjadi Kaiju demi menolong Ichikawa dan Furuhashi. Kekuatannya yang luar biasa berhasil menaklukkan Kaiju berbentuk manusia yang melukai kedua temannya itu. Namun, anggota pasukan pertahanan lainnya muncul saat dia akan meluncurkan serangan penghabisan sehingga Kaiju lawannya berhasil melarikan diri. Setelah berhasil melaksanakan misinya, yaitu menolong Ichikawa dan Furuhashi, Kafka un pergi meninggalkan tempat pertarungan… dan berjumpa dengan Wakil Kapten Hoshina!!',
                    'pages' => 192,
                    'language_id' => 1,
                    'shelf_id' => $faker->randomDigitNotNull(), 
                    'publisher_id' => $faker->randomDigitNotNull(), 
                    'category_id' => $faker->randomDigitNotNull()
                ],
                [
                    'title' => 'The Power of Habit', 
                    'cover' => 'images/The Power of Habit.jpg', 
                    'author_id' => $faker->randomDigitNotNull(), 
                    'published_date' => $faker->dateTime(), 
                    'quantity' => $faker->randomDigitNotNull(), 
                    'isbn' => $faker->isbn10(), 
                    'slug' => 'the-power-of-habit',
                    'description' => 'Kebiasaan adalah Rahasia Keberhasilan. Travis, seorang pemuda broken home degan orang tua pecandu obat, berkali-kali dipecat dari pekerjaan karena tidak bisa mengendalikan emosi. Namun sesudah menjalani pelatihan pegawai Starbucks yang mengajarkan kekuatan tekad, Travis kini sukses menjadi manajer dua cabang kafe terkenal itu. Seorang CEO baru memegang salah satu perusahaan raksasa Amerika. Perintah pertamanya adalah menumbuhkan kepedulian keselamatan kerja-dan hasilnya saham perusahaan itu, Alcoa, menjadi salah satu yang berkinerja terbaik di Dow Jones.',
                    'pages' => 392,
                    'language_id' => 2,
                    'shelf_id' => $faker->randomDigitNotNull(), 
                    'publisher_id' => $faker->randomDigitNotNull(), 
                    'category_id' => $faker->randomDigitNotNull()
                ],
                [
                    'title' => 'Hello, Cello', 
                    'cover' => 'images/Hello, Cello.jpg', 
                    'author_id' => $faker->randomDigitNotNull(), 
                    'published_date' => $faker->dateTime(), 
                    'quantity' => $faker->randomDigitNotNull(), 
                    'isbn' => $faker->isbn10(), 
                    'slug' => 'hello-cello',
                    'description' => "ni kisah Helga, seorang penulis yang mempunyai kisah patah hati yang ia tuangkan dalam bukunya. Sebelum akhirnya, ia bertemu dengan Cello seorang buaya paling hits di kampusnya. Cello yang tadinya menjadikan Una (sahabat Helga) sebagai 'target' berikutnya justru gagal mendekatinya. Tak disangka, usahanya yang gagal itu justru mendekatkan Cello dengan Helga. Namun, sikap Helga yang cuek terhadap Cello, membuat Cello penasaran akan sosok gadis ajaib itu.",
                    'pages' => 428,
                    'language_id' => 2,
                    'shelf_id' => $faker->randomDigitNotNull(), 
                    'publisher_id' => $faker->randomDigitNotNull(), 
                    'category_id' => $faker->randomDigitNotNull()
                ],
                [
                    'title' => 'One Piece 99', 
                    'cover' => 'images/One Piece 99.jpeg', 
                    'author_id' => $faker->randomDigitNotNull(), 
                    'published_date' => $faker->dateTime(), 
                    'quantity' => $faker->randomDigitNotNull(), 
                    'isbn' => $faker->isbn10(), 
                    'slug' => 'one-piece-99',
                    'description' => 'Luffy Si Topi Jerami. Berkat kawan-kawan yang mencegah pengejaran para petinggi, Luffy yang hendak ke atap, akhirnya tiba di hadapan Kaido! Pertarungan sengit para pemeran yang telah berkumpul dipanggung besar, akan segera dimulai… Pertempuran penentuan Onigashima semakin memanas!! Simak kisah petualangan di lautan, One Piece!!',
                    'pages' => 202,
                    'language_id' => 1,
                    'shelf_id' => $faker->randomDigitNotNull(), 
                    'publisher_id' => $faker->randomDigitNotNull(), 
                    'category_id' => $faker->randomDigitNotNull()
                ],
                [
                    'title' => 'Cantik Itu Luka Edisi 20 Tahun', 
                    'cover' => 'images/Cantik Itu Luka Edisi 20 Tahun.jpg', 
                    'author_id' => $faker->randomDigitNotNull(), 
                    'published_date' => $faker->dateTime(), 
                    'quantity' => $faker->randomDigitNotNull(), 
                    'isbn' => $faker->isbn10(), 
                    'slug' => 'cantik-itu-luka-edisi-20-tahun',
                    'description' => 'Di satu sore, seorang perempuan bangkit dari kuburannya setelah dua puluh satu tahun kematian. Kebangkitannya menguak kutukan dan tragedi keluarga, yang terentang sejak akhir masa kolonial. Perpaduan antara epik keluarga yang dibalut roman, kisah hantu, kekejaman politik, mitologi, dan petualangan. Dari kekasih yang lenyap ditelan kabut hingga seorang ibu yang menginginkan bayi buruk rupa.',
                    'pages' => 512,
                    'language_id' => 1,
                    'shelf_id' => $faker->randomDigitNotNull(), 
                    'publisher_id' => $faker->randomDigitNotNull(), 
                    'category_id' => $faker->randomDigitNotNull()
                ],
                [
                    'title' => 'Kitab Pink Jason Ranti', 
                    'cover' => 'images/Kitab Pink Jason Ranti.jpg', 
                    'author_id' => $faker->randomDigitNotNull(), 
                    'published_date' => $faker->dateTime(), 
                    'quantity' => $faker->randomDigitNotNull(), 
                    'isbn' => $faker->isbn10(), 
                    'slug' => 'kitab-pink-jason-ranti',
                    'description' => '“Gua bukan konten lo, Men!” Kalimat itu terucap secara lugas dari mulut Jason Ranti. Dia merasa, banyak wawancara yang dilakukan terhadap dirinya sekadar basa-basi. Jason Ranti lebih menghargai wawancara yang dilakukan dengan hati, dalam rangka membangun komunikasi antarmanusia. Buku ini mengungkap jauh kehidupan Jeje, panggilan akrab Jason Ranti, dari sisi kreativitas hingga spiritualitasnya yang tidak mudah dimengerti. Dia mengakui, lagu-lagunya bukan untuk dipahami, melainkan untuk menyentuh perasaan lewat bunyi. Tersingkap juga gugatannya yang blak-blakan terhadap otoritas negara, agama, dan sejumlah sendi kehidupan yang kedodoran, juga bagaimana dia memandang dosa dan kesucian. Hampir semua karya Jeje di pintu toilet, dapur keluarga, piagam, tanda jasa, kertas, dan kanvas yang lahir di studionya selama masa pandemi disertakan untuk melengkapi. Lewat buku ini, kita diajak bercakap-cakap untuk menggugat, mencari, dan menemukan pegangan hidup yang sungguh-sungguh kita percayai. Kitab Pink Jason Ranti adalah jilid perdana seri “Beginu: Bukan Begini, Bukan Begitu”, yang mengupas mimpi, harapan, dan kecemasan anak manusia dalam zamannya.',
                    'pages' => 104,
                    'language_id' => 1,
                    'shelf_id' => $faker->randomDigitNotNull(), 
                    'publisher_id' => $faker->randomDigitNotNull(), 
                    'category_id' => $faker->randomDigitNotNull()
                ]
            ]);
        }
    }
}
