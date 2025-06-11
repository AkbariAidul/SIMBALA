<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique(); // Kode unik untuk laporan
            $table->foreignId('resident_id'); // Penghubung ke tabel residents
            $table->foreignId('report_category_id'); // Penghubung ke tabel report_categories
            $table->string('title'); // Judul laporan
            $table->longText('description'); // Deskripsi laporan
            $table->string('image'); // Gambar laporan
            $table->string('latitude'); // menyimpan lokasi laporan
            $table->string('longitude'); // menyimpan lokasi laporan
            $table->string('address'); // menyimpan alamat laporan
            $table->softDeletes(); // Untuk menyimpan data yang dihapus
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
