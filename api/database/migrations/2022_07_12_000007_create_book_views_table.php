<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBookViewsTable extends Migration
{
    public function up()
    {
        Schema::create('book_views', function (Blueprint $table) {
            $table->id();
            $table->foreignId('book_id')->constrained('books');
            $table->string('ip');
            $table->string('country');
            $table->string('city');
            $table->string('state');
            $table->decimal('long', 9, 6);
            $table->decimal('lat', 8, 6);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
    }

    public function down()
    {
        Schema::dropIfExists('book_views');
    }
}
