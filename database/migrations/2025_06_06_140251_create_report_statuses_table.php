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
        Schema::create('report_statuses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('report_id'); // Penghubung ke tabel reports
            $table->string('image')->nullable(); // Gambar status laporan
            $table->enum('status', ['delivered', 'in_process', 'completed', 'rejected']); // Status laporan
            $table->longText('description'); // Deskripsi status laporan
            $table->softDeletes(); // Untuk menyimpan data yang dihapus
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('report_statuses');
    }
};
