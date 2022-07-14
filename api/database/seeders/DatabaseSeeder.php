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
        // Generate Dummy Book
        if (Schema::hasTable('books')) {
            DB::table('books')->insert([
                ['title' => 'Filosofi Teras', 'cover' => 'images/filosofi-teras.jpeg', 'author_id' => $faker->randomDigitNotNull(), 'published_date' => $faker->dateTime(), 'quantity' => $faker->randomDigitNotNull(), 'isbn' => $faker->isbn10(), 'shelf_id' => $faker->randomDigitNotNull(), 'publisher_id' => $faker->randomDigitNotNull()],
                ['title' => 'Intai Amfibi Marinir', 'cover' => 'images/intai-amfibi-marinir.jpg', 'author_id' => $faker->randomDigitNotNull(), 'published_date' => $faker->dateTime(), 'quantity' => $faker->randomDigitNotNull(), 'isbn' => $faker->isbn10(), 'shelf_id' => $faker->randomDigitNotNull(), 'publisher_id' => $faker->randomDigitNotNull()],
                ['title' => 'Junji Ito’s Cat Diary Yon and Mu', 'cover' => 'images/Junji Itos Cat Diary Yon and Mu.jpg', 'author_id' => $faker->randomDigitNotNull(), 'published_date' => $faker->dateTime(), 'quantity' => $faker->randomDigitNotNull(), 'isbn' => $faker->isbn10(), 'shelf_id' => $faker->randomDigitNotNull(), 'publisher_id' => $faker->randomDigitNotNull()],
                ['title' => 'Maria Beetle', 'cover' => 'images/Maria Beetle.jpg', 'author_id' => $faker->randomDigitNotNull(), 'published_date' => $faker->dateTime(), 'quantity' => $faker->randomDigitNotNull(), 'isbn' => $faker->isbn10(), 'shelf_id' => $faker->randomDigitNotNull(), 'publisher_id' => $faker->randomDigitNotNull()],
                ['title' => 'Kaiju No. 8 Vol. 03', 'cover' => 'images/Kaiju No. 8 Vol. 03.jpg', 'author_id' => $faker->randomDigitNotNull(), 'published_date' => $faker->dateTime(), 'quantity' => $faker->randomDigitNotNull(), 'isbn' => $faker->isbn10(), 'shelf_id' => $faker->randomDigitNotNull(), 'publisher_id' => $faker->randomDigitNotNull()],
                ['title' => 'The Power of Habit', 'cover' => 'images/The Power of Habit.jpg', 'author_id' => $faker->randomDigitNotNull(), 'published_date' => $faker->dateTime(), 'quantity' => $faker->randomDigitNotNull(), 'isbn' => $faker->isbn10(), 'shelf_id' => $faker->randomDigitNotNull(), 'publisher_id' => $faker->randomDigitNotNull()],
                ['title' => 'Hello, Cello', 'cover' => 'images/Hello, Cello.jpg', 'author_id' => $faker->randomDigitNotNull(), 'published_date' => $faker->dateTime(), 'quantity' => $faker->randomDigitNotNull(), 'isbn' => $faker->isbn10(), 'shelf_id' => $faker->randomDigitNotNull(), 'publisher_id' => $faker->randomDigitNotNull()],
                ['title' => 'One Piece 99', 'cover' => 'images/One Piece 99.jpeg', 'author_id' => $faker->randomDigitNotNull(), 'published_date' => $faker->dateTime(), 'quantity' => $faker->randomDigitNotNull(), 'isbn' => $faker->isbn10(), 'shelf_id' => $faker->randomDigitNotNull(), 'publisher_id' => $faker->randomDigitNotNull()],
                ['title' => 'Cantik Itu Luka Edisi 20 Tahun', 'cover' => 'images/Cantik Itu Luka Edisi 20 Tahun.jpg', 'author_id' => $faker->randomDigitNotNull(), 'published_date' => $faker->dateTime(), 'quantity' => $faker->randomDigitNotNull(), 'isbn' => $faker->isbn10(), 'shelf_id' => $faker->randomDigitNotNull(), 'publisher_id' => $faker->randomDigitNotNull()],
                ['title' => 'Kitab Pink Jason Ranti', 'cover' => 'images/Kitab Pink Jason Ranti.jpg', 'author_id' => $faker->randomDigitNotNull(), 'published_date' => $faker->dateTime(), 'quantity' => $faker->randomDigitNotNull(), 'isbn' => $faker->isbn10(), 'shelf_id' => $faker->randomDigitNotNull(), 'publisher_id' => $faker->randomDigitNotNull()]
            ]);
        }
    }
}
