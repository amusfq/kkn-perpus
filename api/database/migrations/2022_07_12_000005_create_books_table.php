<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBooksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('cover')->default('/images/no-cover.jpg');
            $table->foreignId('author_id')->constrained('authors');
            $table->timestamp('published_date');
            $table->integer('quantity');
            $table->string('isbn');
            $table->string('slug');
            $table->text('description');
            $table->integer('pages');
            $table->foreignId('language_id')->constrained('languages');
            $table->foreignId('shelf_id')->constrained('shelves');
            $table->foreignId('publisher_id')->constrained('publishers');
            $table->foreignId('category_id')->constrained('categories');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('books');
    }
}
